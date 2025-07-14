
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Stethoscope, Plus, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Scheduling = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const doctors = [
    {
      id: "DOC001",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      status: "available",
      shift: "Morning",
      appointments: 8,
      maxAppointments: 12,
      nextAvailable: "10:30 AM"
    },
    {
      id: "DOC002",
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      status: "busy",
      shift: "Full Day",
      appointments: 15,
      maxAppointments: 16,
      nextAvailable: "2:15 PM"
    },
    {
      id: "DOC003",
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      status: "available",
      shift: "Evening",
      appointments: 6,
      maxAppointments: 10,
      nextAvailable: "Now"
    },
    {
      id: "DOC004",
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      status: "off-duty",
      shift: "Off",
      appointments: 0,
      maxAppointments: 0,
      nextAvailable: "Tomorrow 9:00 AM"
    }
  ];

  const appointments = [
    {
      id: "APT001",
      patientName: "John Smith",
      doctorName: "Dr. Sarah Johnson",
      time: "09:00 AM",
      type: "Check-up",
      status: "confirmed",
      priority: "routine"
    },
    {
      id: "APT002",
      patientName: "Mary Davis",
      doctorName: "Dr. Michael Chen",
      time: "10:30 AM",
      type: "Follow-up",
      status: "in-progress",
      priority: "normal"
    },
    {
      id: "APT003",
      patientName: "Robert Brown",
      doctorName: "Dr. Emily Rodriguez",
      time: "02:00 PM",
      type: "Emergency",
      status: "urgent",
      priority: "high"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "busy": return "bg-yellow-100 text-yellow-800";
      case "off-duty": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "in-progress": return "bg-yellow-100 text-yellow-800";
      case "urgent": return "bg-red-100 text-red-800";
      case "completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600";
      case "normal": return "text-yellow-600";
      case "routine": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => navigate("/")} className="mb-2">
              ← Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Doctor Scheduling</h1>
            <p className="text-muted-foreground">Manage doctor availability and appointments</p>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border rounded-md"
            />
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {doctors.filter(d => d.status === "available").length}
                </div>
                <div className="text-sm text-muted-foreground">Available Doctors</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {doctors.filter(d => d.status === "busy").length}
                </div>
                <div className="text-sm text-muted-foreground">Busy Doctors</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{appointments.length}</div>
                <div className="text-sm text-muted-foreground">Today's Appointments</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {appointments.filter(a => a.priority === "high").length}
                </div>
                <div className="text-sm text-muted-foreground">Urgent Cases</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Doctor Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="h-5 w-5" />
                <span>Doctor Availability</span>
              </CardTitle>
              <CardDescription>Current status of all doctors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{doctor.name}</div>
                      <div className="text-sm text-muted-foreground">{doctor.specialty}</div>
                      <div className="text-xs text-muted-foreground">
                        {doctor.appointments}/{doctor.maxAppointments} appointments
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={getStatusColor(doctor.status)} variant="secondary">
                      {doctor.status.replace('-', ' ')}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      Next: {doctor.nextAvailable}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Today's Appointments</span>
              </CardTitle>
              <CardDescription>Scheduled appointments for {selectedDate}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-full">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{appointment.patientName}</div>
                      <div className="text-sm text-muted-foreground">{appointment.doctorName}</div>
                      <div className="text-xs text-muted-foreground">
                        {appointment.type} - {appointment.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={getAppointmentStatusColor(appointment.status)} variant="secondary">
                      {appointment.status.replace('-', ' ')}
                    </Badge>
                    <div className={`text-xs font-medium ${getPriorityColor(appointment.priority)}`}>
                      {appointment.priority.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Plus className="h-6 w-6 mb-2" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Calendar className="h-6 w-6 mb-2" />
                View Calendar
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Clock className="h-6 w-6 mb-2" />
                Manage Shifts
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <User className="h-6 w-6 mb-2" />
                Doctor Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Scheduling;
