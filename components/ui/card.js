import clsx from "clsx";

/**
 * Card component provides a container with border and shadow.
 */
export default function Card({ children, className, ...props }) {
  const base = "rounded-lg border border-gray-200 bg-white p-4 shadow-sm";
  return (
    <div className={clsx(base, className)} {...props}>
      {children}
    </div>
  );
}