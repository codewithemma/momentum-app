import { CircleCheck, CircleX, Info, LoaderCircle, X } from "lucide-react";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

type ToastVariant = "success" | "error" | "info";

type ToastOptions = {
  variant?: ToastVariant;
  message: string;
  isLoading?: boolean;
};

/** Show one notification at a time; loading takes precedence over the variant. */
export function toast({
  variant = "success",
  message,
  isLoading = false,
}: ToastOptions) {
  if (isLoading) return sonnerToast.loading(message);
  if (variant === "error")
    return sonnerToast.error(message || "Something went wrong");
  if (variant === "info") return sonnerToast.info(message);
  return sonnerToast.success(message);
}

export const dismissToast = sonnerToast.dismiss;

export function MomentumToaster({ isDark }: { isDark: boolean }) {
  return (
    <SonnerToaster
      theme={isDark ? "dark" : "light"}
      position="bottom-right"
      visibleToasts={3}
      closeButton
      icons={{
        success: (
          <CircleCheck
            aria-hidden="true"
            className="size-4 text-green-600 dark:text-green-500"
          />
        ),
        error: (
          <CircleX
            aria-hidden="true"
            className="size-4 text-red-600 dark:text-red-400"
          />
        ),
        info: (
          <Info
            aria-hidden="true"
            className="size-4 text-blue-600 dark:text-blue-500"
          />
        ),
        loading: (
          <LoaderCircle
            aria-hidden="true"
            className="size-4 animate-spin text-blue-600 dark:text-blue-500 motion-reduce:animate-none"
          />
        ),
        close: <X aria-hidden="true" className="size-4" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-full items-center gap-3 rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100",
          title: "text-sm font-medium leading-5",
          icon: "shrink-0",
          closeButton:
            "rounded-sm border border-gray-200 bg-white p-1 text-gray-500 hover:text-gray-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
          success: "border-l-2 border-l-green-600 dark:border-l-green-500",
          error: "border-l-2 border-l-red-600 dark:border-l-red-400",
          info: "border-l-2 border-l-blue-600 dark:border-l-blue-500",
          loading: "border-l-2 border-l-blue-600 dark:border-l-blue-500",
        },
      }}
    />
  );
}
