// Guardian AI - Advanced AI Action Validation and Safety System
// This module provides comprehensive validation for AI actions before execution
// 🚨 DANGEROUS ACTION PATTERNS
const dangerousActionPatterns = {
    // Database Operations
    database: {
        patterns: [
            /delete\s+all/i,
            /drop\s+database/i,
            /truncate\s+table/i,
            /wipe\s+data/i,
            /clear\s+all/i,
            /remove\s+everything/i,
            /purge\s+all/i
        ],
        risk: 'critical',
        reason: 'Database destruction detected'
    },
    // File System Operations
    filesystem: {
        patterns: [
            /delete\s+all\s+files/i,
            /rm\s+-rf/i,
            /format\s+drive/i,
            /wipe\s+disk/i,
            /erase\s+everything/i,
            /clear\s+storage/i
        ],
        risk: 'critical',
        reason: 'File system destruction detected'
    },
    // Financial Operations
    financial: {
        patterns: [
            /transfer\s+all\s+money/i,
            /withdraw\s+everything/i,
            /send\s+all\s+funds/i,
            /drain\s+account/i,
            /empty\s+wallet/i,
            /max\s+withdrawal/i
        ],
        risk: 'high',
        reason: 'Financial risk detected'
    },
    // User Account Operations
    userAccounts: {
        patterns: [
            /delete\s+all\s+users/i,
            /ban\s+everyone/i,
            /suspend\s+all/i,
            /remove\s+all\s+accounts/i,
            /deactivate\s+everyone/i
        ],
        risk: 'high',
        reason: 'Mass user account modification detected'
    },
    // System Operations
    system: {
        patterns: [
            /shutdown\s+system/i,
            /restart\s+everything/i,
            /kill\s+all\s+processes/i,
            /stop\s+all\s+services/i,
            /disable\s+all\s+features/i
        ],
        risk: 'high',
        reason: 'System disruption detected'
    },
    // Email Operations
    email: {
        patterns: [
            /delete\s+all\s+emails/i,
            /clear\s+mailbox/i,
            /remove\s+all\s+messages/i,
            /wipe\s+inbox/i,
            /purge\s+emails/i
        ],
        risk: 'medium',
        reason: 'Mass email deletion detected'
    }
};
// 🧠 BIAS DETECTION PATTERNS
const biasPatterns = {
    gender: {
        patterns: [
            /all\s+(?:men|women|males|females)\s+(?:are|can't|won't|don't|is|was)/gi,
            /(?:men|women)\s+(?:always|never|too|very)\s+\w+/gi
        ],
        risk: 'medium',
        reason: 'Gender stereotyping detected'
    },
    racial: {
        patterns: [
            /all\s+(?:black|white|asian|hispanic|african|european)\s+people\s+(?:are|can't)/gi,
            /(?:race|ethnic|cultural)\s+(?:background|group|tendencies)/gi
        ],
        risk: 'medium',
        reason: 'Racial bias detected'
    },
    age: {
        patterns: [
            /(?:older|younger|elderly|senior)\s+people\s+can't/gi,
            /(?:millennials|boomers|gen\s*z)\s+(?:are|can't|always)/gi
        ],
        risk: 'medium',
        reason: 'Age discrimination detected'
    },
    educational: {
        patterns: [
            /(?:iit|mit|harvard|oxford|stanford|yale)\s+(?:graduates?|students?)\s+(?:are\s+)?(?:always|naturally|inherently)\s+(?:better|superior|smarter)/gi,
            /from\s+(?:iit|mit|harvard)\s+so\s+(?:he|she|they)\s+(?:must|will)\s+be/gi
        ],
        risk: 'medium',
        reason: 'Educational bias detected'
    }
};
// 🚫 TOXIC LANGUAGE PATTERNS
const toxicPatterns = {
    explicit: {
        patterns: [
            /(?:absolutely|completely|totally)\s+(?:stupid|idiotic|terrible|awful|ridiculous|nonsense)/gi,
            /(?:hate|despise|loathe|detest)\s+(?:this|that|it|these|those)/gi,
            /(?:disgusting|sickening|nauseating|revolting)/gi
        ],
        risk: 'medium',
        reason: 'Toxic language detected'
    },
    violent: {
        patterns: [
            /(?:kill|destroy|eliminate|annihilate)\s+(?:all|everyone|everything)/gi,
            /(?:attack|assault|harm|hurt)\s+(?:people|users|accounts)/gi
        ],
        risk: 'high',
        reason: 'Violent language detected'
    }
};
// 🎯 GUARDIAN AI CORE LOGIC
export class GuardianAI {
    /**
     * Main method to validate an AI action
     */
    validateAction(action) {
        const lowerAction = action.action.toLowerCase();
        const lowerContext = action.context.toLowerCase();
        // Initialize result
        let result = {
            safe: true,
            status: 'approved',
            reason: 'Action appears safe',
            confidence: 1.0,
            riskLevel: 'low',
            suggestions: [],
            metadata: {
                detectedThreats: [],
                biasScore: 0,
                toxicityScore: 0,
                actionCategory: 'general'
            }
        };
        // 🚨 Check for dangerous actions
        const dangerousCheck = this.checkDangerousActions(lowerAction, lowerContext);
        if (dangerousCheck.detected) {
            result.safe = false;
            result.status = 'blocked';
            result.reason = dangerousCheck.reason;
            result.riskLevel = dangerousCheck.risk;
            result.confidence = 0.95;
            result.metadata.detectedThreats.push(dangerousCheck.type);
            result.suggestions.push('This action could cause irreversible damage. Please review and reconsider.');
            return result;
        }
        // 🧠 Check for bias in context
        const biasCheck = this.checkBias(lowerContext);
        if (biasCheck.detected) {
            result.metadata.biasScore = biasCheck.score;
            if (biasCheck.score > 0.7) {
                result.status = 'warn';
                result.reason = `Bias detected: ${biasCheck.reason}`;
                result.riskLevel = 'medium';
                result.suggestions.push('Consider using more inclusive and objective language');
            }
        }
        // 🚫 Check for toxic language
        const toxicityCheck = this.checkToxicity(lowerAction, lowerContext);
        if (toxicityCheck.detected) {
            result.metadata.toxicityScore = toxicityCheck.score;
            if (toxicityCheck.score > 0.8) {
                result.status = 'warn';
                result.reason = `Toxic language detected: ${toxicityCheck.reason}`;
                result.riskLevel = 'medium';
                result.suggestions.push('Use constructive and respectful language');
            }
        }
        // 🎯 Determine action category
        result.metadata.actionCategory = this.categorizeAction(lowerAction);
        // 📊 Calculate final confidence
        result.confidence = this.calculateConfidence(result);
        return result;
    }
    /**
     * Check for dangerous/destructive actions
     */
    checkDangerousActions(action, context) {
        for (const [category, config] of Object.entries(dangerousActionPatterns)) {
            for (const pattern of config.patterns) {
                if (pattern.test(action) || pattern.test(context)) {
                    return {
                        detected: true,
                        type: category,
                        reason: config.reason,
                        risk: config.risk
                    };
                }
            }
        }
        return { detected: false, type: '', reason: '', risk: '' };
    }
    /**
     * Check for bias in text
     */
    checkBias(text) {
        let totalScore = 0;
        let detectedBiases = [];
        for (const [category, config] of Object.entries(biasPatterns)) {
            for (const pattern of config.patterns) {
                if (pattern.test(text)) {
                    totalScore += 0.3;
                    detectedBiases.push(config.reason);
                }
            }
        }
        return {
            detected: totalScore > 0,
            score: Math.min(1.0, totalScore),
            reason: detectedBiases.join(', ') || 'No bias detected'
        };
    }
    /**
     * Check for toxic language
     */
    checkToxicity(action, context) {
        let totalScore = 0;
        let detectedToxicity = [];
        for (const [category, config] of Object.entries(toxicPatterns)) {
            for (const pattern of config.patterns) {
                if (pattern.test(action) || pattern.test(context)) {
                    totalScore += 0.4;
                    detectedToxicity.push(config.reason);
                }
            }
        }
        return {
            detected: totalScore > 0,
            score: Math.min(1.0, totalScore),
            reason: detectedToxicity.join(', ') || 'No toxicity detected'
        };
    }
    /**
     * Categorize the action type
     */
    categorizeAction(action) {
        if (action.includes('delete') || action.includes('remove'))
            return 'deletion';
        if (action.includes('create') || action.includes('add'))
            return 'creation';
        if (action.includes('update') || action.includes('modify'))
            return 'modification';
        if (action.includes('read') || action.includes('get'))
            return 'read';
        if (action.includes('send') || action.includes('email'))
            return 'communication';
        if (action.includes('transfer') || action.includes('money'))
            return 'financial';
        return 'general';
    }
    /**
     * Calculate confidence score
     */
    calculateConfidence(result) {
        let confidence = 1.0;
        // Reduce confidence based on detected issues
        if (result.metadata.biasScore > 0.5)
            confidence -= 0.2;
        if (result.metadata.toxicityScore > 0.5)
            confidence -= 0.2;
        if (result.status === 'warn')
            confidence -= 0.1;
        return Math.max(0.1, confidence);
    }
    /**
     * Generate safety recommendations
     */
    generateRecommendations(result) {
        const recommendations = [];
        if (result.status === 'blocked') {
            recommendations.push('This action has been blocked for safety reasons');
            recommendations.push('Please review the action and consider alternatives');
            recommendations.push('Contact system administrator if this is a legitimate action');
        }
        if (result.status === 'warn') {
            recommendations.push('Proceed with caution');
            recommendations.push('Review the action before execution');
            recommendations.push('Consider the potential impact on users and data');
        }
        if (result.metadata.biasScore > 0.5) {
            recommendations.push('Use inclusive and objective language');
            recommendations.push('Avoid generalizations about groups of people');
            recommendations.push('Focus on individual characteristics and behaviors');
        }
        if (result.metadata.toxicityScore > 0.5) {
            recommendations.push('Use constructive and respectful language');
            recommendations.push('Focus on the issue, not personal attacks');
            recommendations.push('Choose words that promote positive dialogue');
        }
        return recommendations;
    }
}
// Export singleton instance
export const guardianAI = new GuardianAI();
//# sourceMappingURL=guardian.js.map