import { useState, useCallback } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, TrendingUp, CreditCard, Smartphone, Globe, DollarSign, Scan, Loader2 } from "lucide-react";

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateStats = () => [
  { title: "Threats Blocked", value: getRandomInt(800, 2000).toLocaleString(), change: `+${getRandomInt(5, 25)}%`, icon: Shield, color: "text-success" },
  { title: "Active Alerts", value: String(getRandomInt(5, 50)), change: `${Math.random() > 0.5 ? '+' : '-'}${getRandomInt(1, 15)}%`, icon: AlertTriangle, color: "text-warning" },
  { title: "Transactions Scanned", value: `${(getRandomInt(200, 800) / 10).toFixed(1)}K`, change: `+${getRandomInt(10, 40)}%`, icon: CheckCircle, color: "text-primary" },
  { title: "Detection Accuracy", value: `${(99 + Math.random() * 0.9).toFixed(1)}%`, change: `+${(Math.random() * 0.5).toFixed(1)}%`, icon: TrendingUp, color: "text-accent" },
];

const severities = ["high", "medium", "low"] as const;
const alertTemplates = [
  { type: "Credit Card Fraud", descriptions: ["Suspicious transaction pattern detected", "Unusual spending spike detected", "Card used in multiple countries"], icon: CreditCard },
  { type: "UPI Fraud", descriptions: ["Multiple failed authentication attempts", "Rapid successive transfers detected", "Unknown device login attempt"], icon: Smartphone },
  { type: "SMS Phishing", descriptions: ["Malicious link detected in SMS", "Fake bank OTP message intercepted", "Impersonation attempt flagged"], icon: Smartphone },
  { type: "Online Transaction", descriptions: ["Unusual payment gateway activity", "Proxy/VPN transaction detected", "High-value transaction from new device"], icon: Globe },
];
const times = ["Just now", "1 min ago", "3 min ago", "5 min ago", "10 min ago", "15 min ago"];

const generateAlerts = () => alertTemplates.map((t, i) => ({
  type: t.type,
  description: t.descriptions[getRandomInt(0, t.descriptions.length - 1)],
  time: times[i] || times[getRandomInt(0, times.length - 1)],
  severity: severities[getRandomInt(0, 2)],
  icon: t.icon,
}));

const generateCategories = () => [
  { name: "Credit Card Fraud", detections: getRandomInt(200, 600), trend: `+${getRandomInt(5, 20)}%`, icon: CreditCard, color: "bg-destructive/20 border-destructive/40" },
  { name: "UPI Fraud", detections: getRandomInt(100, 400), trend: `+${getRandomInt(2, 15)}%`, icon: Smartphone, color: "bg-warning/20 border-warning/40" },
  { name: "SMS Scams", detections: getRandomInt(80, 300), trend: `${Math.random() > 0.5 ? '+' : '-'}${getRandomInt(1, 10)}%`, icon: Smartphone, color: "bg-primary/20 border-primary/40" },
  { name: "Online Payments", detections: getRandomInt(50, 250), trend: `+${getRandomInt(5, 18)}%`, icon: DollarSign, color: "bg-accent/20 border-accent/40" },
];

const scanSteps = [
  { label: "Credit Card Fraud Scan", icon: CreditCard },
  { label: "UPI Fraud Detection", icon: Smartphone },
  { label: "SMS Phishing Analysis", icon: Smartphone },
  { label: "Online Transaction Check", icon: Globe },
];

