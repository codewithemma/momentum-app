import { format } from "date-fns";

export function fmt(iso: string | null) {
  if (!iso) return null;
  return format(new Date(iso), "MMM d, yyyy");
}
