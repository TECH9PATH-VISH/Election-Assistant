/**
 * @file InteractiveQuiz.tsx
 * @description Main component for the Election Knowledge Quiz.
 */
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QuizQuestion, QuestionData } from "./quiz/QuizQuestion";
import { QuizResults } from "./quiz/QuizResults";

const questions: QuestionData[] = [
  {
    id: 1,
    question: "When is Election Day in 2024?",
    options: ["November 4", "November 5", "November 12", "October 31"],
    answer: "November 5",
  },
  {
    id: 2,
    question: "Can you register to vote on Election Day in all states?",
    options: ["Yes", "No", "Only if you have an ID", "Only for local elections"],
    answer: "No",
  },
  {
    id: 3,
    question: "What is the minimum voting age in the US?",
    options: ["16", "18", "21", "25"],
    answer: "18",
  }
];

/**
 * InteractiveQuiz Component
 * 
 * Renders an educational quiz about elections.
 * Orchestrates state between questions and results.
 * 
 * @returns {JSX.Element} The rendered quiz component.
 */
export function InteractiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  /**
   * Handles user selecting an answer option.
   * 
   * @param {string} option - The selected answer text.
   */
  const handleAnswerOptionClick = (option: string) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  /**
   * Advances the quiz to the next question or shows results if finished.
   */
  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  /**
   * Resets the quiz state back to the beginning.
   */
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle>Election Knowledge Quiz</CardTitle>
        <CardDescription>Test your knowledge about the upcoming elections.</CardDescription>
      </CardHeader>
      
      {showScore ? (
        <QuizResults 
          score={score} 
          totalQuestions={questions.length} 
          onRetake={resetQuiz} 
        />
      ) : (
        <QuizQuestion 
          question={questions[currentQuestion]}
          currentQuestionIndex={currentQuestion}
          totalQuestions={questions.length}
          score={score}
          selectedOption={selectedOption}
          isAnswered={isAnswered}
          onAnswerClick={handleAnswerOptionClick}
          onNextClick={handleNextQuestion}
        />
      )}
    </Card>
  );
}
