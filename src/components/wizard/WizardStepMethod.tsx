/**
 * @file WizardStepMethod.tsx
 * @description Sub-component for the second step of the Election Wizard.
 */
"use client";

import { useWizardStore } from "@/hooks/useWizardStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

/**
 * Renders the Voting Method step of the wizard.
 * @returns {JSX.Element} Voting method step component.
 */
export function WizardStepMethod() {
  const { data, updateData, nextStep, prevStep } = useWizardStore();

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="absolute inset-0"
    >
      <Card className="h-full flex flex-col border-primary/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Voting Method</CardTitle>
          <CardDescription>How do you plan to cast your ballot?</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col gap-4 justify-center">
          <Button
            variant={data.votingMethod === "in-person" ? "default" : "outline"}
            className="h-14 text-lg"
            onClick={() => updateData({ votingMethod: "in-person" })}
          >
            In-Person on Election Day
          </Button>
          <Button
            variant={data.votingMethod === "mail" ? "default" : "outline"}
            className="h-14 text-lg"
            onClick={() => updateData({ votingMethod: "mail" })}
          >
            By Mail / Absentee
          </Button>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={prevStep} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          <Button disabled={data.votingMethod === null} onClick={nextStep} className="gap-2">
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
