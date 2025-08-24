export interface GuardianAction {
    action: string;
    context: string;
    userId?: string;
    sessionId?: string;
    timestamp: Date;
}
export interface GuardianResult {
    safe: boolean;
    status: 'approved' | 'warn' | 'blocked';
    reason: string;
    confidence: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    suggestions: string[];
    metadata: {
        detectedThreats: string[];
        biasScore: number;
        toxicityScore: number;
        actionCategory: string;
    };
}
export interface GuardianLog {
    timestamp: Date;
    action: string;
    context: string;
    status: string;
    reason: string;
    userId?: string;
    sessionId?: string;
    metadata: any;
}
export declare class GuardianAI {
    /**
     * Main method to validate an AI action
     */
    validateAction(action: GuardianAction): GuardianResult;
    /**
     * Check for dangerous/destructive actions
     */
    private checkDangerousActions;
    /**
     * Check for bias in text
     */
    private checkBias;
    /**
     * Check for toxic language
     */
    private checkToxicity;
    /**
     * Categorize the action type
     */
    private categorizeAction;
    /**
     * Calculate confidence score
     */
    private calculateConfidence;
    /**
     * Generate safety recommendations
     */
    generateRecommendations(result: GuardianResult): string[];
}
export declare const guardianAI: GuardianAI;
//# sourceMappingURL=guardian.d.ts.map