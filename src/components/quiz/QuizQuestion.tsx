/**
 * @file QuizQuestion.tsx
 * @description Sub-component for rendering a single quiz question and its options.
 */
"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle } from "lucide-react";

export interface QuestionData {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface QuizQuestionProps {
  question: QuestionData;
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  selectedOption: string | null;
  isAnswered: boolean;
  onAnswerClick: (option: string) => void;
  onNextClick: () => void;
}

/**
 * Renders the active question of the Interactive Quiz.
 * 
 * @param {QuizQuestionProps} props - The props for the component.
 * @returns {JSX.Element} The quiz question view.
 */
export function QuizQuestion({
  question,
  currentQuestionIndex,
  totalQuestions,
  score,
  selectedOption,
  isAnswered,
  onAnswerClick,
  onNextClick
}: QuizQuestionProps) {
  return (
    <>
      <CardContent>
        <div className="mb-4 flex justify-between items-center text-sm font-medium text-muted-foreground">
          <span>Question {currentQuestionIndex + 1}/{totalQuestions}</span>
          <span>Score: {score}</span>
        </div>
        <Progress value={(currentQuestionIndex / totalQuestions) * 100} className="mb-6" />
        
        <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
        
        <div className="flex flex-col gap-3">
          {question.options.map((option) => (
            <Button
              key={option}
              variant={selectedOption === option ? (option === question.answer ? "default" : "destructive") : "outline"}
              className={`justify-start h-12 px-6 text-left ${isAnswered && option === question.answer ? "bg-green-600 hover:bg-green-700 text-white border-green-600" : ""}`}
              onClick={() => onAnswerClick(option)}
              disabled={isAnswered && selectedOption !== option && option !== question.answer}
            >
              {option}
              {isAnswered && option === question.answer && <CheckCircle2 className="ml-auto w-4 h-4" />}
              {isAnswered && selectedOption === option && option !== question.answer && <XCircle className="ml-auto w-4 h-4" />}
            </Button>
          ))}
        </div>
      </CardContent>
      {isAnswered && (
        <CardFooter className="justify-end">
          <Button onClick={onNextClick}>
            {currentQuestionIndex + 1 === totalQuestions ? "See Results" : "Next Question"}
          </Button>
        </CardFooter>
      )}
    </>
  );
}
