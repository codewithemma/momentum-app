import { routes } from "@/libs/routes";
import { SessionUser } from "@/types/common";
import axios from "axios";
import { User, type DefaultSession, type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

type RefreshResult = {
  token: AppJWT;
  expiresAt: number;
};

const refreshResults = new Map<string, RefreshResult>();

const REFRESH_RESULT_CACHE_TTL = 5 * 1000;

async function performRefresh(token: AppJWT): Promise<AppJWT> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        refreshToken: token.refreshToken,
      },
    );

    const data = response.data;

    const refreshedToken: AppJWT = {
      ...token,
      token: data.accessToken,
      refreshToken: data.refreshToken,

      // 10 seconds ONLY while testing.
      // Change back to 1 day after testing.
      accessTokenExpiresAt: Date.now() + 1 * 24 * 60 * 60 * 1000,

      error: undefined,
    };

    // Remember that this refresh token has already been rotated.
    refreshResults.set(token.refreshToken, {
      token: refreshedToken,
      expiresAt: Date.now() + REFRESH_RESULT_CACHE_TTL,
    });

    return refreshedToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ REFRESH FAILED:", {
        status: error.response?.status,
        data: error.response?.data,
        refreshTokenEnd: token.refreshToken?.slice(-12),
      });
    } else {
      console.error("❌ REFRESH FAILED:", error);
    }

    return {
      ...token,
      error: "RefreshTokenError",
    };
  }
}

async function refreshAccessToken(token: AppJWT): Promise<AppJWT> {
  const refreshToken = token.refreshToken;

  const cached = refreshResults.get(refreshToken);

  if (cached) {
    if (Date.now() < cached.expiresAt) {
      return cached.token;
    }

    refreshResults.delete(refreshToken);
  }

  return performRefresh(token);
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface User {
    accessToken: string;
    user: SessionUser;
    refreshToken: string;
    id?: string;
    message?: string;
  }
  interface Session extends DefaultSession {
    token: string;
    user: SessionUser;
    refreshToken: string;
    error?: "RefreshTokenError";
  }
}

type AppJWT = {
  user: SessionUser;
  token: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  error?: "RefreshTokenError";
};

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        const idToken = account.id_token;
        try {
          // const res = await apis.auth.googleLogin(profile as GoogleProfile);
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google-login`,
            { idToken },
          );
          const data = res.data;
          (user as User).user = data.user;
          (user as User).accessToken = data.accessToken;
          (user as User).refreshToken = data.refreshToken;
          return true;
        } catch (error) {
          console.error("NestJS backend authentication failed:", error);
          if (axios.isAxiosError(error)) {
            console.error("Backend validation error:", error.response?.data);
          }
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // User is available during sign-in
        token.user = user.user;
        token.token = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpiresAt = Date.now() + 1 * 24 * 60 * 60 * 1000;

        return token;
      }

      if (trigger === "update" && session?.user) {
        token.user = {
          ...(token.user as SessionUser),
          ...session.user,
        };
      }

      // Access token is still valid
      if (
        token.accessTokenExpiresAt &&
        Date.now() < (token.accessTokenExpiresAt as number)
      ) {
        return token;
      }

      // Access token has expired → rotate refresh token
      return refreshAccessToken({
        user: token.user as SessionUser,
        token: token.token as string,
        refreshToken: token.refreshToken as string,
        accessTokenExpiresAt: token.accessTokenExpiresAt as number,
        error: token.error as "RefreshTokenError" | undefined,
      });
    },
    session: ({ session, token }) => {
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
        };
      }

      session.token = token.token as string;
      session.refreshToken = token.refreshToken as string;

      if (token.error) {
        session.error = token.error as "RefreshTokenError";
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: routes.auth.login,
    error: routes.auth.login,
  },
  trustHost: true,
} satisfies NextAuthConfig;
