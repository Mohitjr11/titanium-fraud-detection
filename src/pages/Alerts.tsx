import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  AlertTriangle, Shield, Bell, Clock, CheckCircle, X, Eye,
  FileText, MapPin, User, CreditCard, Hash, TrendingUp, Ban
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AlertDetail {
  [key: string]: string | number;
}

interface AlertItem {
  id: number;
  type: string;
  title: string;
  description: string;
  time: string;
  location: string;
  severity: string;
  status: string;
  details: AlertDetail;
  riskScore: number;
  affectedAccounts: number;
  totalAmount: string;
}

const initialAlerts: AlertItem[] = [
  {
    id: 1, type: "Critical", title: "Multiple Failed Credit Card Attempts",
    description: "Detected 15 failed transactions from the same IP address within 5 minutes",
    time: "2 minutes ago", location: "Mumbai, India", severity: "critical", status: "active",
    riskScore: 94, affectedAccounts: 8, totalAmount: "₹4,56,780",
    details: { ip: "192.168.1.100", attempts: 15, cards: 8, pattern: "Sequential card numbers" }
  },
  {
    id: 2, type: "High", title: "Suspicious UPI Transaction Pattern",
    description: "Unusual transaction velocity detected for user ID 78934",
    time: "8 minutes ago", location: "Delhi, India", severity: "high", status: "active",
    riskScore: 82, affectedAccounts: 3, totalAmount: "₹2,34,567",
    details: { userId: "78934", transactions: 23, amount: "₹2,34,567", timespan: "30 minutes" }
  },
  {
    id: 3, type: "Medium", title: "Phishing SMS Campaign Detected",
    description: "New phishing template identified targeting bank customers",
    time: "25 minutes ago", location: "Bangalore, India", severity: "medium", status: "investigating",
    riskScore: 67, affectedAccounts: 1247, totalAmount: "₹12,45,000",
    details: { template: "URGENT: Verify KYC", targets: 1247, blocked: 1156, success_rate: "92.7%" }
  },
  {
    id: 4, type: "Low", title: "Unusual Login Location",
    description: "User login from new geographic location",
    time: "1 hour ago", location: "Chennai, India", severity: "low", status: "active",
    riskScore: 35, affectedAccounts: 1, totalAmount: "₹0",
    details: { user: "user@example.com", newLocation: "Singapore", lastLogin: "Mumbai, 2 days ago", action: "Additional verification required" }
  },
  {
    id: 5, type: "Critical", title: "Payment Gateway Anomaly",
    description: "Unusual traffic spike detected on payment endpoint",
    time: "1.5 hours ago", location: "Multiple", severity: "critical", status: "active",
    riskScore: 91, affectedAccounts: 156, totalAmount: "₹45,67,890",
    details: { endpoint: "/api/payments", traffic: "15x normal", duration: "12 minutes", blocked: "94% of requests" }
  }
];

