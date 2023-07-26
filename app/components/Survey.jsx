'use client'
import React, {
  useState,
  useEffect
} from 'react';
import Card from './Card';
import End from './End';
import { questionDetails } from './Question';


const Survey = () => {
  const questions = questionDetails;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState(() => {
    // Load previous answers from local storage, if available
    const storedAnswers = localStorage.getItem("surveyAnswers");
    return storedAnswers ? JSON.parse(storedAnswers) : [];
  });

  useEffect(() => {
    // Save survey answers to local storage whenever they change
    localStorage.setItem("surveyAnswers", JSON.stringify(surveyAnswers));
  }, [surveyAnswers]);

  const handleAnswerSubmit = (selectedAnswer) => {
    setSurveyAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: questions[currentQuestionIndex].id,
        selectedAnswer
      },
    ]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleRestartSurvey = () => {
    setSurveyAnswers([]);
    setCurrentQuestionIndex(0);
  };
   const currentQuestionData = questions[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

    return ( 
      
        <div className="flex flex-col items-center justify-center h-screen w-screen px-5 py-3">
          <div className="bg-indigo-300 h-1 w-full mt-4">
        <div className="bg-indigo-500 h-full" style={{ width: `${progressPercent}%` }} />
      </div>
 {currentQuestionIndex < questions.length ? (
        <Card
          questionData={currentQuestionData}
          onAnswerSubmit={handleAnswerSubmit}
          currentQuestionIndex={currentQuestionIndex}
        />
      ) : (
        <End surveyAnswers={surveyAnswers} onRestart={handleRestartSurvey} />
      )}
    </div>
    )
}
export default Survey