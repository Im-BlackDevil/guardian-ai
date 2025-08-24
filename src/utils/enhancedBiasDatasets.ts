// Enhanced Bias Detection Datasets for Maximum Accuracy
// Comprehensive training data covering all bias types and fields

export interface BiasTrainingExample {
  text: string;
  biasType: string;
  severity: 'low' | 'medium' | 'high';
  field: string;
  context: string;
  confidence: number;
}

// 🎯 COMPREHENSIVE BIAS DATASETS

// 1. WORKPLACE & PROFESSIONAL BIASES
export const workplaceBiasExamples: BiasTrainingExample[] = [
  // Gender Bias in Workplace
  { text: "Women are too emotional for leadership roles", biasType: "gender_stereotyping", severity: "high", field: "workplace", context: "professional", confidence: 0.95 },
  { text: "Men are naturally better at technical work", biasType: "gender_stereotyping", severity: "high", field: "workplace", context: "professional", confidence: 0.95 },
  { text: "She's a woman, so she'll be more nurturing", biasType: "gender_stereotyping", severity: "medium", field: "workplace", context: "professional", confidence: 0.90 },
  { text: "He's a man, so he'll be more assertive", biasType: "gender_stereotyping", severity: "medium", field: "workplace", context: "professional", confidence: 0.90 },
  
  // Age Bias
  { text: "Young people don't have enough experience", biasType: "age_bias", severity: "medium", field: "workplace", context: "professional", confidence: 0.85 },
  { text: "Older employees can't adapt to new technology", biasType: "age_bias", severity: "high", field: "workplace", context: "professional", confidence: 0.90 },
  { text: "Millennials are entitled and lazy", biasType: "age_bias", severity: "high", field: "workplace", context: "professional", confidence: 0.95 },
  { text: "Boomers are stuck in their ways", biasType: "age_bias", severity: "medium", field: "workplace", context: "professional", confidence: 0.85 },
  
  // Educational Bias
  { text: "IIT graduates are always better than others", biasType: "educational_bias", severity: "high", field: "workplace", context: "professional", confidence: 0.95 },
  { text: "Harvard students are superior to everyone else", biasType: "educational_bias", severity: "high", field: "workplace", context: "professional", confidence: 0.95 },
  { text: "People from top universities are naturally smarter", biasType: "educational_bias", severity: "high", field: "workplace", context: "professional", confidence: 0.90 },
  { text: "Elite school graduates deserve higher pay", biasType: "educational_bias", severity: "medium", field: "workplace", context: "professional", confidence: 0.85 },
  
  // Hierarchical Bias
  { text: "Junior employees can't contribute meaningful ideas", biasType: "hierarchical_bias", severity: "medium", field: "workplace", context: "professional", confidence: 0.80 },
  { text: "Only senior managers should make decisions", biasType: "hierarchical_bias", severity: "medium", field: "workplace", context: "professional", confidence: 0.80 },
  { text: "Entry-level workers don't understand the business", biasType: "hierarchical_bias", severity: "medium", field: "workplace", context: "professional", confidence: 0.75 },
  
  // Department Bias
  { text: "Marketing people are all creative and disorganized", biasType: "department_stereotyping", severity: "medium", field: "workplace", context: "professional", confidence: 0.80 },
  { text: "Engineers are socially awkward and boring", biasType: "department_stereotyping", severity: "medium", field: "workplace", context: "professional", confidence: 0.80 },
  { text: "Sales people are all aggressive and pushy", biasType: "department_stereotyping", severity: "medium", field: "workplace", context: "professional", confidence: 0.80 },
  { text: "HR people are too soft and emotional", biasType: "department_stereotyping", severity: "medium", field: "workplace", context: "professional", confidence: 0.75 }
];

