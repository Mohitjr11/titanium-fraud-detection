import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Settings, Shield, Activity, Database, Brain, 
  AlertTriangle, TrendingUp, Users, Server, 
  Zap, CheckCircle, Clock, BarChart3, RefreshCw, Loader2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const systemHealth = [
    { name: "API Server", status: "operational", uptime: "99.98%", responseTime: "45ms", icon: Server },
    { name: "Database", status: "operational", uptime: "99.95%", responseTime: "12ms", icon: Database },
    { name: "AI Models", status: "operational", uptime: "99.92%", responseTime: "320ms", icon: Brain },
    { name: "Alert System", status: "operational", uptime: "100%", responseTime: "8ms", icon: Zap }
  ];

  const [aiModels, setAiModels] = useState([
    { name: "Credit Card Fraud Detector", accuracy: 99.2, precision: 98.5, recall: 99.5, lastTrained: "2 days ago", status: "active", fraudProbability: 12.4 },
    { name: "UPI Fraud Analyzer", accuracy: 98.9, precision: 97.8, recall: 98.5, lastTrained: "5 days ago", status: "active", fraudProbability: 8.7 },
    { name: "SMS Phishing Classifier", accuracy: 99.5, precision: 99.1, recall: 99.3, lastTrained: "1 day ago", status: "active", fraudProbability: 15.2 },
    { name: "Transaction Anomaly Detection", accuracy: 97.6, precision: 96.8, recall: 97.9, lastTrained: "3 days ago", status: "active", fraudProbability: 6.3 }
  ]);

  const [retrainingModel, setRetrainingModel] = useState<string | null>(null);
  const [liveProbabilities, setLiveProbabilities] = useState<number[]>([12.4, 8.7, 15.2, 6.3]);

  // Live fraud probability simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveProbabilities(prev => prev.map(p => {
        const delta = (Math.random() - 0.5) * 4;
        return Math.max(1, Math.min(45, parseFloat((p + delta).toFixed(1))));
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleRetrain = useCallback((modelName: string) => {
    setRetrainingModel(modelName);
    toast({ title: "🔄 Retraining Started", description: `${modelName} is being retrained with latest data...` });
    setTimeout(() => {
      setAiModels(prev => prev.map(m => m.name === modelName ? {
        ...m,
        accuracy: parseFloat((99 + Math.random() * 0.9).toFixed(1)),
        precision: parseFloat((98 + Math.random() * 1.5).toFixed(1)),
        recall: parseFloat((98.5 + Math.random() * 1.2).toFixed(1)),
        lastTrained: "Just now",
      } : m));
      setRetrainingModel(null);
      toast({ title: "✅ Retraining Complete", description: `${modelName} has been successfully retrained.` });
    }, 3000);
  }, []);

  const criticalAlerts = [
    { title: "High fraud probability spike detected", description: "Credit card fraud attempts increased by 45% in last hour", severity: "critical", time: "5 minutes ago", probability: 87.5 },
    { title: "Model performance degradation", description: "UPI fraud model accuracy dropped to 96.2%", severity: "warning", time: "1 hour ago", probability: 65.3 },
    { title: "Unusual transaction pattern", description: "Detected coordinated attack across multiple accounts", severity: "high", time: "2 hours ago", probability: 92.8 }
  ];

  const systemMetrics = [
    { label: "Total Users", value: "12,457", change: "+8.2%", icon: Users, color: "text-primary" },
    { label: "Fraud Cases Today", value: "342", change: "+12%", icon: AlertTriangle, color: "text-destructive" },
    { label: "AI Predictions/Hour", value: "5.2K", change: "+24%", icon: Brain, color: "text-accent" },
    { label: "System Load", value: "42%", change: "-5%", icon: Activity, color: "text-success" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-destructive/20 text-destructive border-destructive";
      case "high": return "bg-destructive/10 text-destructive border-destructive/50";
      case "warning": return "bg-warning/20 text-warning border-warning";
      default: return "bg-primary/20 text-primary border-primary";
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-destructive";
    if (probability >= 50) return "text-warning";
    return "text-success";
  };

  const getProbBarColor = (p: number) => {
    if (p >= 25) return "bg-destructive";
    if (p >= 15) return "bg-warning";
    return "bg-success";
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">System overview, AI models, and administrative controls</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline"><Settings className="mr-2 h-4 w-4" />Configure</Button>
            <Button variant="hero" className="animate-pulse-glow"><Shield className="mr-2 h-4 w-4" />System Status</Button>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemMetrics.map((metric, index) => (
            <Card key={metric.label} className="glass hover-glow transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold mt-2">{metric.value}</p>
                    <p className={`text-sm mt-1 ${metric.color}`}>{metric.change} from yesterday</p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-primary glow-primary">
                    <metric.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Health & Critical Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2"><Activity className="h-5 w-5 text-success" /><span>System Health</span></CardTitle>
              <CardDescription>Real-time monitoring of all system components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((system) => (
                  <div key={system.name} className="flex items-center justify-between p-4 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-success/20 text-success"><system.icon className="h-5 w-5" /></div>
                      <div>
                        <h4 className="font-semibold">{system.name}</h4>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                          <span>Uptime: {system.uptime}</span><span>•</span><span>Response: {system.responseTime}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success border-success">
                      <CheckCircle className="h-3 w-3 mr-1" />Operational
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2"><AlertTriangle className="h-5 w-5 text-warning" /><span>Critical Alerts</span></CardTitle>
              <CardDescription>High-priority security events requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalAlerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} transition-all duration-300`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{alert.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getProbabilityColor(alert.probability)}>{alert.probability}%</Badge>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                    </div>
                    <p className="text-sm opacity-80">{alert.description}</p>
                    <div className="mt-3 flex space-x-2">
                      <Button size="sm" variant="outline" className="h-7 text-xs">Investigate</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs">Dismiss</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Models Performance with LIVE bars */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-accent" />
              <span>AI Model Performance & Live Fraud Probability</span>
            </CardTitle>
            <CardDescription>Real-time metrics with live fraud probability monitoring — click Retrain to update models</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiModels.map((model, idx) => {
                const liveProb = liveProbabilities[idx];
                const isRetraining = retrainingModel === model.name;
                return (
                  <div key={model.name} className="p-6 rounded-lg border border-primary/10 hover:border-primary/20 transition-all duration-300 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{model.name}</h4>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="bg-success/10 text-success border-success">{model.status}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center"><Clock className="h-3 w-3 mr-1" />{model.lastTrained}</span>
                        </div>
                      </div>
                      {/* Live Fraud Probability */}
                      <div className="text-right">
                        <div className={`text-2xl font-bold tabular-nums transition-colors duration-300 ${getProbabilityColor(liveProb)}`}>
                          {liveProb.toFixed(1)}%
                        </div>
                        <p className="text-xs text-muted-foreground">Live Fraud Prob.</p>
                      </div>
                    </div>

                    {/* Live probability bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Fraud Probability (Live)</span>
                        <span className={getProbabilityColor(liveProb)}>{liveProb.toFixed(1)}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-in-out ${getProbBarColor(liveProb)}`}
                          style={{ width: `${Math.min(liveProb * 2.2, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Accuracy bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Accuracy</span>
                        <span className="font-semibold">{model.accuracy}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-primary rounded-full transition-all duration-500" style={{ width: `${model.accuracy}%` }} />
                      </div>
                    </div>

                    {/* Precision & Recall */}
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-primary/10">
                      <div>
                        <p className="text-xs text-muted-foreground">Precision</p>
                        <p className="text-lg font-semibold text-accent">{model.precision}%</p>
                        <Progress value={model.precision} className="h-1 mt-1" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Recall</p>
                        <p className="text-lg font-semibold text-accent">{model.recall}%</p>
                        <Progress value={model.recall} className="h-1 mt-1" />
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1"><BarChart3 className="h-3 w-3 mr-1" />Details</Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        disabled={isRetraining}
                        onClick={() => handleRetrain(model.name)}
                      >
                        {isRetraining
                          ? <><Loader2 className="h-3 w-3 mr-1 animate-spin" />Retraining...</>
                          : <><RefreshCw className="h-3 w-3 mr-1" />Retrain</>
                        }
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Admin Controls */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2"><Settings className="h-5 w-5" /><span>Administrative Controls</span></CardTitle>
            <CardDescription>System configuration and model management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-24 flex-col space-y-2 hover-glow" onClick={() => { aiModels.forEach(m => handleRetrain(m.name)); }}>
                <Brain className="h-6 w-6" /><span>Retrain All Models</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col space-y-2 hover-glow"><Database className="h-6 w-6" /><span>Database Backup</span></Button>
              <Button variant="outline" className="h-24 flex-col space-y-2 hover-glow"><Shield className="h-6 w-6" /><span>Security Audit</span></Button>
              <Button variant="outline" className="h-24 flex-col space-y-2 hover-glow"><Users className="h-6 w-6" /><span>User Management</span></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
