// Guardian AI API Routes (JavaScript version)
// Handles action validation and logging for the Guardian AI system

import express from 'express';

const router = express.Router();

// In-memory storage for logs (in production, use MongoDB)
let guardianLogs = [];

// Guardian AI logic (simplified version)
class GuardianAI {
  validateAction(action, context) {
    const lowerAction = action.toLowerCase();
    const lowerContext = context.toLowerCase();
    
    // Check for dangerous actions
    const dangerousPatterns = [
      /delete\s+all/i,
      /drop\s+database/i,
      /wipe\s+data/i,
      /transfer\s+all\s+money/i,
      /delete\s+all\s+users/i,
      /shutdown\s+system/i
    ];
    
    for (const pattern of dangerousPatterns) {
      if (pattern.test(lowerAction) || pattern.test(lowerContext)) {
        return {
          safe: false,
          status: 'blocked',
          reason: 'Dangerous action detected',
          confidence: 0.95,
          riskLevel: 'critical',
          suggestions: ['This action could cause irreversible damage. Please review and reconsider.'],
          metadata: {
            detectedThreats: ['dangerous_action'],
            biasScore: 0,
            toxicityScore: 0,
            actionCategory: 'destructive'
          }
        };
      }
    }
    
    // Check for bias patterns
    const biasPatterns = [
      /all\s+(?:men|women|males|females)\s+(?:are|can't)/gi,
      /(?:older|younger)\s+people\s+can't/gi,
      /(?:iit|harvard|mit)\s+(?:graduates?|students?)\s+(?:are\s+)?(?:always|naturally)\s+(?:better|superior)/gi
    ];
    
    let biasScore = 0;
    for (const pattern of biasPatterns) {
      if (pattern.test(lowerContext)) {
        biasScore += 0.3;
      }
    }
    
    // Check for toxic language
    const toxicPatterns = [
      /(?:absolutely|completely)\s+(?:stupid|idiotic|terrible|awful)/gi,
      /(?:hate|despise)\s+(?:this|that|it)/gi
    ];
    
    let toxicityScore = 0;
    for (const pattern of toxicPatterns) {
      if (pattern.test(lowerAction) || pattern.test(lowerContext)) {
        toxicityScore += 0.4;
      }
    }
    
    // Determine status
    let status = 'approved';
    let riskLevel = 'low';
    
    if (biasScore > 0.7 || toxicityScore > 0.8) {
      status = 'warn';
      riskLevel = 'medium';
    }
    
    return {
      safe: true,
      status,
      reason: status === 'approved' ? 'Action appears safe' : 'Potential issues detected',
      confidence: Math.max(0.1, 1.0 - (biasScore + toxicityScore) * 0.3),
      riskLevel,
      suggestions: biasScore > 0.5 ? ['Consider using more inclusive language'] : [],
      metadata: {
        detectedThreats: [],
        biasScore: Math.min(1.0, biasScore),
        toxicityScore: Math.min(1.0, toxicityScore),
        actionCategory: this.categorizeAction(lowerAction)
      }
    };
  }
  
  categorizeAction(action) {
    if (action.includes('delete') || action.includes('remove')) return 'deletion';
    if (action.includes('create') || action.includes('add')) return 'creation';
    if (action.includes('update') || action.includes('modify')) return 'modification';
    if (action.includes('read') || action.includes('get')) return 'read';
    if (action.includes('send') || action.includes('email')) return 'communication';
    if (action.includes('transfer') || action.includes('money')) return 'financial';
    return 'general';
  }
}

const guardianAI = new GuardianAI();

/**
 * POST /guardian/check-action
 * Validates an AI action using Guardian AI logic
 */
router.post('/check-action', async (req, res) => {
  try {
    const { action, context, userId, sessionId } = req.body;
    
    // Validate required fields
    if (!action || !context) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Both action and context are required'
      });
    }
    
    // Validate action using Guardian AI
    const result = guardianAI.validateAction(action, context);
    
    // Create log entry
    const logEntry = {
      timestamp: new Date(),
      action: action.toString(),
      context: context.toString(),
      status: result.status,
      reason: result.reason,
      userId: userId || undefined,
      sessionId: sessionId || undefined,
      metadata: {
        safe: result.safe,
        confidence: result.confidence,
        riskLevel: result.riskLevel,
        suggestions: result.suggestions,
        biasScore: result.metadata.biasScore,
        toxicityScore: result.metadata.toxicityScore,
        actionCategory: result.metadata.actionCategory,
        detectedThreats: result.metadata.detectedThreats
      }
    };
    
    // Store log
    guardianLogs.push(logEntry);
    
    // Return validation result
    res.json({
      success: true,
      data: {
        status: result.status,
        safe: result.safe,
        reason: result.reason,
        confidence: result.confidence,
        riskLevel: result.riskLevel,
        suggestions: result.suggestions,
        metadata: {
          biasScore: result.metadata.biasScore,
          toxicityScore: result.metadata.toxicityScore,
          actionCategory: result.metadata.actionCategory,
          detectedThreats: result.metadata.detectedThreats
        }
      },
      timestamp: logEntry.timestamp,
      logId: logEntry.timestamp.getTime().toString()
    });
    
  } catch (error) {
    console.error('Guardian AI validation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to validate action'
    });
  }
});

