import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Home, Search, BarChart3, AlertTriangle, Settings, LogOut, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Fraud Detection", href: "/detection", icon: Search },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Alerts", href: "/alerts", icon: AlertTriangle },
    { name: "Admin Dashboard", href: "/admin", icon: Settings },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      } glass border-r border-primary/10`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-primary/10">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg glow-primary">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-xl font-bold text-gradient">Titanium</h1>
                  <p className="text-xs text-muted-foreground">Fraud Detection</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-primary/20 text-primary border border-primary/30 glow-primary"
                    : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-primary/10">
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        {/* Top Bar */}
        <header className="h-16 glass border-b border-primary/10 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center space-x-4">
            <div className="security-badge">
              <Shield className="h-4 w-4" />
              <span>System Online</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;