const Alerts = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [investigateAlert, setInvestigateAlert] = useState<AlertItem | null>(null);
  const [blockAlert, setBlockAlert] = useState<AlertItem | null>(null);
  const [blockingId, setBlockingId] = useState<number | null>(null);

  const activeCount = alerts.filter(a => a.status === "active").length;
  const investigatingCount = alerts.filter(a => a.status === "investigating").length;
  const blockedCount = initialAlerts.length - alerts.length;

  const alertStats = [
    { label: "Active Alerts", value: activeCount, color: "text-destructive" },
    { label: "Investigating", value: investigatingCount, color: "text-warning" },
    { label: "Blocked Today", value: blockedCount + 34, color: "text-success" },
    { label: "Total Monitored", value: alerts.length, color: "text-muted-foreground" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'investigating': return <Eye className="h-4 w-4 text-warning" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const handleInvestigate = (alert: AlertItem) => {
    setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, status: "investigating" } : a));
    setInvestigateAlert(alert);
  };

  const handleBlock = (alert: AlertItem) => {
    setBlockAlert(alert);
  };

  const confirmBlock = () => {
    if (!blockAlert) return;
    const id = blockAlert.id;
    setBlockingId(id);
    setBlockAlert(null);
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== id));
      setBlockingId(null);
      toast({
        title: "🛡️ Threat Blocked Successfully",
        description: `"${initialAlerts.find(a => a.id === id)?.title}" has been blocked and the source IP has been blacklisted.`,
      });
    }, 600);
  };

  const handleResolve = (id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: "resolved" } : a));
    toast({ title: "✅ Alert Resolved", description: "The alert has been marked as resolved." });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Security Alerts</h1>
            <p className="text-muted-foreground mt-2">Real-time fraud alerts and security notifications</p>
          </div>
          <div className="flex items-center space-x-2 security-badge animate-pulse-glow">
            <Shield className="h-4 w-4" />
            <span>Monitoring Active</span>
          </div>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {alertStats.map((stat, index) => (
            <Card key={stat.label} className="glass hover-glow transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alerts List */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <span>Recent Alerts</span>
            </CardTitle>
            <CardDescription>Click Investigate for a full fraud report, or Block to remove the threat</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-success" />
                  <p className="text-lg font-semibold">All Clear!</p>
                  <p>All threats have been blocked. No active alerts.</p>
                </div>
              )}
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-6 rounded-lg border border-primary/10 hover:border-primary/20 transition-all duration-500 glass ${
                    blockingId === alert.id ? "opacity-0 scale-95 -translate-x-8" : "opacity-100"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-full bg-gradient-primary glow-primary">
                        {getStatusIcon(alert.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2 flex-wrap gap-y-1">
                          <h3 className="text-lg font-semibold">{alert.title}</h3>
                          <Badge className={getSeverityColor(alert.severity)}>{alert.type}</Badge>
                          <Badge variant="outline" className="capitalize">{alert.status}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{alert.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1"><Clock className="h-3 w-3" /><span>{alert.time}</span></span>
                          <span>{alert.location}</span>
                        </div>
                        {/* Risk Score Bar */}
                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-xs text-muted-foreground">Risk Score:</span>
                          <div className="flex-1 max-w-[200px]">
                            <Progress value={alert.riskScore} className="h-2" />
                          </div>
                          <span className={`text-sm font-bold ${alert.riskScore >= 80 ? 'text-destructive' : alert.riskScore >= 50 ? 'text-warning' : 'text-success'}`}>
                            {alert.riskScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 flex-shrink-0">
                      {alert.status !== "resolved" && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleInvestigate(alert)}>
                            <Eye className="h-4 w-4 mr-1" />Investigate
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => handleBlock(alert)}>
                            <Ban className="h-4 w-4 mr-1" />Block
                          </Button>
                        </>
                      )}
                      {alert.status === "investigating" && (
                        <Button variant="success" size="sm" onClick={() => handleResolve(alert.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" />Resolve
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Alert Details */}
                  <div className="mt-4 p-4 rounded-lg bg-card/30 border border-primary/10">
                    <h4 className="font-semibold mb-3 text-sm">Alert Details:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {Object.entries(alert.details).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <div className="font-medium mt-1">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common alert management actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2"><Bell className="h-6 w-6" /><span>Configure Alerts</span></Button>
              <Button variant="outline" className="h-20 flex-col space-y-2"><Shield className="h-6 w-6" /><span>Security Rules</span></Button>
              <Button variant="outline" className="h-20 flex-col space-y-2"><AlertTriangle className="h-6 w-6" /><span>Emergency Response</span></Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investigate Dialog – Full Fraud Report */}
      <Dialog open={!!investigateAlert} onOpenChange={() => setInvestigateAlert(null)}>
        <DialogContent className="max-w-2xl glass">
          {investigateAlert && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Fraud Investigation Report
                </DialogTitle>
                <DialogDescription>Detailed analysis for alert #{investigateAlert.id}</DialogDescription>
              </DialogHeader>
              <div className="space-y-5 py-2">
                {/* Summary */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5 text-center">
                    <div className={`text-2xl font-bold ${investigateAlert.riskScore >= 80 ? 'text-destructive' : 'text-warning'}`}>{investigateAlert.riskScore}%</div>
                    <p className="text-xs text-muted-foreground mt-1">Risk Score</p>
                  </div>
                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 text-center">
                    <div className="text-2xl font-bold text-primary">{investigateAlert.affectedAccounts}</div>
                    <p className="text-xs text-muted-foreground mt-1">Affected Accounts</p>
                  </div>
                  <div className="p-4 rounded-lg border border-warning/20 bg-warning/5 text-center">
                    <div className="text-2xl font-bold text-warning">{investigateAlert.totalAmount}</div>
                    <p className="text-xs text-muted-foreground mt-1">Total Amount</p>
                  </div>
                </div>

                {/* Info rows */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-primary/10">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium w-28">Alert Type:</span>
                    <Badge className={getSeverityColor(investigateAlert.severity)}>{investigateAlert.type}</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium w-28">Location:</span>
                    <span className="text-sm">{investigateAlert.location}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-primary/10">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium w-28">Detected:</span>
                    <span className="text-sm">{investigateAlert.time}</span>
                  </div>
                </div>

                {/* Evidence */}
                <div className="p-4 rounded-lg border border-primary/10 bg-card/30">
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><Hash className="h-4 w-4" />Evidence & Forensics</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {Object.entries(investigateAlert.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-2 rounded bg-muted/20">
                        <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className="p-4 rounded-lg border border-warning/30 bg-warning/5">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-warning" />AI Recommendation</h4>
                  <p className="text-sm text-muted-foreground">
                    {investigateAlert.riskScore >= 80
                      ? "⚠️ HIGH RISK — Immediate blocking recommended. Pattern matches known fraud syndicate behavior. Escalate to security team."
                      : investigateAlert.riskScore >= 50
                      ? "🔍 MEDIUM RISK — Continue monitoring. Additional verification needed before taking action."
                      : "ℹ️ LOW RISK — Likely a false positive. Monitor for 24 hours and auto-resolve if no further activity."}
                  </p>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setInvestigateAlert(null)}>Close Report</Button>
                <Button variant="danger" onClick={() => { setInvestigateAlert(null); handleBlock(investigateAlert); }}>
                  <Ban className="h-4 w-4 mr-1" />Block Threat
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Block Confirmation */}
      <AlertDialog open={!!blockAlert} onOpenChange={() => setBlockAlert(null)}>
        <AlertDialogContent className="glass">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-destructive" />
              Block This Threat?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently block the source of "{blockAlert?.title}" and blacklist the associated IP addresses. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBlock} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Block & Blacklist
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Alerts;
