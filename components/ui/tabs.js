import clsx from "clsx";

/**
 * Tabs component allows toggling between different content panels.
 * Accepts tabs: array of { id, label, content }, activeTab id and onTabChange callback.
 */
export default function Tabs({ tabs = [], activeTab, onTabChange }) {
  return (
    <div>
      <div className="mb-4 flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={clsx(
              "mr-4 pb-2 text-sm font-medium focus:outline-none",
              activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            )}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}