// 2. SOCIAL & CULTURAL BIASES
export const socialBiasExamples: BiasTrainingExample[] = [
  // Racial & Ethnic Bias
  { text: "All Asians are good at math", biasType: "racial_stereotyping", severity: "high", field: "social", context: "casual", confidence: 0.95 },
  { text: "Black people are naturally athletic", biasType: "racial_stereotyping", severity: "high", field: "social", context: "casual", confidence: 0.95 },
  { text: "White people are privileged and entitled", biasType: "racial_stereotyping", severity: "medium", field: "social", context: "casual", confidence: 0.80 },
  { text: "Hispanics are all hardworking and family-oriented", biasType: "racial_stereotyping", severity: "medium", field: "social", context: "casual", confidence: 0.80 },
  
  // Religious Bias
  { text: "Muslims are all religious extremists", biasType: "religious_bias", severity: "high", field: "social", context: "casual", confidence: 0.95 },
  { text: "Christians are all conservative and judgmental", biasType: "religious_bias", severity: "medium", field: "social", context: "casual", confidence: 0.80 },
  { text: "Jews are all wealthy and greedy", biasType: "religious_bias", severity: "high", field: "social", context: "casual", confidence: 0.90 },
  { text: "Hindus are all spiritual and peaceful", biasType: "religious_bias", severity: "medium", field: "social", context: "casual", confidence: 0.75 },
  
  // Nationality Bias
  { text: "Americans are all ignorant about other cultures", biasType: "nationality_bias", severity: "medium", field: "social", context: "casual", confidence: 0.80 },
  { text: "French people are all rude and arrogant", biasType: "nationality_bias", severity: "medium", field: "social", context: "casual", confidence: 0.80 },
  { text: "Germans are all efficient and cold", biasType: "nationality_bias", severity: "medium", field: "social", context: "casual", confidence: 0.75 },
  { text: "Italians are all passionate and dramatic", biasType: "nationality_bias", severity: "medium", field: "social", context: "casual", confidence: 0.75 },
  
  // Socioeconomic Bias
  { text: "Rich people are all selfish and greedy", biasType: "socioeconomic_bias", severity: "medium", field: "social", context: "casual", confidence: 0.80 },
  { text: "Poor people are all lazy and unmotivated", biasType: "socioeconomic_bias", severity: "high", field: "social", context: "casual", confidence: 0.90 },
  { text: "Middle class people are all boring and conventional", biasType: "socioeconomic_bias", severity: "low", field: "social", context: "casual", confidence: 0.70 }
];

// 3. COGNITIVE BIASES
export const cognitiveBiasExamples: BiasTrainingExample[] = [
  // Confirmation Bias
  { text: "This proves my point exactly", biasType: "confirmation_bias", severity: "medium", field: "cognitive", context: "discussion", confidence: 0.85 },
  { text: "As expected, this failed miserably", biasType: "confirmation_bias", severity: "medium", field: "cognitive", context: "discussion", confidence: 0.85 },
  { text: "I knew it wouldn't work from the start", biasType: "confirmation_bias", severity: "medium", field: "cognitive", context: "discussion", confidence: 0.80 },
  { text: "This confirms what I've been saying all along", biasType: "confirmation_bias", severity: "medium", field: "cognitive", context: "discussion", confidence: 0.80 },
  
  // Anchoring Bias
  { text: "My first impression is that this won't work", biasType: "anchoring_bias", severity: "medium", field: "cognitive", context: "discussion", confidence: 0.80 },
  { text: "Initial thought is this is a bad idea", biasType: "anchoring_bias", severity: "medium", field: "cognitive", context: "discussion", confidence: 0.80 },
  { text: "Started with the wrong approach, so it's doomed", biasType: "anchoring_bias", severity: "medium", field: "cognitive", context: "discussion", confidence: 0.80 },
  { text: "Began with a poor foundation, can't recover", biasType: "anchoring_bias", severity: "medium", field: "cognitive", context: "discussion", confidence: 0.80 },
  
  // Groupthink
  { text: "Everyone agrees with him, let's finalize this", biasType: "groupthink", severity: "high", field: "cognitive", context: "discussion", confidence: 0.90 },
  { text: "We all think this is the right approach", biasType: "groupthink", severity: "medium", field: "cognitive", context: "discussion", confidence: 0.80 },
  { text: "Nobody disagrees with this decision", biasType: "groupthink", severity: "high", field: "cognitive", context: "discussion", confidence: 0.90 },
  { text: "The whole team supports this unanimously", biasType: "groupthink", severity: "medium", field: "cognitive", context: "discussion", confidence: 0.80 },
  { text: "Consensus is we should proceed immediately", biasType: "groupthink", severity: "medium", field: "cognitive", context: "discussion", confidence: 0.80 },
  { text: "Everyone is on board, no need for discussion", biasType: "groupthink", severity: "high", field: "cognitive", context: "discussion", confidence: 0.85 },
  
  // Availability Bias
  { text: "I saw this happen once, so it's common", biasType: "availability_bias", severity: "medium", field: "cognitive", context: "discussion", confidence: 0.75 },
  { text: "Recent examples prove this is always true", biasType: "availability_bias", severity: "medium", field: "cognitive", context: "discussion", confidence: 0.75 },
  { text: "I remember this clearly, so it must be right", biasType: "availability_bias", severity: "medium", field: "cognitive", context: "discussion", confidence: 0.75 }
];

