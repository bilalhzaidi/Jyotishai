import clsx from "clsx";

/**
 * Input component providing consistent styling.
 */
export default function Input({ className, ...props }) {
  const base =
    "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
  return <input className={clsx(base, className)} {...props} />;
}