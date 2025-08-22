import { motion } from "framer-motion";
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

const AnalyticsDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for charts
  const [biasDistributionData, setBiasDistributionData] = useState([
    { name: "Confirmation Bias", value: 35, color: "hsl(262, 83%, 58%)" },
    { name: "Anchoring Bias", value: 25, color: "hsl(240, 83%, 58%)" },
    { name: "Availability Bias", value: 20, color: "hsl(220, 83%, 58%)" },
    { name: "Framing Effect", value: 15, color: "hsl(200, 83%, 58%)" },
    { name: "Others", value: 5, color: "hsl(180, 83%, 58%)" }
  ]);

  const [timelineData, setTimelineData] = useState([
    { month: "Jan", biases: 24 },
    { month: "Feb", biases: 31 },
    { month: "Mar", biases: 18 },
    { month: "Apr", biases: 42 },
    { month: "May", biases: 28 },
    { month: "Jun", biases: 35 }
  ]);

  const [overallBiasScore, setOverallBiasScore] = useState(73);
  const [biasReduction, setBiasReduction] = useState(27);

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      // Update bias distribution with slight variations
      setBiasDistributionData(prev => prev.map(item => ({
        ...item,
        value: Math.max(5, Math.min(40, item.value + (Math.random() - 0.5) * 10))
      })));
      
      // Update timeline with new month
      setTimelineData(prev => {
        const newData = [...prev];
        const lastMonth = newData[newData.length - 1];
        newData.push({
          month: "Jul",
          biases: Math.floor(Math.random() * 30) + 20
        });
        return newData.slice(-6); // Keep last 6 months
      });
      
      // Update overall score
      setOverallBiasScore(prev => Math.max(50, Math.min(90, prev + (Math.random() - 0.5) * 10)));
      setBiasReduction(prev => Math.max(20, Math.min(40, prev + (Math.random() - 0.5) * 5)));
      
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <motion.section
      id="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Analytics Dashboard</h2>
              <p className="text-xl text-muted-foreground">Comprehensive bias analysis insights</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="text-sm text-muted-foreground">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <Button
                onClick={refreshData}
                disabled={isRefreshing}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Updating...' : 'Refresh'}</span>
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Overall Bias Score */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:row-span-2"
          >
            <Card className="shadow-card h-full">
              <CardHeader className="text-center pb-2">
                <CardTitle className="flex items-center justify-center text-lg">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                  Bias Score
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full">
                <div className="relative w-48 h-48 mb-6">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${overallBiasScore * 2.51} 251.2`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="text-4xl font-bold text-primary"
                    >
                      {overallBiasScore}
                    </motion.div>
                    <div className="text-muted-foreground text-sm">Bias Level</div>
                  </div>
                </div>
                
                <div className="text-center w-full">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-4 w-4 text-success mr-1" />
                    <span className="text-success font-semibold">{biasReduction}% Improvement</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Lower scores indicate more objective content
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bias Distribution Chart */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <PieChartIcon className="h-5 w-5 mr-2 text-primary" />
                  Bias Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={biasDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {biasDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
                              <p className="font-medium">{payload[0].payload.name}</p>
                              <p className="text-primary">{payload[0].value}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {biasDistributionData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Timeline Chart */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Bias Detection Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
                              <p className="font-medium">{label}</p>
                              <p className="text-primary">{payload[0].value} biases detected</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="biases"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 6 }}
                      activeDot={{ r: 8, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AnalyticsDashboard;