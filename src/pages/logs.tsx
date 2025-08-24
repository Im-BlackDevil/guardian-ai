import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Search, Filter, Download, RefreshCw, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { buildApiUrl, API_CONFIG } from '@/config/api';

interface GuardianLog {
  timestamp: string;
  action: string;
  context: string;
  status: string;
  reason: string;
  userId?: string;
  sessionId?: string;
  metadata: {
    safe: boolean;
    confidence: number;
    riskLevel: string;
    suggestions: string[];
    biasScore: number;
    toxicityScore: number;
    actionCategory: string;
    detectedThreats: string[];
  };
}

interface GuardianLogsResponse {
  success: boolean;
  data: {
    logs: GuardianLog[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalLogs: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
    filters: any;
  };
}

const GuardianLogs = () => {
  const [logs, setLogs] = useState<GuardianLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalLogs: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  
  // Filter states
  const [filters, setFilters] = useState({
    status: '',
    actionCategory: '',
    search: '',
    startDate: '',
    endDate: ''
  });

  // Fetch Guardian logs
  const fetchLogs = async (page = 1, filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '50',
        ...filters
      });
      
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.GUARDIAN.LOGS) + `?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Guardian logs');
      }
      
      const data: GuardianLogsResponse = await response.json();
      setLogs(data.data.logs);
      setPagination(data.data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Load logs on component mount
  useEffect(() => {
    fetchLogs();
  }, []);

  // Apply filters
  const applyFilters = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );
    fetchLogs(1, activeFilters);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      status: '',
      actionCategory: '',
      search: '',
      startDate: '',
      endDate: ''
    });
    fetchLogs();
  };

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'warn':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><AlertTriangle className="w-3 h-3 mr-1" />Warning</Badge>;
      case 'blocked':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="w-3 h-3 mr-1" />Blocked</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Get risk level color
  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'high':
        return 'text-orange-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  // Export logs to CSV
  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'Action', 'Context', 'Status', 'Reason', 'Risk Level', 'Bias Score', 'Toxicity Score', 'Action Category'],
      ...logs.map(log => [
        formatTimestamp(log.timestamp),
        log.action,
        log.context,
        log.status,
        log.reason,
        log.metadata.riskLevel,
        log.metadata.biasScore.toFixed(2),
        log.metadata.toxicityScore.toFixed(2),
        log.metadata.actionCategory
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guardian-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Shield className="h-6 w-6 text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold">Guardian AI Logs</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Monitor and analyze AI actions validated by Guardian AI for safety and bias detection
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Logs</p>
                  <p className="text-2xl font-bold">{pagination.totalLogs}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {logs.filter(log => log.status === 'approved').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {logs.filter(log => log.status === 'warn').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Blocked</p>
                  <p className="text-2xl font-bold text-red-600">
                    {logs.filter(log => log.status === 'blocked').length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="warn">Warning</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Action Category</label>
                  <Select value={filters.actionCategory} onValueChange={(value) => setFilters(prev => ({ ...prev, actionCategory: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      <SelectItem value="deletion">Deletion</SelectItem>
                      <SelectItem value="creation">Creation</SelectItem>
                      <SelectItem value="modification">Modification</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="communication">Communication</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <Input
                    placeholder="Search actions..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Start Date</label>
                  <Input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">End Date</label>
                  <Input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button onClick={applyFilters} className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Apply Filters
                </Button>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
                <Button onClick={exportLogs} variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Logs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Guardian AI Action Logs</CardTitle>
                <Button onClick={() => fetchLogs()} variant="outline" size="sm" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Loading Guardian logs...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-4 text-red-500" />
                  <p className="text-red-600">{error}</p>
                  <Button onClick={() => fetchLogs()} className="mt-4">Try Again</Button>
                </div>
              ) : logs.length === 0 ? (
                <div className="text-center py-8">
                  <Shield className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No Guardian logs found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Timestamp</th>
                        <th className="text-left p-3 font-medium">Action</th>
                        <th className="text-left p-3 font-medium">Context</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Risk Level</th>
                        <th className="text-left p-3 font-medium">Scores</th>
                        <th className="text-left p-3 font-medium">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((log, index) => (
                        <motion.tr
                          key={log.timestamp}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-3 text-sm text-muted-foreground">
                            {formatTimestamp(log.timestamp)}
                          </td>
                          <td className="p-3">
                            <div className="max-w-xs truncate" title={log.action}>
                              {log.action}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="max-w-xs truncate" title={log.context}>
                              {log.context}
                            </div>
                          </td>
                          <td className="p-3">
                            {getStatusBadge(log.status)}
                          </td>
                          <td className="p-3">
                            <span className={`text-sm font-medium ${getRiskLevelColor(log.metadata.riskLevel)}`}>
                              {log.metadata.riskLevel}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="text-xs space-y-1">
                              <div>Bias: {(log.metadata.biasScore * 100).toFixed(0)}%</div>
                              <div>Toxicity: {(log.metadata.toxicityScore * 100).toFixed(0)}%</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline" className="text-xs">
                              {log.metadata.actionCategory}
                            </Badge>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-6"
          >
            <div className="flex gap-2">
              <Button
                onClick={() => fetchLogs(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                variant="outline"
                size="sm"
              >
                Previous
              </Button>
              
              <span className="flex items-center px-4 py-2 text-sm text-muted-foreground">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              
              <Button
                onClick={() => fetchLogs(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                variant="outline"
                size="sm"
              >
                Next
              </Button>
            </div>
          </motion.div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default GuardianLogs;
