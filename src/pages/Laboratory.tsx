
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  FlaskConical, 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  Download,
  Plus,
  Search,
  CheckCircle,
  AlertCircle,
  Send
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Laboratory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const labTests = [
    {
      id: "LAB001",
      patientName: "John Smith",
      patientId: "PAT001",
      testType: "Complete Blood Count",
      category: "Hematology",
      orderDate: "2024-07-14",
      sampleTime: "08:30 AM",
      status: "completed",
      technician: "Lab Tech. Brown",
      reportStatus: "ready",
      priority: "routine",
      results: "Normal",
      doctorName: "Dr. Johnson"
    },
    {
      id: "LAB002",
      patientName: "Mary Davis",
      patientId: "PAT002",
      testType: "Liver Function Test",
      category: "Biochemistry",
      orderDate: "2024-07-15",
      sampleTime: "09:15 AM",
      status: "in-progress",
      technician: "Lab Tech. Wilson",
      reportStatus: "pending",
      priority: "urgent",
      results: "Pending",
      doctorName: "Dr. Chen"
    },
    {
      id: "LAB003",
      patientName: "Robert Brown",
      patientId: "PAT003",
      testType: "Urine Analysis",
      category: "Clinical Pathology",
      orderDate: "2024-07-15",
      sampleTime: "10:00 AM",
      status: "sample-collected",
      technician: "Lab Tech. Garcia",
      reportStatus: "not-started",
      priority: "normal",
      results: "Pending",
      doctorName: "Dr. Rodriguez"
    },
    {
      id: "LAB004",
      patientName: "Lisa Wilson",
      patientId: "PAT004",
      testType: "Lipid Profile",
      category: "Biochemistry",
      orderDate: "2024-07-15",
      sampleTime: "11:30 AM",
      status: "sample-pending",
      technician: "Not Assigned",
      reportStatus: "not-started",
      priority: "routine",
      results: "Pending",
      doctorName: "Dr. Johnson"
    }
  ];

  const categories = [
    {
      name: "Hematology",
      testsToday: 15,
      pending: 3,
      completed: 12,
      avgTime: "45 min"
    },
    {
      name: "Biochemistry",
      testsToday: 28,
      pending: 8,
      completed: 20,
      avgTime: "60 min"
    },
    {
      name: "Microbiology",
      testsToday: 12,
      pending: 5,
      completed: 7,
      avgTime: "120 min"
    },
    {
      name: "Clinical Pathology",
      testsToday: 22,
      pending: 4,
      completed: 18,
      avgTime: "30 min"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-yellow-100 text-yellow-800";
      case "sample-collected": return "bg-blue-100 text-blue-800";
      case "sample-pending": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getReportStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "not-started": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "text-red-600";
      case "normal": return "text-yellow-600";
      case "routine": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const filteredTests = labTests.filter(test => 
    test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.testType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => navigate("/")} className="mb-2">
              ← Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Laboratory</h1>
            <p className="text-muted-foreground">Lab test management and reporting</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Order Lab Test
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Order New Lab Test</DialogTitle>
                <DialogDescription>
                  Enter the details for the new laboratory test.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Patient Name" />
                <Input placeholder="Patient ID" />
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Select Test Category</option>
                  <option>Hematology</option>
                  <option>Biochemistry</option>
                  <option>Microbiology</option>
                  <option>Clinical Pathology</option>
                </select>
                <Input placeholder="Test Type" />
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Priority Level</option>
                  <option>Routine</option>
                  <option>Normal</option>
                  <option>Urgent</option>
                </select>
                <Input placeholder="Ordering Doctor" />
                <Button className="w-full">Order Test</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{labTests.length}</div>
                <div className="text-sm text-muted-foreground">Today's Tests</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {labTests.filter(t => t.status === "completed").length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {labTests.filter(t => t.reportStatus === "pending").length}
                </div>
                <div className="text-sm text-muted-foreground">Reports Pending</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {labTests.filter(t => t.priority === "urgent").length}
                </div>
                <div className="text-sm text-muted-foreground">Urgent Tests</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lab Tests */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FlaskConical className="h-5 w-5" />
                    <span>Laboratory Tests</span>
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Test</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Report</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.map((test) => (
                      <TableRow key={test.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{test.patientName}</div>
                            <div className="text-xs text-muted-foreground">{test.patientId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{test.testType}</div>
                            <div className="text-xs text-muted-foreground">
                              Sample: {test.sampleTime}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{test.category}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(test.status)} variant="secondary">
                            {test.status.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getReportStatusColor(test.reportStatus)} variant="secondary">
                            {test.reportStatus.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs font-medium ${getPriorityColor(test.priority)}`}>
                            {test.priority.toUpperCase()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {test.reportStatus === "ready" && (
                              <>
                                <Button variant="outline" size="sm">
                                  <Download className="w-3 h-3" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Send className="w-3 h-3" />
                                </Button>
                              </>
                            )}
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Test Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Test Categories</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Avg: {category.avgTime}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-blue-600">{category.testsToday}</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-yellow-600">{category.pending}</div>
                      <div className="text-xs text-muted-foreground">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-green-600">{category.completed}</div>
                      <div className="text-xs text-muted-foreground">Done</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Laboratory;
