import { detectBiasRules } from "./biasRules";
import { detectBiasML } from "./mlBias";

export async function detectBias(text: string) {
  // Step 1: Rule-based detection
  const ruleMatches = detectBiasRules(text);

  // Step 2: ML-based detection
  const mlMatches = await detectBiasML(text);

  // Step 3: Merge
  return {
    ruleMatches,
    mlMatches,
    isBiased: ruleMatches.length > 0 || mlMatches.length > 0
  };
}
