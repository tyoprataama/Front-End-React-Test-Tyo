'use client'
import React, {
  useState,
  useEffect
} from 'react';
import Card from './Card';
import End from './End';


const Survey = () => {
  const questions = [{
      num: 'Q1',
      question: 'How often do you shop online?',
      options: ['Rarely', 'Sometimes', 'Frequently'],
      isLocked: false,
    },
    {
      num: 'Q2',
      question: 'How often do you shop offline?',
      options: ['Rarely', 'Sometimes', 'Frequently'],
      isLocked: false,
    },
    {
      num: 'Q3',
      question: 'How often do you shop hybrid?',
      options: ['Rarely', 'Sometimes', 'Frequently'],
      isLocked: false,
    },
    {
      num: 'Q4',
      question: 'How often do you shop paypall?',
      options: ['Rarely', 'Sometimes', 'Frequently'],
      isLocked: false,
    },
  ];

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

    return ( 
        <div className="flex flex-col items-center justify-center h-screen w-screen">
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