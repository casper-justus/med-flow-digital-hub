import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);
  const navigate = useNavigate();

  const issueTicket = () => {
    const newTicketNumber = Math.floor(Math.random() * 1000) + 1;
    setTicketNumber(newTicketNumber);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Welcome to the Hospital</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {ticketNumber ? (
            <div className="text-center">
              <p className="text-lg">Your ticket number is:</p>
              <p className="text-4xl font-bold">{ticketNumber}</p>
            </div>
          ) : (
            <Button onClick={issueTicket}>Get a Ticket</Button>
          )}
          <Button onClick={() => navigate('/reception')} variant="outline">Go to Reception</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
