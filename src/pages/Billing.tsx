
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  User, 
  FileText, 
  Download,
  Plus,
  Search,
  CheckCircle,
  AlertCircle,
  Clock,
  Receipt
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Billing = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [newBill, setNewBill] = useState({
    patientName: "",
    patientId: "",
    services: "",
    totalAmount: "",
    insuranceProvider: "Self Pay",
    dueDate: ""
  });
  const [bills, setBills] = useState([
    {
      id: "BILL001",
      patientName: "John Smith",
      patientId: "PAT001",
      billDate: "2024-07-15",
      services: ["Consultation", "X-Ray", "Lab Tests"],
      totalAmount: 450.00,
      paidAmount: 450.00,
      balance: 0.00,
      status: "paid",
      paymentMethod: "Insurance + Cash",
      insuranceProvider: "HealthCare Plus",
      dueDate: "2024-07-25"
    },
    {
      id: "BILL002",
      patientName: "Mary Davis",
      patientId: "PAT002",
      billDate: "2024-07-14",
      services: ["MRI Scan", "Consultation"],
      totalAmount: 1200.00,
      paidAmount: 800.00,
      balance: 400.00,
      status: "partial",
      paymentMethod: "Insurance",
      insuranceProvider: "MediCare Pro",
      dueDate: "2024-07-24"
    },
    {
      id: "BILL003",
      patientName: "Robert Brown",
      patientId: "PAT003",
      billDate: "2024-07-15",
      services: ["Emergency Care", "CT Scan", "Medications"],
      totalAmount: 2500.00,
      paidAmount: 0.00,
      balance: 2500.00,
      status: "pending",
      paymentMethod: "Not Set",
      insuranceProvider: "Self Pay",
      dueDate: "2024-07-30"
    },
    {
      id: "BILL004",
      patientName: "Lisa Wilson",
      patientId: "PAT004",
      billDate: "2024-07-12",
      services: ["Ultrasound", "Consultation"],
      totalAmount: 300.00,
      paidAmount: 0.00,
      balance: 300.00,
      status: "overdue",
      paymentMethod: "Not Set",
      insuranceProvider: "Quick Health",
      dueDate: "2024-07-22"
    }
  ]);

  const paymentMethods = [
    { name: "Cash", percentage: 25, amount: 12500 },
    { name: "Credit Card", percentage: 35, amount: 17500 },
    { name: "Insurance", percentage: 30, amount: 15000 },
    { name: "Bank Transfer", percentage: 10, amount: 5000 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "partial": return "bg-yellow-100 text-yellow-800";
      case "pending": return "bg-blue-100 text-blue-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return <CheckCircle className="w-4 h-4" />;
      case "partial": return <Clock className="w-4 h-4" />;
      case "pending": return <AlertCircle className="w-4 h-4" />;
      case "overdue": return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredBills = bills.filter(bill => 
    bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = bills.reduce((sum, bill) => sum + bill.paidAmount, 0);
  const totalOutstanding = bills.reduce((sum, bill) => sum + bill.balance, 0);

  const createBill = () => {
    if (newBill.patientName && newBill.patientId && newBill.services && newBill.totalAmount && newBill.dueDate) {
      const newBillData = {
        ...newBill,
        id: `BILL${String(bills.length + 1).padStart(3, '0')}`,
        services: newBill.services.split(",").map(s => s.trim()),
        totalAmount: parseFloat(newBill.totalAmount),
        paidAmount: 0,
        balance: parseFloat(newBill.totalAmount),
        status: "pending",
        paymentMethod: "Not Set"
      };
      setBills([...bills, newBillData]);
      setNewBill({
        patientName: "",
        patientId: "",
        services: "",
        totalAmount: "",
        insuranceProvider: "Self Pay",
        dueDate: ""
      });
    }
  };

  const payBill = (billId: string) => {
    const newBills = bills.map(bill => {
      if (bill.id === billId) {
        return {
          ...bill,
          paidAmount: bill.totalAmount,
          balance: 0,
          status: "paid"
        };
      }
      return bill;
    });
    setBills(newBills);
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
            <h1 className="text-3xl font-bold text-foreground">Billing & Payments</h1>
            <p className="text-muted-foreground">Financial management and payment processing</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Bill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Bill</DialogTitle>
                <DialogDescription>
                  Generate a new bill for patient services.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Patient Name" value={newBill.patientName} onChange={(e) => setNewBill({...newBill, patientName: e.target.value})} />
                <Input placeholder="Patient ID" value={newBill.patientId} onChange={(e) => setNewBill({...newBill, patientId: e.target.value})} />
                <Input placeholder="Services (comma separated)" value={newBill.services} onChange={(e) => setNewBill({...newBill, services: e.target.value})} />
                <Input placeholder="Total Amount" type="number" step="0.01" value={newBill.totalAmount} onChange={(e) => setNewBill({...newBill, totalAmount: e.target.value})} />
                <select className="w-full px-3 py-2 border rounded-md" value={newBill.insuranceProvider} onChange={(e) => setNewBill({...newBill, insuranceProvider: e.target.value})}>
                  <option>HealthCare Plus</option>
                  <option>MediCare Pro</option>
                  <option>Quick Health</option>
                  <option>Self Pay</option>
                </select>
                <Input placeholder="Due Date" type="date" value={newBill.dueDate} onChange={(e) => setNewBill({...newBill, dueDate: e.target.value})} />
                <Button className="w-full" onClick={createBill}>Create Bill</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Financial Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${totalRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Revenue</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  ${totalOutstanding.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Outstanding</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {bills.filter(b => b.status === "paid").length}
                </div>
                <div className="text-sm text-muted-foreground">Paid Bills</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {bills.filter(b => b.status === "overdue").length}
                </div>
                <div className="text-sm text-muted-foreground">Overdue</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bills Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Receipt className="h-5 w-5" />
                    <span>Patient Bills</span>
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search bills..."
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
                      <TableHead>Services</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Paid</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBills.map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{bill.patientName}</div>
                            <div className="text-xs text-muted-foreground">{bill.patientId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {bill.services.join(", ")}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          ${bill.totalAmount.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-green-600">
                          ${bill.paidAmount.toFixed(2)}
                        </TableCell>
                        <TableCell className={bill.balance > 0 ? "text-red-600" : "text-green-600"}>
                          ${bill.balance.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(bill.status)} variant="secondary">
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(bill.status)}
                              <span className="capitalize">{bill.status}</span>
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm">{bill.dueDate}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button variant="outline" size="sm">
                              <Download className="w-3 h-3" />
                            </Button>
                            {bill.balance > 0 && (
                              <Button variant="outline" size="sm" onClick={() => payBill(bill.id)}>
                                Pay
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

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Payment Methods</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {method.percentage}%
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${method.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm font-medium">
                      ${method.amount.toLocaleString()}
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
                Create Invoice
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <DollarSign className="h-6 w-6 mb-2" />
                Process Payment
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="h-6 w-6 mb-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <AlertCircle className="h-6 w-6 mb-2" />
                Send Reminders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Billing;
