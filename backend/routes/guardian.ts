// Guardian AI API Routes
// Handles action validation and logging for the Guardian AI system

import express from 'express';
import { guardianAI, GuardianAction, GuardianResult, GuardianLog } from '../guardian.js';

const router = express.Router();

// In-memory storage for logs (in production, use MongoDB)
let guardianLogs: GuardianLog[] = [];

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
    
    // Create Guardian action object
    const guardianAction: GuardianAction = {
      action: action.toString(),
      context: context.toString(),
      userId: userId || undefined,
      sessionId: sessionId || undefined,
      timestamp: new Date()
    };
    
    // Validate action using Guardian AI
    const result: GuardianResult = guardianAI.validateAction(guardianAction);
    
    // Create log entry
    const logEntry: GuardianLog = {
      timestamp: guardianAction.timestamp,
      action: guardianAction.action,
      context: guardianAction.context,
      status: result.status,
      reason: result.reason,
      userId: guardianAction.userId,
      sessionId: guardianAction.sessionId,
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
      timestamp: guardianAction.timestamp,
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
    const logEntry: GuardianLog = {
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
      const start = new Date(startDate as string);
      filteredLogs = filteredLogs.filter(log => log.timestamp >= start);
    }
    
    if (endDate) {
      const end = new Date(endDate as string);
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
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
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
 * GET /guardian/logs/:id
 * Returns a specific log entry by ID
 */
router.get('/logs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const timestamp = new Date(parseInt(id));
    
    const logEntry = guardianLogs.find(log => 
      log.timestamp.getTime() === timestamp.getTime()
    );
    
    if (!logEntry) {
      return res.status(404).json({
        error: 'Log not found',
        message: 'No log entry found with the specified ID'
      });
    }
    
    res.json({
      success: true,
      data: logEntry
    });
    
  } catch (error) {
    console.error('Guardian AI log retrieval error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve log entry'
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
    }, {} as Record<string, number>);
    
    // Calculate action category distribution
    const categoryCounts = guardianLogs.reduce((acc, log) => {
      const category = log.metadata?.actionCategory || 'unknown';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
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

/**
 * DELETE /guardian/logs
 * Clears all Guardian logs (admin only)
 */
router.delete('/logs', async (req, res) => {
  try {
    // In production, add authentication/authorization here
    const { confirm } = req.query;
    
    if (confirm !== 'true') {
      return res.status(400).json({
        error: 'Confirmation required',
        message: 'Set confirm=true to clear all logs'
      });
    }
    
    const deletedCount = guardianLogs.length;
    guardianLogs = [];
    
    res.json({
      success: true,
      message: 'All Guardian logs cleared successfully',
      data: {
        deletedCount,
        timestamp: new Date()
      }
    });
    
  } catch (error) {
    console.error('Guardian AI logs deletion error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to clear logs'
    });
  }
});

export default router;
