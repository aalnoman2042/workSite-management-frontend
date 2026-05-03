"use client";

import { askAI } from "@/services/ai/askAI";
import { Sparkles } from "lucide-react";
import { useActionState } from "react";

const AskAIForm = () => {
  const [state, formAction, isPending] = useActionState(askAI, null);

  return (
    <div className="space-y-6">
      <form action={formAction} className="flex gap-2">
        <input
          name="query"
          type="text"
          required
          placeholder="e.g. plumbers at Site Alpha"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-black text-white px-5 py-2 rounded-lg font-medium hover:bg-neutral-800 transition-all disabled:bg-neutral-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          {isPending ? "Searching..." : "Ask"}
        </button>
      </form>

      {state && !state.success && (
        <p className="text-red-600 text-sm">{state.message}</p>
      )}

      {state?.success && (
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm whitespace-pre-wrap text-sm">
          {state.answer}
        </div>
      )}
    </div>
  );
};

export default AskAIForm;