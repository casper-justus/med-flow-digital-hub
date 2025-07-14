
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Package, 
  Search, 
  Plus, 
  AlertTriangle, 
  CheckCircle,
  TrendingDown,
  Calendar,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const inventory = [
    {
      id: "MED001",
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      stock: 150,
      minStock: 50,
      expiry: "2024-12-15",
      status: "good",
      location: "Pharmacy-A1",
      cost: 2.50
    },
    {
      id: "MED002",
      name: "Amoxicillin 250mg",
      category: "Antibiotic",
      stock: 25,
      minStock: 30,
      expiry: "2024-10-20",
      status: "low",
      location: "Pharmacy-B2",
      cost: 8.75
    },
    {
      id: "MED003",
      name: "Insulin Glargine",
      category: "Diabetes",
      stock: 5,
      minStock: 10,
      expiry: "2024-09-30",
      status: "critical",
      location: "Pharmacy-C1",
      cost: 45.00
    },
    {
      id: "MED004",
      name: "Aspirin 100mg",
      category: "Cardiology",
      stock: 200,
      minStock: 75,
      expiry: "2025-03-10",
      status: "good",
      location: "Pharmacy-A2",
      cost: 1.25
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-100 text-green-800";
      case "low": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good": return <CheckCircle className="w-4 h-4" />;
      case "low": return <TrendingDown className="w-4 h-4" />;
      case "critical": return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { title: "Total Items", value: inventory.length.toString(), color: "text-blue-600" },
    { title: "Low Stock", value: inventory.filter(i => i.status === "low").length.toString(), color: "text-yellow-600" },
    { title: "Critical", value: inventory.filter(i => i.status === "critical").length.toString(), color: "text-red-600" },
    { title: "Well Stocked", value: inventory.filter(i => i.status === "good").length.toString(), color: "text-green-600" }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => navigate("/")} className="mb-2">
              ← Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
            <p className="text-muted-foreground">Medicine stock tracking and management</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Medicine
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Medicine</DialogTitle>
                <DialogDescription>
                  Enter the details of the new medicine to add to inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Medicine Name" />
                <Input placeholder="Category" />
                <Input placeholder="Stock Quantity" type="number" />
                <Input placeholder="Minimum Stock Level" type="number" />
                <Input placeholder="Expiry Date" type="date" />
                <Input placeholder="Location" />
                <Input placeholder="Cost per Unit" type="number" step="0.01" />
                <Button className="w-full">Add Medicine</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Medicine Inventory</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search medicines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="good">Good</option>
                  <option value="low">Low Stock</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{item.stock}</span>
                        <span className="text-xs text-muted-foreground">
                          (min: {item.minStock})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)} variant="secondary">
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(item.status)}
                          <span className="capitalize">{item.status}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{item.expiry}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>${item.cost.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Reorder</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;
