import React, { useState, memo, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Patient {
  id: number;
  name: string;
  queue: string;
  isEmergency?: boolean;
}

const Queue: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: 'John Doe', queue: 'Triage' },
    { id: 2, name: 'Jane Smith', queue: 'Doctor', isEmergency: true },
    { id: 3, name: 'Bob Johnson', queue: 'Pharmacy' },
    { id: 4, name: 'Mike Williams', queue: 'Doctor' },
  ]);
  const [newPatientName, setNewPatientName] = useState('');
  const [selectedQueue, setSelectedQueue] = useState('Triage');

  const addPatient = () => {
    if (newPatientName.trim() !== '') {
      const newPatient: Patient = {
        id: Math.floor(Math.random() * 1000) + 1,
        name: newPatientName,
        queue: selectedQueue,
      };
      setPatients([...patients, newPatient]);
      setNewPatientName('');
    }
  };

  const callNextPatient = (queue: string) => {
    const patientIndex = patients.findIndex((p) => p.queue === queue);
    if (patientIndex !== -1) {
      const newPatients = [...patients];
      newPatients.splice(patientIndex, 1);
      setPatients(newPatients);
    }
  };

  const triageQueue = useMemo(() => patients.filter((p) => p.queue === 'Triage'), [patients]);
  const doctorQueue = useMemo(() => patients.filter((p) => p.queue === 'Doctor').sort((a, b) => {
    if (a.isEmergency && !b.isEmergency) return -1;
    if (!a.isEmergency && b.isEmergency) return 1;
    return 0;
  }), [patients]);
  const pharmacyQueue = useMemo(() => patients.filter((p) => p.queue === 'Pharmacy'), [patients]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Patient Queues</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QueueColumn title="Triage" queue={triageQueue} onCallNext={() => callNextPatient('Triage')} />
        <QueueColumn title="Doctor" queue={doctorQueue} onCallNext={() => callNextPatient('Doctor')} />
        <QueueColumn title="Pharmacy" queue={pharmacyQueue} onCallNext={() => callNextPatient('Pharmacy')} />
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Add Patient to Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <Label htmlFor="patient-name">Patient Name</Label>
              <Input
                id="patient-name"
                value={newPatientName}
                onChange={(e) => setNewPatientName(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="queue-select">Select Queue</Label>
              <select
                id="queue-select"
                value={selectedQueue}
                onChange={(e) => setSelectedQueue(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="Triage">Triage</option>
                <option value="Doctor">Doctor</option>
                <option value="Pharmacy">Pharmacy</option>
              </select>
            </div>
          </div>
          <Button onClick={addPatient} className="mt-4">Add Patient</Button>
        </CardContent>
      </Card>
    </div>
  );
};

interface QueueColumnProps {
  title: string;
  queue: Patient[];
  onCallNext: () => void;
}

const QueueColumn: React.FC<QueueColumnProps> = memo(({ title, queue, onCallNext }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title} Queue</CardTitle>
      </CardHeader>
      <CardContent>
        {queue.length > 0 ? (
          <ul>
            {queue.map((patient) => (
              <li key={patient.id} className="p-2 border-b">
                {patient.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No patients in the queue.</p>
        )}
        <Button onClick={onCallNext} className="mt-4" disabled={queue.length === 0}>
          Call Next Patient
        </Button>
      </CardContent>
    </Card>
  );
});

export default Queue;