const Dashboard = () => {
  const [stats, setStats] = useState(generateStats);
  const [recentAlerts, setRecentAlerts] = useState(generateAlerts);
  const [fraudCategories, setFraudCategories] = useState(generateCategories);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatuses, setStepStatuses] = useState<("pending" | "running" | "done")[]>(["pending", "pending", "pending", "pending"]);

  const runScan = useCallback(() => {
    if (scanning) return;
    setScanning(true);
    setScanProgress(0);
    setCurrentStep(0);
    setStepStatuses(["running", "pending", "pending", "pending"]);

    const totalDuration = 4000;
    const stepDuration = totalDuration / scanSteps.length;
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 80;
      const progress = Math.min((elapsed / totalDuration) * 100, 100);
      setScanProgress(progress);
      const step = Math.min(Math.floor(elapsed / stepDuration), scanSteps.length - 1);
      setCurrentStep(step);
      setStepStatuses(prev => prev.map((s, i) => i < step ? "done" : i === step ? "running" : "pending"));

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setStepStatuses(["done", "done", "done", "done"]);
        setScanProgress(100);
        setTimeout(() => {
          setStats(generateStats());
          setRecentAlerts(generateAlerts());
          setFraudCategories(generateCategories());
          setScanning(false);
        }, 500);
      }
    }, 80);
  }, [scanning]);

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Real-time fraud detection and security monitoring</p>
          </div>
          <Button variant="hero" className={!scanning ? "animate-pulse-glow" : ""} onClick={runScan} disabled={scanning}>
            {scanning ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Scanning...</> : <><Shield className="mr-2 h-4 w-4" />Run Security Scan</>}
          </Button>
        </div>

        {/* Scan Progress */}
        {scanning && (
          <Card className="glass border-primary/30 animate-slide-up">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2"><Scan className="h-5 w-5 text-primary animate-spin" />Security Scan in Progress</h3>
                <span className="text-sm text-muted-foreground">{Math.round(scanProgress)}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {scanSteps.map((step, i) => (
                  <div key={step.label} className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
                    stepStatuses[i] === "done" ? "border-success/40 bg-success/10" :
                    stepStatuses[i] === "running" ? "border-primary/40 bg-primary/10" :
                    "border-muted/40 bg-muted/10 opacity-50"
                  }`}>
                    {stepStatuses[i] === "done" ? <CheckCircle className="h-4 w-4 text-success" /> :
                     stepStatuses[i] === "running" ? <Loader2 className="h-4 w-4 text-primary animate-spin" /> :
                     <step.icon className="h-4 w-4 text-muted-foreground" />}
                    <span className="text-xs font-medium">{step.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="glass hover-glow transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.color}`}>{stat.change} from last week</p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-primary glow-primary">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <span>Recent Security Alerts</span>
                </CardTitle>
                <CardDescription>Latest fraud detection alerts and security events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors">
                      <div className={`p-2 rounded-full ${
                        alert.severity === 'high' ? 'bg-destructive/20 text-destructive' :
                        alert.severity === 'medium' ? 'bg-warning/20 text-warning' :
                        'bg-primary/20 text-primary'
                      }`}>
                        <alert.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{alert.type}</h4>
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="glass">
              <CardHeader>
                <CardTitle>Fraud Categories</CardTitle>
                <CardDescription>Detection breakdown by fraud type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fraudCategories.map((category) => (
                    <div key={category.name} className={`p-4 rounded-lg border ${category.color} transition-all duration-300 hover:scale-105`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <category.icon className="h-4 w-4" />
                          <span className="font-medium text-sm">{category.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{category.trend}</span>
                      </div>
                      <div className="text-2xl font-bold">{category.detections}</div>
                      <div className="text-xs text-muted-foreground">detections this week</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common fraud detection and analysis tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-24 flex-col space-y-2"><CreditCard className="h-6 w-6" /><span>Scan Credit Cards</span></Button>
              <Button variant="outline" className="h-24 flex-col space-y-2"><Smartphone className="h-6 w-6" /><span>Analyze SMS</span></Button>
              <Button variant="outline" className="h-24 flex-col space-y-2"><Globe className="h-6 w-6" /><span>Check Transactions</span></Button>
              <Button variant="outline" className="h-24 flex-col space-y-2"><TrendingUp className="h-6 w-6" /><span>View Analytics</span></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
