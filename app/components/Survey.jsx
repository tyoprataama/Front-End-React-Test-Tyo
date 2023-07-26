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

  // State to keep track of the user's name
  const [userName, setUserName] = useState("");

  // State to keep track of whether the survey has started
  const [surveyStarted, setSurveyStarted] = useState(false);

  // State to keep track of current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // State to keep track of survey answers
  const [surveyAnswers, setSurveyAnswers] = useState([]);

  // State to manage the timer
  const [timer, setTimer] = useState(15);

  // State to track if the timer is active
  const [isTimerActive, setIsTimerActive] = useState(false);

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
    setUserName(""); // Reset the user's name
    setSurveyStarted(false); // Reset survey started status
    setSurveyAnswers([]);
    setCurrentQuestionIndex(0);
    setTimer(15);
    setIsTimerActive(false); // Reset timer activation status
    setSurveyComplete(false);
  };

  // Function to handle timer completion
  const handleTimerCompletion = () => {
    setIsTimerActive(false); // Pause the timer
    setSurveyComplete(true); // Mark the survey as complete
  };

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleTimerCompletion();
    }

    return () => clearInterval(interval);
  }, [timer, isTimerActive]);

  const canStartSurvey = userName.trim().length >= 3;
  const handleStartSurvey = () => {
    if (canStartSurvey) {
      setSurveyStarted(true);
      setIsTimerActive(true);
    }
  };

  return (
      <div>
      {!surveyStarted && (
      //    <div className="flex flex-col items-center justify-center h-screen w-screen mb-32">
      // <div className="max-w-sm p-6 bg-white border border-none rounded-lg shadow">
        <div className='className="flex flex-col items-center justify-center h-screen w-screen mb-32'>
          <div className="max-w-sm p-6 bg-white border border-none rounded-lg shadow">
          <p>Please enter your name (minimum 3 characters):</p>
          <input
            type="text"
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder = "John"
            required
          />
          <button className='text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 mt-5' onClick={handleStartSurvey} disabled={!canStartSurvey}>
            Start Survey
          </button>
        </div>
        </div>
      )}
      {surveyStarted && !surveyComplete && (
        <>
        <div className="bg-indigo-300 h-1 w-full mt-10 px-5">
        <div className="bg-indigo-500 h-full" style={{ width: `${(currentQuestionIndex + 1) / questions.length * 100}%` }} />
      </div>
      < div className = 'p-4 flex flex-col items-center justify-center' >
     <p className='max-w-sm p-6 bg-white border border-none rounded-lg shadow'>Time Left: {timer} seconds</p>
      </div>
          <Card
            questionData={questions[currentQuestionIndex]}
            onAnswerSubmit={handleAnswerSubmit}
            currentQuestionIndex={currentQuestionIndex}
            userName={userName} // Pass the userName to the Card component
          />
        </>
      )}
      {surveyComplete && (
        <End surveyAnswers={surveyAnswers} onRestart={handleRestartSurvey} userName={userName} />
      )}
    </div>
  );
       

};
export default Survey