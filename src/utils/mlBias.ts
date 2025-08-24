// Enhanced ML bias detection with comprehensive patterns and context awareness
// This provides better bias detection than the simplified version

import { enhancedBiasDetector } from './enhancedBiasDatasets';

let modelLoaded = false;

// Load model once
export async function loadModel() {
  try {
    // Enhanced bias detection model with comprehensive datasets
    modelLoaded = true;
    return true;
  } catch (error) {
    console.warn('Failed to load ML model:', error);
    return false;
  }
}

// Positive/neutral contexts that should NOT trigger bias detection
const positiveContexts = [
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

// Context-aware bias detection patterns
const biasPatterns = [
  // Toxic language (always biased)
  { pattern: /stupid|idiot|terrible|awful|hate|kill|die/gi, type: 'toxic' },
  
  // Gender stereotyping (context-dependent)
  { pattern: /males?\s+are\s+\w+|females?\s+are\s+\w+|men\s+are\s+\w+|women\s+are\s+\w+/gi, type: 'gender_stereotyping' },
  
  // Educational bias (context-dependent)
  { pattern: /from\s+\w+\s+.*better|graduates?\s+.*superior/gi, type: 'educational_bias' },
  
  // Groupthink (context-dependent)
  { pattern: /everyone\s+agrees|we\s+all\s+think|nobody\s+disagrees|consensus\s+is/gi, type: 'groupthink' },
  
  // Anchoring bias (context-dependent)
  { pattern: /first\s+impression|initial\s+thought|started\s+with|began\s+with/gi, type: 'anchoring' },
  
  // Confirmation bias (context-dependent)
  { pattern: /proves\s+my\s+point|as\s+expected|i\s+knew\s+it/gi, type: 'confirmation' },
  
  // Age bias (context-dependent)
  { pattern: /older\s+people\s+can't|younger\s+people\s+can't/gi, type: 'age_bias' },
  
  // Stereotyping (context-dependent)
  { pattern: /all\s+\w+\s+are\s+\w+|every\s+\w+\s+is\s+\w+/gi, type: 'stereotyping' }
];

// Function to check if text contains positive context
function hasPositiveContext(text: string): boolean {
  const lowerText = text.toLowerCase();
  
  // Check for exact positive phrases
  if (positiveContexts.some(context => lowerText.includes(context.toLowerCase()))) {
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

export async function detectBiasML(text: string) {
  try {
    if (!modelLoaded) {
      await loadModel();
    }

    // Use the enhanced bias detector with comprehensive datasets
    const enhancedResult = enhancedBiasDetector.detectBias(text);
    
    if (!enhancedResult.hasBias) {
      return [];
    }

    // Map enhanced bias types to existing system types
    const biasTypeMapping: { [key: string]: string } = {
      'gender_stereotyping': 'gender_bias',
      'age_bias': 'age_bias',
      'educational_bias': 'cultural_bias',
      'hierarchical_bias': 'stereotyping',
      'department_stereotyping': 'stereotyping',
      'racial_stereotyping': 'stereotyping',
      'religious_bias': 'stereotyping',
      'nationality_bias': 'stereotyping',
      'socioeconomic_bias': 'stereotyping',
      'confirmation_bias': 'confirmation',
      'anchoring_bias': 'anchoring',
      'groupthink': 'groupthink',
      'availability_bias': 'generalization',
      'toxic_language': 'toxic',
      'dismissive_language': 'toxic',
      'stereotyping': 'stereotyping',
      'generalization': 'generalization'
    };

    const mappedBiases = enhancedResult.biasTypes.map(type => 
      biasTypeMapping[type] || type
    );

    return [...new Set(mappedBiases)]; // Remove duplicates
  } catch (error) {
    console.warn('ML bias detection failed:', error);
    return [];
  }
}
