/**
 * @file ElectionWizard.tsx
 * @description Parent component for the Election Step-by-Step Wizard. 
 * Orchestrates the flow between registration, method, and plan sub-components.
 */
"use client";

import { useWizardStore } from "@/hooks/useWizardStore";
import { AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { WizardStepRegistration } from "./wizard/WizardStepRegistration";
import { WizardStepMethod } from "./wizard/WizardStepMethod";
import { WizardStepPlan } from "./wizard/WizardStepPlan";

/**
 * ElectionWizard Component
 * 
 * Renders the multi-step form guiding users through the voting process.
 * Uses `zustand` for state management and `framer-motion` for transitions.
 * 
 * @returns {JSX.Element} The rendered Election Wizard.
 */
export function ElectionWizard() {
  const { step } = useWizardStore();

  return (
    <div className="w-full max-w-2xl mx-auto my-8 relative">
      <div className="flex justify-between items-center mb-8 px-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center gap-2 relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                step >= s
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step > s ? <Check className="w-5 h-5" /> : s}
            </div>
          </div>
        ))}
        {/* Progress bar background */}
        <div className="absolute top-5 left-10 right-10 h-1 bg-muted -z-0">
          <div
            className="h-full bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
        </div>
      </div>

      <div className="relative overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait">
          {step === 1 && <WizardStepRegistration key="step1" />}
          {step === 2 && <WizardStepMethod key="step2" />}
          {step === 3 && <WizardStepPlan key="step3" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
