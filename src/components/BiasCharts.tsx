import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BiasAnalysisResult } from '../utils/fileProcessor';

interface BiasChartsProps {
  analysisResult: BiasAnalysisResult;
}

const BiasCharts: React.FC<BiasChartsProps> = ({ analysisResult }) => {
  const { counts, biases } = analysisResult;

  // Prepare data for bias type bar chart
  const biasTypeData = Object.entries(counts.byType).map(([type, count]) => ({
    type: type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    count,
    fill: getBiasTypeColor(type)
  }));

  // Prepare data for severity pie chart
  const severityData = Object.entries(counts.bySeverity).map(([severity, count]) => ({
    name: severity.charAt(0).toUpperCase() + severity.slice(1),
    value: count,
    fill: getSeverityColor(severity)
  }));

  // Prepare data for bias distribution bar chart
  const biasDistributionData = biases.map(bias => ({
    type: bias.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    severity: bias.severity,
    count: 1,
    fill: getBiasTypeColor(bias.type)
  }));

  return (
    <div className="space-y-8">
      {/* Bias Types Bar Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">Bias Types Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={biasTypeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="type" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Legend />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Severity Pie Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">Bias Severity Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={severityData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="hsl(var(--primary))"
              dataKey="value"
            >
              {severityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bias Severity by Type */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">Bias Severity by Type</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={biasDistributionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="type" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Legend />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">{counts.total}</div>
          <div className="text-sm text-muted-foreground">Total Biases</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning">{counts.bySeverity.high}</div>
          <div className="text-sm text-muted-foreground">High Severity</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success">{Object.keys(counts.byType).length}</div>
          <div className="text-sm text-muted-foreground">Bias Types</div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for colors
const getBiasTypeColor = (type: string): string => {
  const colorMap: Record<string, string> = {
    'gender_bias': 'hsl(var(--destructive))',
    'racial_bias': 'hsl(var(--destructive))',
    'age_bias': 'hsl(var(--warning))',
    'confirmation_bias': 'hsl(var(--warning))',
    'anchoring_bias': 'hsl(var(--warning))',
    'groupthink': 'hsl(var(--warning))',
    'stereotyping': 'hsl(var(--destructive))',
    'toxic': 'hsl(var(--destructive))',
    'cultural_bias': 'hsl(var(--warning))',
    'educational_bias': 'hsl(var(--warning))'
  };
  
  return colorMap[type] || 'hsl(var(--primary))';
};

const getSeverityColor = (severity: string): string => {
  const colorMap: Record<string, string> = {
    'low': 'hsl(var(--success))',
    'medium': 'hsl(var(--warning))',
    'high': 'hsl(var(--destructive))'
  };
  
  return colorMap[severity] || 'hsl(var(--primary))';
};

export default BiasCharts;
