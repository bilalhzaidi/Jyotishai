import clsx from "clsx";

/**
 * Button component styled with Tailwind CSS, similar to shadcn/ui button.
 */
export default function Button({ type = "button", children, className, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50";
  return (
    <button type={type} className={clsx(base, className)} {...props}>
      {children}
    </button>
  );
}