/**
 * POST /guardian/logs
 * Saves Guardian results to storage
 */
router.post('/logs', async (req, res) => {
  try {
    const { action, context, status, reason, userId, sessionId, metadata } = req.body;
    
    // Validate required fields
    if (!action || !context || !status || !reason) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'action, context, status, and reason are required'
      });
    }
    
    // Create log entry
    const logEntry = {
      timestamp: new Date(),
      action: action.toString(),
      context: context.toString(),
      status: status.toString(),
      reason: reason.toString(),
      userId: userId || undefined,
      sessionId: sessionId || undefined,
      metadata: metadata || {}
    };
    
    // Store log
    guardianLogs.push(logEntry);
    
    res.json({
      success: true,
      message: 'Log entry saved successfully',
      data: {
        logId: logEntry.timestamp.getTime().toString(),
        timestamp: logEntry.timestamp
      }
    });
    
  } catch (error) {
    console.error('Guardian AI logging error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to save log entry'
    });
  }
});

/**
 * GET /guardian/logs
 * Returns all Guardian logs with optional filtering
 */
router.get('/logs', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 50, 
      status, 
      userId, 
      sessionId,
      startDate,
      endDate,
      actionCategory
    } = req.query;
    
    let filteredLogs = [...guardianLogs];
    
    // Filter by status
    if (status) {
      filteredLogs = filteredLogs.filter(log => log.status === status);
    }
    
    // Filter by user ID
    if (userId) {
      filteredLogs = filteredLogs.filter(log => log.userId === userId);
    }
    
    // Filter by session ID
    if (sessionId) {
      filteredLogs = filteredLogs.filter(log => log.sessionId === sessionId);
    }
    
    // Filter by date range
    if (startDate) {
      const start = new Date(startDate);
      filteredLogs = filteredLogs.filter(log => log.timestamp >= start);
    }
    
    if (endDate) {
      const end = new Date(endDate);
      filteredLogs = filteredLogs.filter(log => log.timestamp <= end);
    }
    
    // Filter by action category
    if (actionCategory) {
      filteredLogs = filteredLogs.filter(log => 
        log.metadata?.actionCategory === actionCategory
      );
    }
    
    // Sort by timestamp (newest first)
    filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedLogs = filteredLogs.slice(startIndex, endIndex);
    
    // Calculate pagination info
    const totalLogs = filteredLogs.length;
    const totalPages = Math.ceil(totalLogs / limitNum);
    
    res.json({
      success: true,
      data: {
        logs: paginatedLogs,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalLogs,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1
        },
        filters: {
          status: status || null,
          userId: userId || null,
          sessionId: sessionId || null,
          startDate: startDate || null,
          endDate: endDate || null,
          actionCategory: actionCategory || null
        }
      }
    });
    
  } catch (error) {
    console.error('Guardian AI logs retrieval error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve logs'
    });
  }
});

/**
 * GET /guardian/stats
 * Returns Guardian AI statistics and metrics
 */
router.get('/stats', async (req, res) => {
  try {
    const totalLogs = guardianLogs.length;
    
    // Calculate status distribution
    const statusCounts = guardianLogs.reduce((acc, log) => {
      acc[log.status] = (acc[log.status] || 0) + 1;
      return acc;
    }, {});
    
    // Calculate action category distribution
    const categoryCounts = guardianLogs.reduce((acc, log) => {
      const category = log.metadata?.actionCategory || 'unknown';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    
    // Calculate average bias and toxicity scores
    const biasScores = guardianLogs
      .filter(log => log.metadata?.biasScore !== undefined)
      .map(log => log.metadata.biasScore);
    
    const toxicityScores = guardianLogs
      .filter(log => log.metadata?.toxicityScore !== undefined)
      .map(log => log.metadata.toxicityScore);
    
    const avgBiasScore = biasScores.length > 0 
      ? biasScores.reduce((a, b) => a + b, 0) / biasScores.length 
      : 0;
    
    const avgToxicityScore = toxicityScores.length > 0 
      ? toxicityScores.reduce((a, b) => a + b, 0) / toxicityScores.length 
      : 0;
    
    // Recent activity (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentLogs = guardianLogs.filter(log => log.timestamp >= oneDayAgo);
    
    res.json({
      success: true,
      data: {
        totalLogs,
        statusDistribution: statusCounts,
        actionCategoryDistribution: categoryCounts,
        averageScores: {
          bias: avgBiasScore,
          toxicity: avgToxicityScore
        },
        recentActivity: {
          last24Hours: recentLogs.length,
          lastHour: guardianLogs.filter(log => 
            log.timestamp >= new Date(Date.now() - 60 * 60 * 1000)
          ).length
        },
        systemHealth: {
          uptime: process.uptime(),
          memoryUsage: process.memoryUsage(),
          timestamp: new Date()
        }
      }
    });
    
  } catch (error) {
    console.error('Guardian AI stats error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve statistics'
    });
  }
});

export default router;
