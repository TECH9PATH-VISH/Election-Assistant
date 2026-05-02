"use client";

import { Button } from "@/components/ui/button";
import { CalendarDays, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function CalendarIntegration({ 
  title = "Election Day", 
  date = "2024-11-05T07:00:00", 
  description = "Remember to vote!" 
}: { 
  title?: string, 
  date?: string, 
  description?: string 
}) {
  
  const handleDownloadIcs = () => {
    // Generate a simple ICS file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Election Assistant//EN
BEGIN:VEVENT
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${title}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${title.replace(/\\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full sm:w-fit bg-primary/5 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-primary" /> Add to Calendar
        </CardTitle>
        <CardDescription>Never miss an important election deadline.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleDownloadIcs} variant="outline" className="w-full gap-2">
          <Download className="w-4 h-4" /> Download .ICS
        </Button>
      </CardContent>
    </Card>
  );
}
