import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, PieChart, Calendar, Download, Filter } from "lucide-react";

const Analytics = () => {
  const fraudTrends = [
    { month: "Jan", creditCard: 45, upi: 23, sms: 12, online: 8 },
    { month: "Feb", creditCard: 52, upi: 28, sms: 18, online: 12 },
    { month: "Mar", creditCard: 48, upi: 31, sms: 15, online: 9 },
    { month: "Apr", creditCard: 61, upi: 35, sms: 22, online: 15 },
    { month: "May", creditCard: 55, upi: 42, sms: 28, online: 18 },
    { month: "Jun", creditCard: 67, upi: 38, sms: 31, online: 21 }
  ];

  const detectionMetrics = [
    { name: "True Positives", value: 1247, percentage: 85.2 },
    { name: "False Positives", value: 89, percentage: 6.1 },
    { name: "True Negatives", value: 8932, percentage: 8.2 },
    { name: "False Negatives", value: 7, percentage: 0.5 }
  ];

  const geographicData = [
    { location: "Mumbai", incidents: 234, risk: "High" },
    { location: "Delhi", incidents: 189, risk: "High" },
    { location: "Bangalore", incidents: 156, risk: "Medium" },
    { location: "Chennai", incidents: 123, risk: "Medium" },
    { location: "Kolkata", incidents: 98, risk: "Low" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Analytics & Insights</h1>
            <p className="text-muted-foreground mt-2">
              Advanced fraud detection analytics and performance metrics
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Detection Rate</p>
                  <p className="text-3xl font-bold text-primary">99.5%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">False Positive Rate</p>
                  <p className="text-3xl font-bold text-warning">6.1%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-3xl font-bold text-accent">0.8ms</p>
                </div>
                <Calendar className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Money Saved</p>
                  <p className="text-3xl font-bold text-success">₹2.3M</p>
                </div>
                <PieChart className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fraud Trends Chart */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Fraud Detection Trends</CardTitle>
              <CardDescription>Monthly fraud detection by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border border-primary/20 rounded-lg glass">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse-glow" />
                  <p className="text-muted-foreground">Interactive Chart Placeholder</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Fraud trends visualization would be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detection Accuracy */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Model Performance</CardTitle>
              <CardDescription>AI model accuracy metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {detectionMetrics.map((metric, index) => (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{metric.name}</span>
                      <span className="font-medium">{metric.value} ({metric.percentage}%)</span>
                    </div>
                    <div className="w-full bg-secondary/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${metric.percentage}%`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Geographic Analysis */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Geographic Risk Analysis</CardTitle>
            <CardDescription>Fraud incidents by location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Top Risk Locations</h3>
                {geographicData.map((location, index) => (
                  <div key={location.location} className="flex items-center justify-between p-4 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors">
                    <div>
                      <h4 className="font-medium">{location.location}</h4>
                      <p className="text-sm text-muted-foreground">{location.incidents} incidents</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      location.risk === 'High' ? 'bg-destructive/20 text-destructive' :
                      location.risk === 'Medium' ? 'bg-warning/20 text-warning' :
                      'bg-success/20 text-success'
                    }`}>
                      {location.risk}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center border border-primary/20 rounded-lg glass h-80">
                <div className="text-center">
                  <PieChart className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse-glow" />
                  <p className="text-muted-foreground">Geographic Heat Map</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Interactive map visualization would be displayed here
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Series Analysis */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Real-time Detection Feed</CardTitle>
            <CardDescription>Live fraud detection events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "14:32:15", type: "Credit Card", location: "Mumbai", status: "Blocked" },
                { time: "14:31:48", type: "UPI", location: "Delhi", status: "Flagged" },
                { time: "14:31:22", type: "SMS Phishing", location: "Bangalore", status: "Blocked" },
                { time: "14:30:56", type: "Online Payment", location: "Chennai", status: "Reviewed" },
                { time: "14:30:33", type: "Credit Card", location: "Pune", status: "Blocked" }
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-primary/10">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-mono text-muted-foreground">{event.time}</span>
                    <span className="font-medium">{event.type}</span>
                    <span className="text-sm text-muted-foreground">{event.location}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    event.status === 'Blocked' ? 'bg-destructive/20 text-destructive' :
                    event.status === 'Flagged' ? 'bg-warning/20 text-warning' :
                    'bg-primary/20 text-primary'
                  }`}>
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;