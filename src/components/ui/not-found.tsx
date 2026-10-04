"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function VineMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M60 110 C60 86 60 64 60 40" />
      <path d="M60 92 C48 86 40 78 40 66 C40 58 48 54 56 58 C60 60 60 66 60 70" />
      <path d="M60 80 C72 74 80 66 80 54 C80 46 72 42 64 46 C60 48 60 54 60 58" />
      <path d="M60 64 C52 58 46 50 46 40 C46 33 53 29 59 33 C60 34 60 36 60 38" />
      <path d="M60 48 C66 42 70 35 70 27 C70 21 64 18 59 22 C58 23 58 25 58 27" />
      <path d="M60 110 C56 104 52 100 46 100 C42 100 40 104 43 107 C46 110 54 109 60 106" />
    </svg>
  );
}

const NotFoundClientPage = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:py-24">
        <div className="w-full max-w-xl text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Decorative vine mark */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center text-stone-300">
              <VineMark className="h-20 w-20" />
            </div>

            {/* 404 indicator */}
            <p className="font-serif text-7xl tracking-tight text-stone-900 sm:text-8xl">
              404
            </p>

            {/* Heading */}
            <h1 className="mt-4 font-serif text-2xl tracking-tight text-stone-900 sm:text-3xl">
              We {`couldn't`} find that page
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-stone-600">
              The page {`you're`} looking for may have moved, been removed, or
              never existed.
            </p>

            {/* Actions */}
            <div className="mx-auto mt-9 flex max-w-sm flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="flex h-12 flex-1 items-center justify-center bg-stone-900 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-stone-700"
              >
                Back to home
              </Link>
              <Link
                href="/dashboard"
                className="flex h-12 flex-1 items-center justify-center border border-stone-900 bg-white text-sm font-semibold tracking-wide text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
              >
                Continue shopping
              </Link>
            </div>

            {/* Subtle go-back action */}
            <button
              type="button"
              onClick={() => router.back()}
              className="mx-auto mt-6 flex items-center gap-1.5 text-sm text-stone-500 transition-colors hover:text-stone-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundClientPage;
