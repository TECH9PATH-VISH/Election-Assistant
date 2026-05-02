/**
 * @file QuizResults.tsx
 * @description Sub-component for rendering the final quiz results.
 */
"use client";

import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRetake: () => void;
}

/**
 * Renders the results of the completed Interactive Quiz.
 * 
 * @param {QuizResultsProps} props - The props for the component.
 * @returns {JSX.Element} The quiz results view.
 */
export function QuizResults({ score, totalQuestions, onRetake }: QuizResultsProps) {
  const isPerfectScore = score === totalQuestions;

  return (
    <CardContent className="text-center py-8">
      <h2 className="text-3xl font-bold mb-4">
        You scored {score} out of {totalQuestions}
      </h2>
      <div className="flex justify-center mb-6">
        {isPerfectScore ? (
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        ) : (
          <CheckCircle2 className="w-16 h-16 text-blue-500" />
        )}
      </div>
      <Button onClick={onRetake}>Retake Quiz</Button>
    </CardContent>
  );
}
