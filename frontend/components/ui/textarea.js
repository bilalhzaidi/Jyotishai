import clsx from "clsx";

/**
 * Textarea component used for multi-line input.
 */
export default function Textarea({ className, rows = 3, ...props }) {
  const base =
    "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
  return <textarea rows={rows} className={clsx(base, className)} {...props} />;
}