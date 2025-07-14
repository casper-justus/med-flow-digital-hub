import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Patient {
  id: number;
  name: string;
  status: 'Waiting for Triage' | 'In Triage' | 'Waiting for Doctor' | 'With Doctor' | 'Waiting for Pharmacy' | 'In Pharmacy' | 'Done';
}

const Reception: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: 'John Doe', status: 'Waiting for Triage' },
    { id: 2, name: 'Jane Smith', status: 'With Doctor' },
  ]);

  const handleMovePatient = (patientId: number, nextStatus: Patient['status']) => {
    setPatients(
      patients.map((p) =>
        p.id === patientId ? { ...p, status: nextStatus } : p
      )
    );
  };

  const getNextStatus = (currentStatus: Patient['status']): Patient['status'] | null => {
    switch (currentStatus) {
      case 'Waiting for Triage':
        return 'In Triage';
      case 'In Triage':
        return 'Waiting for Doctor';
      case 'Waiting for Doctor':
        return 'With Doctor';
      case 'With Doctor':
        return 'Waiting for Pharmacy';
      case 'Waiting for Pharmacy':
        return 'In Pharmacy';
      case 'In Pharmacy':
        return 'Done';
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reception</h1>
      <Card>
        <CardHeader>
          <CardTitle>Patient Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((p) => {
                const nextStatus = getNextStatus(p.status);
                return (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.status}</TableCell>
                    <TableCell>
                      {nextStatus && (
                        <Button onClick={() => handleMovePatient(p.id, nextStatus)}>
                          Move to {nextStatus}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reception;
