
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Scan, 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  Download,
  Plus,
  Search,
  AlertCircle,
  CheckCircle,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Radiology = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const scans = [
    {
      id: "RAD001",
      patientName: "John Smith",
      patientId: "PAT001",
      scanType: "X-Ray Chest",
      scheduledDate: "2024-07-15",
      scheduledTime: "09:00 AM",
      status: "completed",
      technician: "Tech. Johnson",
      reportStatus: "ready",
      priority: "routine",
      room: "Radiology-1"
    },
    {
      id: "RAD002",
      patientName: "Mary Davis",
      patientId: "PAT002",
      scanType: "MRI Brain",
      scheduledDate: "2024-07-15",
      scheduledTime: "11:30 AM",
      status: "in-progress",
      technician: "Tech. Wilson",
      reportStatus: "pending",
      priority: "urgent",
      room: "Radiology-3"
    },
    {
      id: "RAD003",
      patientName: "Robert Brown",
      patientId: "PAT003",
      scanType: "CT Abdomen",
      scheduledDate: "2024-07-15",
      scheduledTime: "02:00 PM",
      status: "scheduled",
      technician: "Tech. Anderson",
      reportStatus: "not-started",
      priority: "normal",
      room: "Radiology-2"
    },
    {
      id: "RAD004",
      patientName: "Lisa Wilson",
      patientId: "PAT004",
      scanType: "Ultrasound",
      scheduledDate: "2024-07-15",
      scheduledTime: "03:30 PM",
      status: "scheduled",
      technician: "Tech. Garcia",
      reportStatus: "not-started",
      priority: "routine",
      room: "Radiology-4"
    }
  ];

  const equipment = [
    {
      name: "X-Ray Machine 1",
      status: "operational",
      location: "Radiology-1",
      nextMaintenance: "2024-08-15",
      usage: "78%"
    },
    {
      name: "MRI Scanner",
      status: "operational",
      location: "Radiology-3",
      nextMaintenance: "2024-07-20",
      usage: "92%"
    },
    {
      name: "CT Scanner",
      status: "maintenance",
      location: "Radiology-2",
      nextMaintenance: "2024-07-16",
      usage: "0%"
    },
    {
      name: "Ultrasound Machine",
      status: "operational",
      location: "Radiology-4",
      nextMaintenance: "2024-09-01",
      usage: "45%"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-yellow-100 text-yellow-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "cancelled": return "bg-red-100 text-red-800";
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

  const getEquipmentStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-green-100 text-green-800";
      case "maintenance": return "bg-red-100 text-red-800";
      case "offline": return "bg-gray-100 text-gray-800";
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

  const filteredScans = scans.filter(scan => 
    scan.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scan.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scan.scanType.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-3xl font-bold text-foreground">Radiology Department</h1>
            <p className="text-muted-foreground">Imaging services and scan management</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Schedule Scan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Scan</DialogTitle>
                <DialogDescription>
                  Enter the details for the new imaging scan.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Patient Name" />
                <Input placeholder="Patient ID" />
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Select Scan Type</option>
                  <option>X-Ray</option>
                  <option>MRI</option>
                  <option>CT Scan</option>
                  <option>Ultrasound</option>
                  <option>Mammography</option>
                </select>
                <Input type="date" />
                <Input type="time" />
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Priority Level</option>
                  <option>Routine</option>
                  <option>Normal</option>
                  <option>Urgent</option>
                </select>
                <Button className="w-full">Schedule Scan</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{scans.length}</div>
                <div className="text-sm text-muted-foreground">Today's Scans</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {scans.filter(s => s.status === "completed").length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {scans.filter(s => s.reportStatus === "pending").length}
                </div>
                <div className="text-sm text-muted-foreground">Reports Pending</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {scans.filter(s => s.priority === "urgent").length}
                </div>
                <div className="text-sm text-muted-foreground">Urgent Cases</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scheduled Scans */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Scan className="h-5 w-5" />
                    <span>Scheduled Scans</span>
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search scans..."
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
                      <TableHead>Scan Type</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Report</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredScans.map((scan) => (
                      <TableRow key={scan.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{scan.patientName}</div>
                            <div className="text-xs text-muted-foreground">{scan.patientId}</div>
                          </div>
                        </TableCell>
                        <TableCell>{scan.scanType}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm">{scan.scheduledTime}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(scan.status)} variant="secondary">
                            {scan.status.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getReportStatusColor(scan.reportStatus)} variant="secondary">
                            {scan.reportStatus.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs font-medium ${getPriorityColor(scan.priority)}`}>
                            {scan.priority.toUpperCase()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button variant="outline" size="sm">
                              <Eye className="w-3 h-3" />
                            </Button>
                            {scan.reportStatus === "ready" && (
                              <Button variant="outline" size="sm">
                                <Download className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Equipment Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Equipment Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {equipment.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{item.name}</div>
                    <Badge className={getEquipmentStatusColor(item.status)} variant="secondary">
                      {item.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Location: {item.location}</div>
                    <div>Usage: {item.usage}</div>
                    <div>Next Maintenance: {item.nextMaintenance}</div>
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

export default Radiology;
