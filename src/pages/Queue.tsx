
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Clock, 
  User, 
  Calendar, 
  ArrowUp,
  ArrowDown,
  Plus,
  Search,
  AlertCircle,
  CheckCircle,
  Users,
  Timer
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Queue = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const queues = [
    {
      id: "emergency",
      name: "Emergency",
      patients: [
        {
          id: "Q001",
          patientName: "Alice Johnson",
          patientId: "PAT005",
          arrivalTime: "08:30 AM",
          waitTime: "45 min",
          priority: "critical",
          department: "Emergency",
          status: "waiting",
          estimatedTime: "10 min"
        },
        {
          id: "Q002",
          patientName: "Bob Wilson",
          patientId: "PAT006",
          arrivalTime: "09:15 AM",
          waitTime: "30 min",
          priority: "urgent",
          department: "Emergency",
          status: "waiting",
          estimatedTime: "15 min"
        }
      ],
      avgWaitTime: "25 min",
      status: "active"
    },
    {
      id: "outpatient",
      name: "Outpatient",
      patients: [
        {
          id: "Q003",
          patientName: "Carol Davis",
          patientId: "PAT007",
          arrivalTime: "09:00 AM",
          waitTime: "35 min",
          priority: "normal",
          department: "Cardiology",
          status: "in-consultation",
          estimatedTime: "20 min"
        },
        {
          id: "Q004",
          patientName: "David Brown",
          patientId: "PAT008",
          arrivalTime: "09:30 AM",
          waitTime: "15 min",
          priority: "routine",
          department: "General Medicine",
          status: "waiting",
          estimatedTime: "25 min"
        },
        {
          id: "Q005",
          patientName: "Eve Martinez",
          patientId: "PAT009",
          arrivalTime: "10:00 AM",
          waitTime: "5 min",
          priority: "normal",
          department: "Pediatrics",
          status: "waiting",
          estimatedTime: "30 min"
        }
      ],
      avgWaitTime: "18 min",
      status: "active"
    },
    {
      id: "radiology",
      name: "Radiology",
      patients: [
        {
          id: "Q006",
          patientName: "Frank Wilson",
          patientId: "PAT010",
          arrivalTime: "08:45 AM",
          waitTime: "60 min",
          priority: "normal",
          department: "Radiology",
          status: "waiting",
          estimatedTime: "45 min"
        }
      ],
      avgWaitTime: "40 min",
      status: "busy"
    },
    {
      id: "laboratory",
      name: "Laboratory",
      patients: [
        {
          id: "Q007",
          patientName: "Grace Lee",
          patientId: "PAT011",
          arrivalTime: "09:20 AM",
          waitTime: "25 min",
          priority: "routine",
          department: "Laboratory",
          status: "sample-collection",
          estimatedTime: "10 min"
        },
        {
          id: "Q008",
          patientName: "Henry Taylor",
          patientId: "PAT012",
          arrivalTime: "10:15 AM",
          waitTime: "5 min",
          priority: "normal",
          department: "Laboratory",
          status: "waiting",
          estimatedTime: "15 min"
        }
      ],
      avgWaitTime: "15 min",
      status: "active"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "text-red-600 bg-red-50";
      case "urgent": return "text-orange-600 bg-orange-50";
      case "normal": return "text-yellow-600 bg-yellow-50";
      case "routine": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting": return "bg-blue-100 text-blue-800";
      case "in-consultation": return "bg-yellow-100 text-yellow-800";
      case "sample-collection": return "bg-purple-100 text-purple-800";
      case "completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getQueueStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "busy": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalPatients = queues.reduce((sum, queue) => sum + queue.patients.length, 0);
  const criticalPatients = queues.reduce((sum, queue) => 
    sum + queue.patients.filter(p => p.priority === "critical").length, 0
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
            <h1 className="text-3xl font-bold text-foreground">Queue Management</h1>
            <p className="text-muted-foreground">Patient queue monitoring and optimization</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add to Queue
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Patient to Queue</DialogTitle>
                <DialogDescription>
                  Add a new patient to the appropriate queue.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Patient Name" />
                <Input placeholder="Patient ID" />
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Select Department</option>
                  <option>Emergency</option>
                  <option>Outpatient</option>
                  <option>Radiology</option>
                  <option>Laboratory</option>
                </select>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Priority Level</option>
                  <option>Critical</option>
                  <option>Urgent</option>
                  <option>Normal</option>
                  <option>Routine</option>
                </select>
                <Button className="w-full">Add to Queue</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Queue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalPatients}</div>
                <div className="text-sm text-muted-foreground">Total in Queue</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{criticalPatients}</div>
                <div className="text-sm text-muted-foreground">Critical Cases</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {queues.filter(q => q.status === "active").length}
                </div>
                <div className="text-sm text-muted-foreground">Active Queues</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">24 min</div>
                <div className="text-sm text-muted-foreground">Avg Wait Time</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Queue Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {queues.map((queue) => (
            <Card key={queue.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>{queue.name}</span>
                  </CardTitle>
                  <Badge className={getQueueStatusColor(queue.status)} variant="secondary">
                    {queue.status}
                  </Badge>
                </div>
                <CardDescription>
                  {queue.patients.length} patients • Avg wait: {queue.avgWaitTime}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {queue.patients.map((patient, index) => (
                  <div key={patient.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div className="font-medium text-sm">{patient.patientName}</div>
                      </div>
                      <Badge className={getPriorityColor(patient.priority)} variant="secondary">
                        {patient.priority}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>ID: {patient.patientId}</div>
                      <div>Arrived: {patient.arrivalTime}</div>
                      <div>Waiting: {patient.waitTime}</div>
                      <div>Est. time: {patient.estimatedTime}</div>
                    </div>
                    <div className="mt-2">
                      <Badge className={getStatusColor(patient.status)} variant="secondary">
                        {patient.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 mt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ArrowUp className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <ArrowDown className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Call
                      </Button>
                    </div>
                  </div>
                ))}
                {queue.patients.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No patients in queue</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Queue Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Timer className="h-5 w-5" />
              <span>Queue Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-muted-foreground">Patients Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-muted-foreground">On-Time Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">18 min</div>
                <div className="text-sm text-muted-foreground">Peak Wait Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">4.2</div>
                <div className="text-sm text-muted-foreground">Satisfaction Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Queue;
