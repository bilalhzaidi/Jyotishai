/**
 * ModuleSelect renders checkboxes for selecting diagnostic modules.
 */
export default function ModuleSelect({ modules, selected = [], onChange }) {
  return (
    <div className="space-y-1">
      {modules.map((mod) => (
        <label key={mod.value} className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            name={mod.value}
            value={mod.value}
            checked={selected.includes(mod.value)}
            onChange={(e) => onChange(e.target.value, e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>{mod.label}</span>
        </label>
      ))}
    </div>
  );
}