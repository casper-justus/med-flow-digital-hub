import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Patient {
  id: number;
  name: string;
  isEmergency?: boolean;
  notes?: string;
  vitals?: {
    height: string;
    weight: string;
    bloodPressure: string;
    temperature: string;
  };
  assignedDoctor?: string;
}

const Triage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleAssignDoctor = () => {
    if (selectedPatient) {
      // Logic to assign doctor and move patient to doctor's queue
      console.log(`Assigning ${selectedPatient.name} to doctor ${selectedPatient.assignedDoctor}`);
      console.log('Patient data:', selectedPatient);
      // Remove patient from triage list
      setPatients(patients.filter(p => p.id !== selectedPatient.id));
      setSelectedPatient(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Triage</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Waiting for Triage</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {patients.map((patient) => (
                  <li
                    key={patient.id}
                    className={`p-2 border-b cursor-pointer ${selectedPatient?.id === patient.id ? 'bg-gray-200' : ''}`}
                    onClick={() => handleSelectPatient(patient)}
                  >
                    {patient.name}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          {selectedPatient && (
            <Card>
              <CardHeader>
                <CardTitle>Triage for {selectedPatient.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height">Height</Label>
                    <Input id="height" placeholder="e.g., 6'0&quot;" />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight</Label>
                    <Input id="weight" placeholder="e.g., 180 lbs" />
                  </div>
                  <div>
                    <Label htmlFor="bp">Blood Pressure</Label>
                    <Input id="bp" placeholder="e.g., 120/80 mmHg" />
                  </div>
                  <div>
                    <Label htmlFor="temp">Temperature</Label>
                    <Input id="temp" placeholder="e.g., 98.6°F" />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Enter any notes here..." />
                </div>
                <div className="mt-4">
                  <Label htmlFor="doctor">Assign Doctor</Label>
                  <Input id="doctor" placeholder="Enter doctor's name" onChange={(e) => setSelectedPatient({...selectedPatient, assignedDoctor: e.target.value})} />
                </div>
                <div className="flex items-center mt-4">
                  <Input type="checkbox" id="emergency" className="mr-2" onChange={(e) => setSelectedPatient({...selectedPatient, isEmergency: e.target.checked})} />
                  <Label htmlFor="emergency">Mark as Emergency</Label>
                </div>
                <Button onClick={handleAssignDoctor} className="mt-4 w-full">
                  Assign to Doctor
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Triage;
