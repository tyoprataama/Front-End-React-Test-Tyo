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

  // State to keep track of current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // State to keep track of survey answers
  const [surveyAnswers, setSurveyAnswers] = useState([]);

  // State to manage the timer
  const [timer, setTimer] = useState(15);

  // State to track if the timer is active
  const [timerActive, setTimerActive] = useState(true);

  // State to track if the survey is complete
  const [surveyComplete, setSurveyComplete] = useState(false);

  // Function to handle the answer submission
  const handleAnswerSubmit = (selectedAnswer) => {
    setSurveyAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId: questions[currentQuestionIndex].id, selectedAnswer },
    ]);

    // Move to the next question
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // If it's the last question, end the survey
      setSurveyComplete(true);
    }
  };
  // Function to restart the survey
  const handleRestartSurvey = () => {
    setSurveyAnswers([]);
    setCurrentQuestionIndex(0);
    setTimer(15);
    setTimerActive(true);
    setSurveyComplete(false);
  };

  // Function to handle timer completion
  const handleTimerCompletion = () => {
    setTimerActive(false); // Pause the timer
    setSurveyComplete(true); // Mark the survey as complete
  };

  useEffect(() => {
    let interval;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleTimerCompletion();
    }

    return () => clearInterval(interval);
  }, [timer, timerActive]);

  return (
    <div>
      <div className="bg-indigo-300 h-1 w-full mt-10 px-5">
              <div className="bg-indigo-500 h-full" style={{ width: `${(currentQuestionIndex + 1) / questions.length * 100}%` }} />
            </div>
      {surveyComplete ? (
        <End surveyAnswers={surveyAnswers} onRestart={handleRestartSurvey} />
      ) : (
        <>
        <div className='p-4 flex flex-col items-center justify-center'>
            <p className='max-w-sm p-6 bg-white border border-none rounded-lg shadow'>Time Left: {timer} seconds</p>
          </div>
          <Card
            questionData={questions[currentQuestionIndex]}
            onAnswerSubmit={handleAnswerSubmit}
            currentQuestionIndex={currentQuestionIndex}
          />
        </>
      )}
    </div>
  )
};
export default Survey