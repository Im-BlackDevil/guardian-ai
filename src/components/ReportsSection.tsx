import { motion } from "framer-motion";
import { FileText, TrendingUp, BarChart3, Download, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ReportsSection = () => {
  const reports = [
    {
      id: 1,
      title: "Monthly Bias Analysis Report",
      type: "Monthly",
      date: "August 2025",
      status: "Completed",
      biases: 127,
      improvement: "+15%",
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "Team Communication Audit",
      type: "Quarterly",
      date: "Q2 2025",
      status: "In Progress",
      biases: 89,
      improvement: "+23%",
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "Bias Reduction Progress",
      type: "Weekly",
      date: "Week 33",
      status: "Completed",
      biases: 45,
      improvement: "+8%",
      downloadUrl: "#"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-success/10 text-success border-success/20";
      case "In Progress": return "bg-warning/10 text-warning border-warning/20";
      case "Pending": return "bg-muted text-muted-foreground border-border";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <motion.section
      id="reports"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/10"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Reports & Analytics</h2>
          <p className="text-xl text-muted-foreground">Comprehensive insights and downloadable reports</p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="shadow-card text-center">
            <CardContent className="pt-6">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">12</div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="pt-6">
              <div className="bg-success/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div className="text-2xl font-bold text-success mb-1">261</div>
              <div className="text-sm text-muted-foreground">Biases Detected</div>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="pt-6">
              <div className="bg-warning/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-warning" />
              </div>
              <div className="text-2xl font-bold text-warning mb-1">+18%</div>
              <div className="text-sm text-muted-foreground">Avg Improvement</div>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="pt-6">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent mb-1">4</div>
              <div className="text-sm text-muted-foreground">Active Reports</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reports List */}
        <div className="space-y-6">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{report.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                          {report.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {report.date}
                        </span>
                        <span className="flex items-center">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          {report.biases} biases
                        </span>
                        <span className="flex items-center text-success">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {report.improvement}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Generate Report Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <FileText className="mr-2 h-5 w-5" />
            Generate New Report
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ReportsSection;
