import { detectBiasRules } from './biasRules';
import { detectBiasML } from './mlBias';
import { BiasAnalysisResult } from './fileProcessor';

export class BiasAnalyzer {
  static async analyzeText(text: string): Promise<BiasAnalysisResult> {
    try {
      // Use existing bias detection functions
      const rules = detectBiasRules(text);
      const ml = await detectBiasML(text);
      
      // Combine and analyze results
      const allBiases = [...new Set([...rules, ...ml])];
      
      // Create detailed bias analysis
      const biases = this.createDetailedBiases(allBiases, text);
      
      // Generate counts
      const counts = this.generateCounts(biases);
      
      // Generate suggestions
      const suggestions = this.generateSuggestions(biases);
      
      // Generate improved text
      const improvedText = this.generateImprovedText(text, biases);
      
      // Generate insights
      const insights = this.generateInsights(biases, text);
      
      return {
        biases,
        counts,
        suggestions,
        improvedText,
        insights
      };
    } catch (error) {
      console.error('Error analyzing text for bias:', error);
      throw new Error('Failed to analyze text for bias');
    }
  }
  
  private static createDetailedBiases(biasTypes: string[], text: string): BiasAnalysisResult['biases'] {
    const biasDetails: Record<string, {
      description: string;
      examples: string[];
      suggestions: string[];
    }> = {
      'gender_bias': {
        description: 'Language that stereotypes or discriminates based on gender',
        examples: ['all men are', 'women are emotional', 'male-dominated field'],
        suggestions: ['Use gender-neutral language', 'Focus on individual capabilities', 'Avoid gender stereotypes']
      },
      'gender_stereotyping': {
        description: 'Language that stereotypes or discriminates based on gender',
        examples: ['all men are', 'women are emotional', 'male-dominated field'],
        suggestions: ['Use gender-neutral language', 'Focus on individual capabilities', 'Avoid gender stereotypes']
      },
      'racial_bias': {
        description: 'Language that stereotypes or discriminates based on race or ethnicity',
        examples: ['people from that background', 'typical of their culture', 'ethnic group tendencies'],
        suggestions: ['Focus on individual characteristics', 'Avoid cultural generalizations', 'Use inclusive language']
      },
      'age_bias': {
        description: 'Language that stereotypes or discriminates based on age',
        examples: ['young people are tech-savvy', 'older workers can\'t adapt', 'millennial mindset'],
        suggestions: ['Focus on experience and skills', 'Avoid age-based assumptions', 'Use inclusive age language']
      },
      'confirmation_bias': {
        description: 'Language that reinforces existing beliefs without considering alternatives',
        examples: ['proves my point', 'as expected', 'this confirms what I thought'],
        suggestions: ['Consider multiple perspectives', 'Present balanced viewpoints', 'Acknowledge alternative opinions']
      },
      'confirmation': {
        description: 'Language that reinforces existing beliefs without considering alternatives',
        examples: ['proves my point', 'as expected', 'this confirms what I thought'],
        suggestions: ['Consider multiple perspectives', 'Present balanced viewpoints', 'Acknowledge alternative opinions']
      },
      'anchoring_bias': {
        description: 'Language that relies too heavily on first impressions or initial information',
        examples: ['my first impression', 'initial assessment', 'first glance suggests'],
        suggestions: ['Consider multiple data points', 'Re-evaluate initial judgments', 'Look for additional evidence']
      },
      'anchoring': {
        description: 'Language that relies too heavily on first impressions or initial information',
        examples: ['my first impression', 'initial assessment', 'first glance suggests'],
        suggestions: ['Consider multiple data points', 'Re-evaluate initial judgments', 'Look for additional evidence']
      },
      'groupthink': {
        description: 'Language that assumes consensus without considering diverse opinions',
        examples: ['everyone agrees', 'we all think', 'nobody disagrees'],
        suggestions: ['Encourage diverse perspectives', 'Question assumptions', 'Welcome different viewpoints']
      },
      'stereotyping': {
        description: 'Language that applies broad generalizations to groups of people',
        examples: ['all students are', 'typical behavior of', 'people like that'],
        suggestions: ['Focus on individuals', 'Avoid group generalizations', 'Use specific examples']
      },
      'toxic': {
        description: 'Language that is harmful, offensive, or creates a hostile environment',
        examples: ['stupid', 'terrible', 'awful', 'hate'],
        suggestions: ['Use constructive language', 'Focus on solutions', 'Maintain professional tone']
      },
      'toxic_language': {
        description: 'Language that is harmful, offensive, or creates a hostile environment',
        examples: ['stupid', 'terrible', 'awful', 'hate'],
        suggestions: ['Use constructive language', 'Focus on solutions', 'Maintain professional tone']
      },
      'cultural_bias': {
        description: 'Language that assumes one cultural perspective is universal',
        examples: ['normal way of doing things', 'standard approach', 'common sense'],
        suggestions: ['Acknowledge cultural diversity', 'Consider multiple perspectives', 'Avoid cultural assumptions']
      },
      'educational_bias': {
        description: 'Language that discriminates based on educational background',
        examples: ['from prestigious universities', 'better educated people', 'academic background'],
        suggestions: ['Focus on skills and experience', 'Avoid educational assumptions', 'Value diverse backgrounds']
      },
      'generalization': {
        description: 'Language that makes broad generalizations without evidence',
        examples: ['always', 'never', 'everyone', 'nobody'],
        suggestions: ['Use specific examples', 'Avoid absolute statements', 'Provide evidence for claims']
      }
    };
    
    return biasTypes.map(type => {
      const details = biasDetails[type] || {
        description: 'Language pattern that may contain bias',
        examples: ['Pattern detected in text'],
        suggestions: ['Review and revise for inclusivity']
      };
      
      // Determine severity based on context
      const severity = this.determineSeverity(type, text);
      
      return {
        type,
        severity,
        ...details
      };
    });
  }
  