// 4. TOXIC & HARMFUL LANGUAGE
export const toxicLanguageExamples: BiasTrainingExample[] = [
  // Explicit Toxicity
  { text: "This is absolutely stupid and terrible", biasType: "toxic_language", severity: "high", field: "communication", context: "casual", confidence: 0.95 },
  { text: "That idea is completely idiotic", biasType: "toxic_language", severity: "high", field: "communication", context: "casual", confidence: 0.95 },
  { text: "I hate this approach with a passion", biasType: "toxic_language", severity: "high", field: "communication", context: "casual", confidence: 0.95 },
  { text: "This is the worst solution ever", biasType: "toxic_language", severity: "high", field: "communication", context: "casual", confidence: 0.95 },
  { text: "That's completely awful and disgusting", biasType: "toxic_language", severity: "high", field: "communication", context: "casual", confidence: 0.95 },
  { text: "This makes me sick to my stomach", biasType: "toxic_language", severity: "high", field: "communication", context: "casual", confidence: 0.95 },
  
  // Subtle Toxicity
  { text: "This is ridiculous and makes no sense", biasType: "toxic_language", severity: "medium", field: "communication", context: "casual", confidence: 0.80 },
  { text: "That's nonsense and a waste of time", biasType: "toxic_language", severity: "medium", field: "communication", context: "casual", confidence: 0.80 },
  { text: "This is pointless and stupid", biasType: "toxic_language", severity: "medium", field: "communication", context: "casual", confidence: 0.80 },
  { text: "That's crazy and unrealistic", biasType: "toxic_language", severity: "medium", field: "communication", context: "casual", confidence: 0.75 },
  
  // Dismissive Language
  { text: "Whatever, this is useless anyway", biasType: "dismissive_language", severity: "medium", field: "communication", context: "casual", confidence: 0.80 },
  { text: "I don't care, do what you want", biasType: "dismissive_language", severity: "medium", field: "communication", context: "casal", confidence: 0.75 },
  { text: "This is a joke, not worth discussing", biasType: "dismissive_language", severity: "medium", field: "communication", context: "casual", confidence: 0.80 }
];

// 5. POSITIVE & NEUTRAL EXAMPLES (Should NOT trigger bias detection)
export const positiveExamples: BiasTrainingExample[] = [
  // Inclusive Language
  { text: "All people should be treated equally", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 },
  { text: "Everyone deserves respect and dignity", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 },
  { text: "All humans are equal regardless of background", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 },
  { text: "Treat everyone fairly and with kindness", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 },
  { text: "Respect all people for who they are", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 },
  { text: "Equal rights for all individuals", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 },
  { text: "Diversity and inclusion make us stronger", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 },
  { text: "Inclusive environment benefits everyone", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 },
  { text: "Fair treatment for all team members", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 },
  { text: "Equal opportunity for growth and success", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 },
  
  // Neutral Professional Language
  { text: "The team needs to review the proposal", biasType: "none", severity: "none", field: "workplace", context: "neutral", confidence: 0.95 },
  { text: "We should analyze the data carefully", biasType: "none", severity: "none", field: "workplace", context: "neutral", confidence: 0.95 },
  { text: "Let's consider all available options", biasType: "none", severity: "none", field: "workplace", context: "neutral", confidence: 0.95 },
  { text: "The project requires additional resources", biasType: "none", severity: "none", field: "workplace", context: "neutral", confidence: 0.95 },
  { text: "We can work together to find solutions", biasType: "none", severity: "none", field: "workplace", context: "neutral", confidence: 0.95 },
  { text: "The approach seems reasonable", biasType: "none", severity: "none", field: "workplace", context: "neutral", confidence: 0.95 },
  { text: "The outcome looks promising", biasType: "none", severity: "none", field: "workplace", context: "neutral", confidence: 0.95 },
  { text: "This solution appears effective", biasType: "none", severity: "none", field: "workplace", context: "neutral", confidence: 0.95 },
  
  // Positive Generalizations
  { text: "All people can learn and grow", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 },
  { text: "Everyone has potential for success", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 },
  { text: "All people deserve happiness", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 },
  { text: "Everyone needs support sometimes", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 },
  { text: "All people have valuable contributions", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 },
  { text: "Everyone matters in this organization", biasType: "none", severity: "none", field: "communication", context: "positive", confidence: 0.95 }
];

