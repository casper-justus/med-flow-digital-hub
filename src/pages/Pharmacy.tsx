import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Prescription {
  id: number;
  patientName: string;
  medication: string;
  dosage: string;
  status: 'Pending' | 'Dispensed';
}

const Pharmacy: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    { id: 1, patientName: 'John Doe', medication: 'Lisinopril', dosage: '10mg', status: 'Pending' },
    { id: 2, patientName: 'Jane Smith', medication: 'Metformin', dosage: '500mg', status: 'Pending' },
  ]);

  const handleDispense = (prescriptionId: number) => {
    setPrescriptions(
      prescriptions.map((p) =>
        p.id === prescriptionId ? { ...p, status: 'Dispensed' } : p
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Pharmacy</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pending Prescriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.patientName}</TableCell>
                  <TableCell>{p.medication}</TableCell>
                  <TableCell>{p.dosage}</TableCell>
                  <TableCell>{p.status}</TableCell>
                  <TableCell>
                    {p.status === 'Pending' && (
                      <Button onClick={() => handleDispense(p.id)}>Dispense</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pharmacy;