  private static determineSeverity(biasType: string, text: string): 'low' | 'medium' | 'high' {
    const lowerText = text.toLowerCase();
    
    // High severity indicators
    if (biasType === 'toxic' || biasType === 'toxic_language') {
      if (lowerText.includes('hate') || lowerText.includes('kill') || lowerText.includes('stupid')) {
        return 'high';
      }
    }
    
    if (biasType === 'gender_bias' || biasType === 'gender_stereotyping') {
      if (lowerText.includes('all men') || lowerText.includes('all women')) {
        return 'high';
      }
    }
    
    if (biasType === 'racial_bias' || biasType === 'cultural_bias') {
      if (lowerText.includes('race') || lowerText.includes('ethnic')) {
        return 'high';
      }
    }
    
    // Medium severity indicators
    if (biasType === 'stereotyping' || biasType === 'groupthink' || biasType === 'generalization') {
      return 'medium';
    }
    
    // Low severity indicators
    if (biasType === 'confirmation_bias' || biasType === 'confirmation' || 
        biasType === 'anchoring_bias' || biasType === 'anchoring') {
      return 'low';
    }
    
    return 'medium';
  }
  
  private static generateCounts(biases: BiasAnalysisResult['biases']) {
    const byType: Record<string, number> = {};
    const bySeverity: Record<string, number> = {
      low: 0,
      medium: 0,
      high: 0
    };
    
    biases.forEach(bias => {
      byType[bias.type] = (byType[bias.type] || 0) + 1;
      bySeverity[bias.severity]++;
    });
    
    return {
      total: biases.length,
      byType,
      bySeverity
    };
  }
  
  private static generateSuggestions(biases: BiasAnalysisResult['biases']): string[] {
    const suggestions: string[] = [];
    
    if (biases.some(b => b.type === 'gender_bias' || b.type === 'gender_stereotyping')) {
      suggestions.push('Use gender-neutral pronouns and language');
    }
    
    if (biases.some(b => b.type === 'stereotyping' || b.type === 'generalization')) {
      suggestions.push('Focus on individual characteristics rather than group generalizations');
    }
    
    if (biases.some(b => b.type === 'toxic' || b.type === 'toxic_language')) {
      suggestions.push('Replace negative language with constructive alternatives');
    }
    
    if (biases.some(b => b.type === 'confirmation_bias' || b.type === 'confirmation')) {
      suggestions.push('Present balanced viewpoints and consider alternative perspectives');
    }
    
    if (biases.some(b => b.type === 'groupthink')) {
      suggestions.push('Encourage diverse opinions and question assumptions');
    }
    
    if (biases.length === 0) {
      suggestions.push('Your text appears to be bias-free!');
    }
    
    return suggestions;
  }
  
  private static generateImprovedText(originalText: string, biases: BiasAnalysisResult['biases']): string {
    let improvedText = originalText;
    
    // Apply improvements based on detected biases
    biases.forEach(bias => {
      switch (bias.type) {
        case 'gender_bias':
        case 'gender_stereotyping':
          improvedText = improvedText
            .replace(/all men are/gi, 'some people are')
            .replace(/all women are/gi, 'some people are')
            .replace(/males are/gi, 'some people are')
            .replace(/females are/gi, 'some people are');
          break;
          
        case 'stereotyping':
        case 'generalization':
          improvedText = improvedText
            .replace(/all \w+ are/gi, 'some people are')
            .replace(/every \w+ is/gi, 'some people are')
            .replace(/typical of/gi, 'some examples of');
          break;
          
        case 'toxic':
        case 'toxic_language':
          improvedText = improvedText
            .replace(/stupid/gi, 'challenging')
            .replace(/terrible/gi, 'difficult')
            .replace(/awful/gi, 'problematic')
            .replace(/hate/gi, 'dislike');
          break;
          
        case 'groupthink':
          improvedText = improvedText
            .replace(/everyone agrees/gi, 'many people agree')
            .replace(/we all think/gi, 'we generally think')
            .replace(/nobody disagrees/gi, 'most people agree');
          break;
          
        case 'confirmation_bias':
        case 'confirmation':
          improvedText = improvedText
            .replace(/proves my point/gi, 'supports this view')
            .replace(/as expected/gi, 'as anticipated')
            .replace(/confirms what I thought/gi, 'aligns with this perspective');
          break;
      }
    });
    
    return improvedText;
  }
  
  private static generateInsights(biases: BiasAnalysisResult['biases'], text: string): string[] {
    const insights: string[] = [];
    
    if (biases.length === 0) {
      insights.push('Your document demonstrates excellent inclusive language practices.');
      insights.push('No significant bias patterns were detected in the text.');
      return insights;
    }
    
    const highSeverityCount = biases.filter(b => b.severity === 'high').length;
    const mediumSeverityCount = biases.filter(b => b.severity === 'medium').length;
    
    if (highSeverityCount > 0) {
      insights.push(`High-severity biases detected: ${highSeverityCount} instances that should be addressed immediately.`);
    }
    
    if (mediumSeverityCount > 0) {
      insights.push(`Medium-severity biases detected: ${mediumSeverityCount} instances that could be improved.`);
    }
    
    const mostCommonType = Object.entries(
      biases.reduce((acc, bias) => {
        acc[bias.type] = (acc[bias.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).sort(([,a], [,b]) => b - a)[0];
    
    if (mostCommonType) {
      insights.push(`Most common bias type: ${mostCommonType[0]} (${mostCommonType[1]} instances)`);
    }
    
    insights.push('Consider reviewing and revising the identified bias patterns for more inclusive communication.');
    
    return insights;
  }
}