// 🚀 ENHANCED BIAS DETECTION ENGINE
export class EnhancedBiasDetector {
  private trainingData: BiasTrainingExample[];
  
  constructor() {
    this.trainingData = [
      ...workplaceBiasExamples,
      ...socialBiasExamples,
      ...cognitiveBiasExamples,
      ...toxicLanguageExamples,
      ...positiveExamples
    ];
  }
  
  // Enhanced bias detection with comprehensive pattern matching
  public detectBias(text: string): {
    hasBias: boolean;
    biasTypes: string[];
    confidence: number;
    severity: 'low' | 'medium' | 'high' | 'none';
    suggestions: string[];
  } {
    const lowerText = text.toLowerCase();
    const detectedBiases: string[] = [];
    let maxConfidence = 0;
    let maxSeverity: 'low' | 'medium' | 'high' | 'none' = 'none';
    
    // Check against training data for exact matches
    const exactMatches = this.trainingData.filter(example => 
      lowerText.includes(example.text.toLowerCase())
    );
    
    if (exactMatches.length > 0) {
      exactMatches.forEach(match => {
        if (match.biasType !== 'none') {
          detectedBiases.push(match.biasType);
          maxConfidence = Math.max(maxConfidence, match.confidence);
          if (match.severity !== 'none') {
            maxSeverity = match.severity;
          }
        }
      });
    }
    
    // Enhanced pattern matching for complex cases
    const enhancedPatterns = [
      // Gender & Identity
      { pattern: /(?:all|every)\s+(?:women|men|girls|boys|females|males)\s+(?:are|can't|won't|don't|is|was)/gi, type: 'gender_stereotyping', confidence: 0.90 },
      { pattern: /(?:women|men|girls|boys|females|males)\s+(?:are\s+)?(?:always|never|too|very)\s+\w+/gi, type: 'gender_stereotyping', confidence: 0.85 },
      
      // Educational & Institutional
      { pattern: /(?:from|graduated\s+from)\s+(?:iit|mit|harvard|oxford|stanford|yale)\s+(?:so\s+)?(?:he|she|they)\s+(?:will|must|should|is|are)\s+(?:better|superior|smarter)/gi, type: 'educational_bias', confidence: 0.95 },
      { pattern: /(?:iit|mit|harvard|oxford|stanford|yale)\s+(?:graduates?|students?)\s+(?:are\s+)?(?:always|naturally|inherently)\s+(?:better|superior|smarter)/gi, type: 'educational_bias', confidence: 0.95 },
      
      // Age & Generation
      { pattern: /(?:older|elderly|senior)\s+(?:people|employees?|workers?)\s+(?:can't|won't|don't|are\s+too)/gi, type: 'age_bias', confidence: 0.90 },
      { pattern: /(?:younger|young|millennial|gen\s*z)\s+(?:people|employees?|workers?)\s+(?:are\s+)?(?:entitled|lazy|inexperienced|naive)/gi, type: 'age_bias', confidence: 0.90 },
      
      // Groupthink & Consensus
      { pattern: /(?:everyone|we\s+all|nobody|the\s+whole\s+team)\s+(?:agrees?|thinks?|supports?|disagrees?)/gi, type: 'groupthink', confidence: 0.85 },
      { pattern: /(?:consensus|unanimous|unanimously)\s+(?:decision|agreement|support)/gi, type: 'groupthink', confidence: 0.85 },
      
      // Toxic & Harmful
      { pattern: /(?:absolutely|completely|totally)\s+(?:stupid|idiotic|terrible|awful|ridiculous|nonsense)/gi, type: 'toxic_language', confidence: 0.95 },
      { pattern: /(?:hate|despise|loathe|detest)\s+(?:this|that|it|these|those)/gi, type: 'toxic_language', confidence: 0.95 },
      { pattern: /(?:disgusting|sickening|nauseating|revolting)/gi, type: 'toxic_language', confidence: 0.90 },
      
      // Stereotyping & Generalization
      { pattern: /(?:all|every|each)\s+\w+\s+(?:are|is|can't|won't|don't)/gi, type: 'stereotyping', confidence: 0.80 },
      { pattern: /(?:everyone|nobody|everybody|anyone)\s+(?:always|never|can't|won't)/gi, type: 'generalization', confidence: 0.80 },
      
      // Confirmation & Anchoring
      { pattern: /(?:proves|confirms|validates)\s+(?:my|our|the)\s+(?:point|theory|belief|assumption)/gi, type: 'confirmation_bias', confidence: 0.85 },
      { pattern: /(?:first|initial|original)\s+(?:impression|thought|idea|feeling)\s+(?:is|was|tells\s+me)/gi, type: 'anchoring_bias', confidence: 0.80 }
    ];
    
    // Apply enhanced pattern matching
    enhancedPatterns.forEach(({ pattern, type, confidence }) => {
      if (pattern.test(text)) {
        detectedBiases.push(type);
        maxConfidence = Math.max(maxConfidence, confidence);
        if (maxSeverity === 'none') maxSeverity = 'medium';
      }
    });
    
    // Context analysis to reduce false positives
    const positiveContexts = [
      /all\s+people\s+(?:should|can|have|deserve|need|are|will|must)/gi,
      /everyone\s+(?:should|can|has|deserves|needs|is|will|must)/gi,
      /treat\s+everyone\s+(?:equally|fairly|with\s+respect)/gi,
      /equal\s+(?:rights|opportunity|treatment|access)/gi,
      /inclusive\s+(?:environment|culture|practices|language)/gi,
      /diversity\s+and\s+inclusion/gi,
      /respect\s+all\s+people/gi
    ];
    
    const hasPositiveContext = positiveContexts.some(pattern => pattern.test(text));
    
    // If positive context detected, reduce bias detection
    if (hasPositiveContext && detectedBiases.length > 0) {
      // Only keep high-confidence biases in positive contexts
      detectedBiases.splice(0, detectedBiases.length);
      maxConfidence = 0;
      maxSeverity = 'none';
    }
    
    // Generate suggestions based on detected biases
    const suggestions = this.generateSuggestions(detectedBiases);
    
    return {
      hasBias: detectedBiases.length > 0,
      biasTypes: [...new Set(detectedBiases)],
      confidence: maxConfidence,
      severity: maxSeverity,
      suggestions
    };
  }
  
  private generateSuggestions(biasTypes: string[]): string[] {
    const suggestionMap: { [key: string]: string[] } = {
      'gender_stereotyping': [
        "Avoid making assumptions about people based on gender",
        "Focus on individual capabilities rather than gender stereotypes",
        "Use inclusive language that doesn't generalize by gender"
      ],
      'age_bias': [
        "Don't make assumptions based on age",
        "Focus on individual skills and experience",
        "Avoid generational stereotypes"
      ],
      'educational_bias': [
        "Don't assume superiority based on educational background",
        "Focus on individual skills and contributions",
        "Value diverse educational experiences"
      ],
      'groupthink': [
        "Encourage diverse perspectives and dissenting opinions",
        "Don't assume consensus without discussion",
        "Welcome constructive disagreement"
      ],
      'toxic_language': [
        "Use constructive and respectful language",
        "Focus on the issue, not personal attacks",
        "Choose words that promote positive dialogue"
      ],
      'stereotyping': [
        "Avoid generalizations about groups of people",
        "Focus on individual characteristics and behaviors",
        "Recognize diversity within groups"
      ]
    };
    
    const suggestions: string[] = [];
    biasTypes.forEach(type => {
      if (suggestionMap[type]) {
        suggestions.push(...suggestionMap[type]);
      }
    });
    
    return [...new Set(suggestions)];
  }
  
  // Get training statistics
  public getTrainingStats() {
    const totalExamples = this.trainingData.length;
    const biasedExamples = this.trainingData.filter(ex => ex.biasType !== 'none').length;
    const positiveExamples = this.trainingData.filter(ex => ex.biasType === 'none').length;
    
    const biasTypeCounts: { [key: string]: number } = {};
    this.trainingData.forEach(ex => {
      if (ex.biasType !== 'none') {
        biasTypeCounts[ex.biasType] = (biasTypeCounts[ex.biasType] || 0) + 1;
      }
    });
    
    return {
      totalExamples,
      biasedExamples,
      positiveExamples,
      biasTypeCounts,
      coverage: Object.keys(biasTypeCounts).length
    };
  }
}

// Export the enhanced detector instance
export const enhancedBiasDetector = new EnhancedBiasDetector();
