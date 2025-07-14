
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Users, 
  Calendar, 
  Package, 
  Stethoscope,
  FlaskConical,
  Scan,
  CreditCard,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Active Patients", value: "1,234", icon: Users, change: "+12%" },
    { title: "Available Doctors", value: "89", icon: Stethoscope, change: "+3%" },
    { title: "Pending Lab Results", value: "156", icon: FlaskConical, change: "-8%" },
    { title: "Queue Length", value: "23", icon: Clock, change: "+5%" },
  ];

  const modules = [
    {
      title: "Inventory Management",
      description: "Track medicine stock, expiry dates, and supply levels",
      icon: Package,
      status: "operational",
      path: "/inventory",
      alerts: 5
    },
    {
      title: "Doctor Scheduling",
      description: "Manage doctor availability and appointments",
      icon: Calendar,
      status: "operational",
      path: "/scheduling",
      alerts: 0
    },
    {
      title: "Radiology",
      description: "Schedule scans and manage imaging reports",
      icon: Scan,
      status: "operational",
      path: "/radiology",
      alerts: 2
    },
    {
      title: "Laboratory",
      description: "Lab work scheduling and report management",
      icon: FlaskConical,
      status: "operational",
      path: "/laboratory",
      alerts: 1
    },
    {
      title: "Billing & Payments",
      description: "Handle billing, insurance, and payment processing",
      icon: CreditCard,
      status: "operational",
      path: "/billing",
      alerts: 0
    },
    {
      title: "Queue Management",
      description: "Manage patient queues and wait times",
      icon: Clock,
      status: "operational",
      path: "/queue",
      alerts: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "critical": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hospital Management System</h1>
            <p className="text-muted-foreground">Comprehensive healthcare management platform</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              System Operational
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <module.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(module.status)}`} />
                        <span className="text-xs text-muted-foreground capitalize">{module.status}</span>
                      </div>
                    </div>
                  </div>
                  {module.alerts > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {module.alerts}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {module.description}
                </CardDescription>
                <Button 
                  onClick={() => navigate(module.path)}
                  className="w-full"
                  variant="outline"
                >
                  Open Module
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>System Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">234ms</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">1,456</div>
                <div className="text-sm text-muted-foreground">Active Sessions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
