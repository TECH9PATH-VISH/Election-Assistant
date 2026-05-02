/**
 * @file WizardStepRegistration.tsx
 * @description Sub-component for the first step of the Election Wizard.
 */
"use client";

import { useWizardStore } from "@/hooks/useWizardStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

/**
 * Renders the Registration step of the wizard.
 * @returns {JSX.Element} Registration step component.
 */
export function WizardStepRegistration() {
  const { data, updateData, nextStep } = useWizardStore();

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="absolute inset-0"
    >
      <Card className="h-full flex flex-col border-primary/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Voter Registration</CardTitle>
          <CardDescription>Are you currently registered to vote at your current address?</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col gap-4 justify-center">
          <Button
            variant={data.isRegistered === true ? "default" : "outline"}
            className="h-14 text-lg"
            onClick={() => updateData({ isRegistered: true })}
          >
            Yes, I am registered
          </Button>
          <Button
            variant={data.isRegistered === false ? "default" : "outline"}
            className="h-14 text-lg"
            onClick={() => updateData({ isRegistered: false })}
          >
            No, or I'm not sure
          </Button>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled={data.isRegistered === null} onClick={nextStep} className="gap-2">
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
