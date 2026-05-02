/**
 * @file WizardStepPlan.tsx
 * @description Sub-component for the final step of the Election Wizard.
 */
"use client";

import { useWizardStore } from "@/hooks/useWizardStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle2 } from "lucide-react";

/**
 * Renders the Final Plan step of the wizard.
 * @returns {JSX.Element} Plan step component.
 */
export function WizardStepPlan() {
  const { data, prevStep } = useWizardStore();

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="absolute inset-0"
    >
      <Card className="h-full flex flex-col border-primary/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Your Voting Plan</CardTitle>
          <CardDescription>Review your personalized election readiness checklist.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col gap-4">
          <div className="bg-muted p-6 rounded-lg space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className={`w-6 h-6 ${data.isRegistered ? "text-green-500" : "text-amber-500"}`} />
              <div>
                <h4 className="font-semibold">Registration Status</h4>
                <p className="text-sm text-muted-foreground">
                  {data.isRegistered 
                    ? "You are registered to vote." 
                    : "You need to verify your registration status or register ASAP."}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <div>
                <h4 className="font-semibold">Voting Method</h4>
                <p className="text-sm text-muted-foreground">
                  {data.votingMethod === "in-person" 
                    ? "You plan to vote in-person. Find your polling location below." 
                    : "You plan to vote by mail. Ensure you request your absentee ballot before the deadline."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={prevStep} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            Save My Plan
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
