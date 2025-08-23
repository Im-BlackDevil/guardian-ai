// Advanced bias detection with intelligent context analysis
export const biasKeywords = [
  // Always biased (no exceptions)
  "stupid", "idiot", "terrible", "awful", "hate", "disgusting", "kill", "die",
  "racist", "sexist", "toxic", "discriminatory", "superior", "inferior"
];

// Context-dependent keywords that need careful analysis
export const contextDependentKeywords = [
  "always", "never", "everyone", "nobody", "all", "every",
  "males", "females", "guys", "girls", "men", "women",
  "iit", "harvard", "oxford", "cultural", "ethnicity", "background",
  "older", "younger", "age group", "generation",
  "consensus", "unanimous", "whole team", "finalize", "agrees",
  "first impression", "initial thought", "started with", "began with",
  "proves", "confirms", "expected", "knew", "told you so",
  "students", "workers", "engineers", "managers", "professionals"
];

// Positive phrases that should NEVER trigger bias detection
export const positivePhrases = [
  "all people should be treated equally",
  "all peoples should be treat equally", // Handle grammar variations
  "everyone deserves respect",
  "all humans are equal",
  "treat everyone fairly",
  "respect all people",
  "equal rights for all",
  "diversity and inclusion",
  "inclusive environment",
  "fair treatment",
  "equal opportunity",
  "respectful communication",
  "inclusive language",
  "diverse perspectives",
  "equal access",
  "fair representation",
  "inclusive culture",
  "equal treatment",
  "respectful dialogue",
  "inclusive practices",
  "fair assessment",
  "all people can",
  "everyone can",
  "all people have",
  "everyone has",
  "all people deserve",
  "everyone deserves",
  "all people need",
  "everyone needs",
  "all people are",
  "everyone is",
  "all people will",
  "everyone will",
  "all people must",
  "everyone must",
  "all people should",
  "everyone should"
];

// Negative bias patterns that should ALWAYS trigger bias detection
export const negativeBiasPatterns = [
  // Gender stereotypes
  { pattern: /all\s+(?:women?|men|males?|females?)\s+(?:are|can't|won't|don't|is|was)/gi, type: "gender_stereotyping" },
  { pattern: /every\s+(?:woman|man|male|female)\s+(?:is|are|can't|won't)/gi, type: "gender_stereotyping" },
  
  // Educational bias
  { pattern: /(?:from|graduates?\s+from)\s+\w+\s+(?:are|is)\s+better/gi, type: "educational_bias" },
  { pattern: /\w+\s+(?:graduates?|students?)\s+(?:are|is)\s+superior/gi, type: "educational_bias" },
  
  // Groupthink
  { pattern: /everyone\s+agrees/gi, type: "groupthink" },
  { pattern: /we\s+all\s+think/gi, type: "groupthink" },
  { pattern: /nobody\s+disagrees/gi, type: "groupthink" },
  { pattern: /consensus\s+is/gi, type: "groupthink" },
  
  // Toxic language
  { pattern: /this\s+(?:is|was)\s+(?:stupid|terrible|awful|idiotic)/gi, type: "toxic_language" },
  { pattern: /that\s+(?:is|was)\s+(?:stupid|terrible|awful|idiotic)/gi, type: "toxic_language" },
  { pattern: /i\s+hate\s+this/gi, type: "toxic_language" },
  
  // Age bias
  { pattern: /(?:older|younger)\s+people\s+can't/gi, type: "age_bias" },
  { pattern: /age\s+group\s+\d+\s+can't/gi, type: "age_bias" },
  
  // Stereotyping
  { pattern: /all\s+\w+\s+(?:are|can't|won't|don't|is|was)\s+\w+/gi, type: "stereotyping" },
  { pattern: /every\s+\w+\s+(?:is|are|can't|won't)/gi, type: "stereotyping" }
];

// Function to check if text contains positive context
function hasPositiveContext(text: string): boolean {
  const lowerText = text.toLowerCase();
  
  // Check for exact positive phrases
  if (positivePhrases.some(phrase => lowerText.includes(phrase.toLowerCase()))) {
    return true;
  }
  
  // Check for positive context patterns
  const positivePatterns = [
    /all\s+people\s+should/gi,
    /everyone\s+deserves/gi,
    /all\s+people\s+can/gi,
    /everyone\s+can/gi,
    /all\s+people\s+have/gi,
    /everyone\s+has/gi,
    /all\s+people\s+deserve/gi,
    /everyone\s+deserves/gi,
    /all\s+people\s+need/gi,
    /everyone\s+needs/gi,
    /all\s+people\s+are/gi,
    /everyone\s+is/gi,
    /all\s+people\s+will/gi,
    /everyone\s+will/gi,
    /all\s+people\s+must/gi,
    /everyone\s+must/gi
  ];
  
  return positivePatterns.some(pattern => pattern.test(text));
}

// Function to check if text contains negative context
function hasNegativeContext(text: string): boolean {
  const lowerText = text.toLowerCase();
  
  // Check for negative words that indicate bias
  const negativeWords = [
    'stupid', 'idiot', 'terrible', 'awful', 'hate', 'disgusting',
    'kill', 'die', 'racist', 'sexist', 'toxic', 'discriminatory',
    'superior', 'inferior', 'weak', 'lazy', 'aggressive', 'emotional'
  ];
  
  if (negativeWords.some(word => lowerText.includes(word))) {
    return true;
  }
  
  // Check for negative patterns
  const negativePatterns = [
    /all\s+\w+\s+(?:are|can't|won't|don't|is|was)\s+(?:stupid|weak|lazy|aggressive|emotional)/gi,
    /every\s+\w+\s+(?:is|are|can't|won't)\s+(?:stupid|weak|lazy|aggressive|emotional)/gi,
    /(?:women|men|males|females)\s+(?:are|can't|won't|don't)\s+(?:stupid|weak|lazy|aggressive|emotional)/gi
  ];
  
  return negativePatterns.some(pattern => pattern.test(text));
}

export function detectBiasRules(text: string) {
  // If it's a positive/inclusive message, don't detect bias
  if (hasPositiveContext(text)) {
    return [];
  }
  
  // If it's clearly negative/biased, detect bias
  if (hasNegativeContext(text)) {
    const detectedPatterns = negativeBiasPatterns
      .filter(({ pattern }) => pattern.test(text))
      .map(({ type }) => type);
    
    return [...new Set(detectedPatterns)];
  }
  
  // Check for context-dependent keywords only in negative contexts
  const lowerText = text.toLowerCase();
  const detectedKeywords = biasKeywords.filter(keyword => lowerText.includes(keyword.toLowerCase()));
  
  // Only check context-dependent keywords if we haven't already determined it's positive
  if (detectedKeywords.length === 0) {
    const contextKeywords = contextDependentKeywords.filter(keyword => {
      if (lowerText.includes(keyword.toLowerCase())) {
        // Additional context checks for specific keywords
        if (keyword === 'all' || keyword === 'every') {
          // Only flag if used in negative generalizations
          return /all\s+\w+\s+(?:are|can't|won't|don't|is|was)/gi.test(text) ||
                 /every\s+\w+\s+(?:is|are|can't|won't)/gi.test(text);
        }
        if (keyword === 'people') {
          // Only flag if used in negative contexts
          return hasNegativeContext(text);
        }
        return true;
      }
      return false;
    });
    
    return [...new Set([...detectedKeywords, ...contextKeywords])];
  }
  
  return detectedKeywords;
}
  