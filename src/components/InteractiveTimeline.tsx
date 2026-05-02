"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  isCompleted?: boolean;
}

const events: TimelineEvent[] = [
  {
    id: "1",
    title: "Voter Registration Deadline",
    date: "October 7, 2024",
    description: "Last day to register to vote for the general election.",
    isCompleted: true,
  },
  {
    id: "2",
    title: "Early Voting Begins",
    date: "October 21, 2024",
    description: "Polling locations open for early in-person voting.",
    isCompleted: true,
  },
  {
    id: "3",
    title: "Absentee Ballot Request Deadline",
    date: "October 25, 2024",
    description: "Last day to request an absentee ballot by mail.",
    isCompleted: false,
  },
  {
    id: "4",
    title: "Election Day",
    date: "November 5, 2024",
    description: "Polls open at 7:00 AM and close at 8:00 PM.",
    isCompleted: false,
  },
];

export function InteractiveTimeline() {
  return (
    <div className="relative border-l border-muted-foreground/30 ml-3 md:ml-6 space-y-8 py-8">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative pl-8 md:pl-12"
        >
          <div className="absolute -left-[1.35rem] md:-left-[1.4rem] top-1 bg-background p-1 rounded-full">
            {event.isCompleted ? (
              <CheckCircle2 className="w-6 h-6 text-primary" />
            ) : (
              <Circle className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-col gap-1 p-5 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow hover:border-primary/50 group">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {event.date}
            </span>
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {event.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
