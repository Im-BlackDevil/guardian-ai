// AI-Powered Bias Detection using OpenAI GPT-4
// This provides ChatGPT-level accuracy for bias detection

interface BiasDetectionResult {
  hasBias: boolean;
  biasTypes: string[];
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  explanation: string;
  suggestions: string[];
}

class AIBiasDetector {
  private apiKey: string | null = null;
  private baseURL = 'https://api.openai.com/v1/chat/completions';

  constructor() {
    // In production, store API key in environment variables
    this.apiKey = process.env.OPENAI_API_KEY || null;
  }

  async detectBias(text: string): Promise<BiasDetectionResult> {
    if (!this.apiKey) {
      console.warn('OpenAI API key not configured, using fallback detection');
      return this.fallbackDetection(text);
    }

    try {
      const prompt = this.createBiasDetectionPrompt(text);
      
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an expert bias detection system. Analyze text for cognitive biases (confirmation, anchoring, groupthink) and social biases (gender, cultural, age, educational). 

IMPORTANT: Only flag clear, unambiguous bias. Neutral statements should not be flagged as biased.

Respond ONLY in this JSON format:
{
  "hasBias": boolean,
  "biasTypes": ["type1", "type2"],
  "confidence": 0.0-1.0,
  "severity": "low|medium|high",
  "explanation": "brief explanation",
  "suggestions": ["suggestion1", "suggestion2"]
}`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.1,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const result = JSON.parse(data.choices[0].message.content);
      
      return result;
    } catch (error) {
      console.error('AI bias detection failed:', error);
      return this.fallbackDetection(text);
    }
  }

  private createBiasDetectionPrompt(text: string): string {
    return `Analyze this text for bias:

"${text}"

Consider these bias types:
- Cognitive: confirmation bias, anchoring bias, groupthink
- Social: gender bias, cultural bias, age bias, educational bias
- Workplace: hierarchy bias, department bias, experience bias
- Communication: toxic tone, dismissive language, aggressive tone

Remember: Only flag clear bias. Neutral mentions of gender, age, institutions, etc. are NOT bias.

Examples of NOT bias:
- "Students from MIT are joining our team" (neutral mention)
- "The male candidate has good skills" (neutral description)
- "Older employees have experience" (neutral observation)

Examples of bias:
- "All women are too emotional for leadership" (gender stereotyping)
- "Everyone agrees, so it must be right" (groupthink)
- "IIT graduates are always better" (educational bias)`;
  }

  private fallbackDetection(text: string): BiasDetectionResult {
    // Improved fallback with context awareness
    const lowerText = text.toLowerCase();
    const biasPatterns = {
      'gender_stereotyping': [
        /all (women|men|girls|boys) are/i,
        /(women|men) can't/i,
        /(females|males) are (always|never)/i
      ],
      'educational_bias': [
        /(iit|mit|harvard|oxford) (graduates|students) are (always|better|superior)/i,
        /from (iit|mit|harvard) so (he|she) (must|will) be/i
      ],
      'groupthink': [
        /everyone agrees/i,
        /nobody disagrees/i,
        /unanimous decision/i,
        /we all think/i
      ],
      'confirmation_bias': [
        /proves my point exactly/i,
        /i knew it all along/i,
        /confirms what i thought/i
      ],
      'toxic_language': [
        /absolutely (stupid|terrible|awful)/i,
        /(hate|disgusting|worthless)/i
      ]
    };

    const detectedBiases: string[] = [];
    let maxConfidence = 0;

    for (const [biasType, patterns] of Object.entries(biasPatterns)) {
      for (const pattern of patterns) {
        if (pattern.test(text)) {
          detectedBiases.push(biasType);
          maxConfidence = Math.max(maxConfidence, 0.8);
          break;
        }
      }
    }

    // Additional context checks to reduce false positives
    const neutralContexts = [
      /discussing|mentioning|referring to/i,
      /according to|based on|research shows/i,
      /statistics show|data indicates/i
    ];

    const isNeutralContext = neutralContexts.some(pattern => pattern.test(text));
    
    if (isNeutralContext && detectedBiases.length > 0) {
      // Reduce confidence for neutral contexts
      maxConfidence *= 0.3;
    }

    const hasBias = detectedBiases.length > 0 && maxConfidence > 0.5;

    return {
      hasBias,
      biasTypes: detectedBiases,
      confidence: maxConfidence,
      severity: maxConfidence > 0.8 ? 'high' : maxConfidence > 0.5 ? 'medium' : 'low',
      explanation: hasBias 
        ? `Detected ${detectedBiases.join(', ')} bias patterns`
        : 'No clear bias patterns detected',
      suggestions: hasBias 
        ? ['Review language for inclusivity', 'Consider alternative phrasing']
        : ['Message appears bias-free']
    };
  }
}

export const aiBiasDetector = new AIBiasDetector();
