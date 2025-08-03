import { useState } from "react";
import Button from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";

/**
 * Chat component renders messages with icons and provides an input for new messages.
 *
 * Props:
 * - messages: array of { role: 'user' | 'assistant' | 'loading', text: string }
 * - onSend: async function(message: string): should return void
 * - loading: boolean indicating if the bot is generating a response
 */
export default function Chat({ messages = [], onSend, loading = false }) {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await onSend(input.trim());
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto rounded border border-gray-200 p-3 mb-2 bg-gray-50 text-sm space-y-2">
        {messages.length === 0 && !loading && (
          <div className="text-gray-500">Ask a question about your report...</div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className="flex items-start">
            {msg.role === "assistant" && <div className="mr-2">🔮</div>}
            <div
              className={
                msg.role === "assistant"
                  ? "rounded bg-gray-200 px-3 py-1 text-gray-800"
                  : "ml-auto rounded bg-blue-600 px-3 py-1 text-white"
              }
            >
              {msg.text}
            </div>
            {msg.role === "user" && <div className="ml-2">🧑</div>}
          </div>
        ))}
        {loading && (
          <div className="flex items-start">
            <div className="mr-2">🔮</div>
            <div className="animate-pulse rounded bg-gray-200 px-3 py-1 text-gray-800">
              ...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Textarea
          className="flex-1 resize-none"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
        />
        <Button type="submit" className="self-end">
          Send
        </Button>
      </form>
    </div>
  );
}