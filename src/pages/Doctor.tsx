import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const Doctor: React.FC = () => {
  const [patient, setPatient] = useState({
    id: 'PAT001',
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    vitals: {
      height: '6\'0"',
      weight: '180 lbs',
      bloodPressure: '120/80 mmHg',
      temperature: '98.6°F',
    },
    notes: '',
  });

  const [labOrder, setLabOrder] = useState('');
  const [radiologyOrder, setRadiologyOrder] = useState('');
  const [prescription, setPrescription] = useState('');

  const handleOrderLabs = () => {
    // Logic to order labs
    console.log('Ordering labs:', labOrder);
  };

  const handleOrderRadiology = () => {
    // Logic to order radiology
    console.log('Ordering radiology:', radiologyOrder);
  };

  const handlePrescribe = () => {
    // Logic to prescribe medication
    console.log('Prescribing:', prescription);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Doctor's Consultation</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>ID:</strong> {patient.id}</p>
              <p><strong>Name:</strong> {patient.name}</p>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Gender:</strong> {patient.gender}</p>
              <h3 className="font-bold mt-4">Vitals</h3>
              <ul>
                <li><strong>Height:</strong> {patient.vitals.height}</li>
                <li><strong>Weight:</strong> {patient.vitals.weight}</li>
                <li><strong>Blood Pressure:</strong> {patient.vitals.bloodPressure}</li>
                <li><strong>Temperature:</strong> {patient.vitals.temperature}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={patient.notes}
                onChange={(e) => setPatient({ ...patient, notes: e.target.value })}
                rows={10}
              />
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Labs</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="lab-order">Lab Order</Label>
                <Input
                  id="lab-order"
                  value={labOrder}
                  onChange={(e) => setLabOrder(e.target.value)}
                />
                <Button onClick={handleOrderLabs} className="mt-4 w-full">Order</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Order Radiology</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="radiology-order">Radiology Order</Label>
                <Input
                  id="radiology-order"
                  value={radiologyOrder}
                  onChange={(e) => setRadiologyOrder(e.target.value)}
                />
                <Button onClick={handleOrderRadiology} className="mt-4 w-full">Order</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Prescribe Medication</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="prescription">Prescription</Label>
                <Input
                  id="prescription"
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                />
                <Button onClick={handlePrescribe} className="mt-4 w-full">Prescribe</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
