import Link from "next/link";
import { btnGhost, btnPrimary } from "./extras";
import { routes } from "@/libs/routes";

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-lg border border-gray-200 px-6 py-16 text-center dark:border-gray-800">
      <h2 className="text-base font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        We {`couldn't`} load your pipeline.
      </p>
      <button type="button" onClick={onRetry} className={`${btnGhost} mt-6`}>
        Try again
      </button>
    </div>
  );
}

export function EmptyPipeline() {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 px-6 py-20 text-center dark:border-gray-800">
      <h2 className="text-base font-semibold">Your pipeline is empty</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
        Add your first lead to start tracking your client opportunities.
      </p>
      <Link href={routes.leads.new} className={`${btnPrimary} mt-6`}>
        <span aria-hidden="true">+</span> Add your first lead
      </Link>
    </div>
  );
}
