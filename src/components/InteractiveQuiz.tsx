"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle } from "lucide-react";

const questions = [
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

export function InteractiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerOptionClick = (option: string) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

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
        <CardContent className="text-center py-8">
          <h2 className="text-3xl font-bold mb-4">
            You scored {score} out of {questions.length}
          </h2>
          <div className="flex justify-center mb-6">
            {score === questions.length ? (
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            ) : (
              <CheckCircle2 className="w-16 h-16 text-blue-500" />
            )}
          </div>
          <Button onClick={resetQuiz}>Retake Quiz</Button>
        </CardContent>
      ) : (
        <>
          <CardContent>
            <div className="mb-4 flex justify-between items-center text-sm font-medium text-muted-foreground">
              <span>Question {currentQuestion + 1}/{questions.length}</span>
              <span>Score: {score}</span>
            </div>
            <Progress value={((currentQuestion) / questions.length) * 100} className="mb-6" />
            
            <h3 className="text-xl font-semibold mb-6">{questions[currentQuestion].question}</h3>
            
            <div className="flex flex-col gap-3">
              {questions[currentQuestion].options.map((option) => (
                <Button
                  key={option}
                  variant={selectedOption === option ? (option === questions[currentQuestion].answer ? "default" : "destructive") : "outline"}
                  className={`justify-start h-12 px-6 text-left ${isAnswered && option === questions[currentQuestion].answer ? "bg-green-600 hover:bg-green-700 text-white border-green-600" : ""}`}
                  onClick={() => handleAnswerOptionClick(option)}
                  disabled={isAnswered && selectedOption !== option && option !== questions[currentQuestion].answer}
                >
                  {option}
                  {isAnswered && option === questions[currentQuestion].answer && <CheckCircle2 className="ml-auto w-4 h-4" />}
                  {isAnswered && selectedOption === option && option !== questions[currentQuestion].answer && <XCircle className="ml-auto w-4 h-4" />}
                </Button>
              ))}
            </div>
          </CardContent>
          {isAnswered && (
            <CardFooter className="justify-end">
              <Button onClick={handleNextQuestion}>
                {currentQuestion + 1 === questions.length ? "See Results" : "Next Question"}
              </Button>
            </CardFooter>
          )}
        </>
      )}
    </Card>
  );
}
