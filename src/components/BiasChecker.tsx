import React, { useState } from "react";
import { detectBias } from "@/utils/hybridBiasEngine";

export default function BiasChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);

  async function handleCheck() {
    const res = await detectBias(input);
    setResult(res);
  }

  return (
    <div className="p-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full rounded"
        rows={5}
        placeholder="Paste article or text here..."
      />
      <button
        onClick={handleCheck}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Check Bias
      </button>

      {result && (
        <div className="mt-4">
          <h3 className="font-bold">Bias Detection Results</h3>
          <p><b>Rule Matches:</b> {result.ruleMatches.join(", ") || "None"}</p>
          <p><b>ML Matches:</b> {result.mlMatches.join(", ") || "None"}</p>
          <p><b>Final Verdict:</b> {result.isBiased ? "⚠️ Biased" : "✅ Neutral"}</p>
        </div>
      )}
    </div>
  );
}
