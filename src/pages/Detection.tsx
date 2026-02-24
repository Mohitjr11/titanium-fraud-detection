import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Smartphone, Globe, Upload, Scan, AlertTriangle, CheckCircle, Brain, Zap } from "lucide-react";
import CsvFraudAnalyzer from "@/components/CsvFraudAnalyzer";

const Detection = () => {
  const [activeDetection, setActiveDetection] = useState<string | null>(null);
  const [smsText, setSmsText] = useState("");
  const [scanResults, setScanResults] = useState<any>(null);

  const detectSMSFraud = () => {
    setActiveDetection("sms");
    // Simulate AI detection
    setTimeout(() => {
      setScanResults({
        type: "SMS Analysis",
        prediction: "Phishing Detected",
        confidence: 94.5,
        reasons: [
          "Contains suspicious financial terms",
          "Requests personal information",
          "Suspicious URL pattern detected",
          "Matches known phishing templates"
        ],
        severity: "high"
      });
      setActiveDetection(null);
    }, 2000);
  };

  const fraudDetectionModules = [
    {
      id: "credit-card",
      title: "Credit Card Fraud",
      description: "AI-powered detection of fraudulent credit card transactions",
      icon: CreditCard,
      color: "border-destructive/40 bg-destructive/10",
      features: ["Real-time transaction monitoring", "Pattern recognition", "Behavioral analysis"]
    },
    {
      id: "upi",
      title: "UPI Fraud Detection",
      description: "Monitor UPI transactions for suspicious patterns and anomalies",
      icon: Smartphone,
      color: "border-warning/40 bg-warning/10",
      features: ["Authentication monitoring", "Transaction velocity checks", "Device fingerprinting"]
    },
    {
      id: "sms",
      title: "SMS Phishing",
      description: "NLP-based detection of phishing and scam SMS messages",
      icon: Smartphone,
      color: "border-primary/40 bg-primary/10",
      features: ["Text classification", "URL analysis", "Pattern matching"]
    },
    {
      id: "online",
      title: "Online Payments",
      description: "Comprehensive analysis of online transaction fraud",
      icon: Globe,
      color: "border-accent/40 bg-accent/10",
      features: ["Gateway monitoring", "IP analysis", "Velocity tracking"]
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Fraud Detection</h1>
            <p className="text-muted-foreground mt-2">
              AI-powered analysis across multiple fraud categories
            </p>
          </div>
          <div className="flex items-center space-x-2 security-badge">
            <Brain className="h-4 w-4" />
            <span>AI Models Active</span>
          </div>
        </div>

        {/* Detection Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fraudDetectionModules.map((module, index) => (
            <Card 
              key={module.id}
              className={`glass hover-glow transition-all duration-300 ${module.color} border`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-primary rounded-lg glow-primary">
                    <module.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span>{module.title}</span>
                </CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ul className="space-y-2">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full">
                    <Scan className="mr-2 h-4 w-4" />
                    Start Detection
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Detection Tool */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Interactive Fraud Analysis</span>
            </CardTitle>
            <CardDescription>
              Test our AI models with real-time fraud detection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sms" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="sms">SMS Analysis</TabsTrigger>
                <TabsTrigger value="transaction">Transaction</TabsTrigger>
                <TabsTrigger value="upload">File Upload</TabsTrigger>
                <TabsTrigger value="realtime">Real-time</TabsTrigger>
              </TabsList>

              <TabsContent value="sms" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sms-text">SMS Message Text</Label>
                    <Textarea
                      id="sms-text"
                      placeholder="Paste SMS message content here for phishing analysis..."
                      value={smsText}
                      onChange={(e) => setSmsText(e.target.value)}
                      className="mt-2 min-h-[120px] glass border-primary/20"
                    />
                  </div>
                  <Button 
                    onClick={detectSMSFraud}
                    disabled={!smsText.trim() || activeDetection === "sms"}
                    variant="hero"
                    className="w-full"
                  >
                    {activeDetection === "sms" ? (
                      <>
                        <Scan className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" />
                        Analyze SMS
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="transaction" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Transaction Amount</Label>
                    <Input id="amount" placeholder="Enter amount" className="glass border-primary/20" />
                  </div>
                  <div>
                    <Label htmlFor="merchant">Merchant</Label>
                    <Input id="merchant" placeholder="Merchant name" className="glass border-primary/20" />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Transaction location" className="glass border-primary/20" />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="datetime-local" className="glass border-primary/20" />
                  </div>
                </div>
                <Button variant="hero" className="w-full">
                  <Scan className="mr-2 h-4 w-4" />
                  Analyze Transaction
                </Button>
              </TabsContent>

              <TabsContent value="upload" className="space-y-4">
                <CsvFraudAnalyzer />
              </TabsContent>

              <TabsContent value="realtime" className="space-y-4">
                <div className="text-center p-8">
                  <div className="animate-pulse-glow mb-4">
                    <Zap className="h-16 w-16 text-primary mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect your payment systems for real-time fraud detection
                  </p>
                  <Button variant="hero">
                    Connect API
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Results Display */}
        {scanResults && (
          <Card className="glass border-primary/30 animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className={`h-5 w-5 ${
                  scanResults.severity === 'high' ? 'text-destructive' : 'text-warning'
                }`} />
                <span>Detection Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{scanResults.prediction}</h3>
                    <p className="text-sm text-muted-foreground">{scanResults.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{scanResults.confidence}%</div>
                    <div className="text-sm text-muted-foreground">Confidence</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Detection Reasons:</h4>
                  <ul className="space-y-1">
                    {scanResults.reasons.map((reason: string, idx: number) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <AlertTriangle className="h-3 w-3 text-warning" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button variant="destructive" size="sm">
                    Block Transaction
                  </Button>
                  <Button variant="outline" size="sm">
                    Flag for Review
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setScanResults(null)}>
                    Dismiss
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Detection;