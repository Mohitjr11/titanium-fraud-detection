import { Button } from "@/components/ui/button";
import { Shield, Zap, Eye, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-security.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms detect fraud patterns in real-time"
    },
    {
      icon: Shield,
      title: "Multi-Layer Security",
      description: "Comprehensive protection across credit cards, UPI, SMS, and online transactions"
    },
    {
      icon: Eye,
      title: "Real-Time Monitoring",
      description: "24/7 surveillance with instant alerts for suspicious activities"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process millions of transactions per second with minimal latency"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Cybersecurity Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-security" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto animate-slide-up">
          {/* Security Badge */}
          <div className="inline-flex items-center space-x-2 security-badge mb-8">
            <Shield className="h-4 w-4" />
            <span>Enterprise-Grade Security</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Titanium</span>
            <br />
            <span className="text-foreground">Digital Fraud</span>
            <br />
            <span className="text-primary">Detection System</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Protect your business with AI-powered fraud detection. Real-time monitoring, 
            intelligent alerts, and comprehensive analytics to safeguard against digital threats.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate("/signup")}
              className="text-lg px-8 py-6"
            >
              Start Free Trial
              <Shield className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/demo")}
              className="text-lg px-8 py-6"
            >
              Watch Demo
              <Eye className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass p-6 rounded-xl hover-glow hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-gradient-primary rounded-full mb-4 glow-primary">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-primary/10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">&lt;1ms</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">10M+</div>
              <div className="text-sm text-muted-foreground">Transactions Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;