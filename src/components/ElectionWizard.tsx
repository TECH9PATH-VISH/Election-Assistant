"use client";

import { useWizardStore } from "@/hooks/useWizardStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";

export function ElectionWizard() {
  const { step, data, updateData, nextStep, prevStep, reset } = useWizardStore();

  const handleNext = () => nextStep();
  const handlePrev = () => prevStep();

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
          {step === 1 && (
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
                  <Button disabled={data.isRegistered === null} onClick={handleNext} className="gap-2">
                    Next <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
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
                  <Button variant="ghost" onClick={handlePrev} className="gap-2">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button disabled={data.votingMethod === null} onClick={handleNext} className="gap-2">
                    Next <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute inset-0"
            >
              <Card className="h-full flex flex-col border-primary/20 shadow-xl bg-gradient-to-br from-card to-primary/5">
                <CardHeader>
                  <CardTitle className="text-2xl">Your Voting Plan</CardTitle>
                  <CardDescription>Based on your answers, here is what you need to do.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  {!data.isRegistered && (
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive-foreground">
                      <h4 className="font-semibold flex items-center gap-2"><Check className="w-4 h-4"/> Action Required</h4>
                      <p className="text-sm mt-1">You must register to vote before the deadline. Visit vote.gov immediately to register.</p>
                    </div>
                  )}
                  {data.votingMethod === "mail" && (
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300">
                      <h4 className="font-semibold flex items-center gap-2"><Check className="w-4 h-4"/> Request Ballot</h4>
                      <p className="text-sm mt-1">Ensure you request your mail-in ballot early and check signature requirements.</p>
                    </div>
                  )}
                  {data.votingMethod === "in-person" && (
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-300">
                      <h4 className="font-semibold flex items-center gap-2"><Check className="w-4 h-4"/> Find Polling Place</h4>
                      <p className="text-sm mt-1">Locate your polling place and check required ID to bring.</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" onClick={handlePrev} className="gap-2">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button onClick={reset} variant="secondary">Start Over</Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
