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
  const [timer, setTimer] = useState(60);

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
    setUserName(""); 
    setSurveyStarted(false); 
    setSurveyAnswers([]);
    setCurrentQuestionIndex(0);
    setTimer(60);
    setIsTimerActive(false); 
    setSurveyComplete(false);
  };

  // Function to handle timer completion
  const handleTimerCompletion = () => {
    setIsTimerActive(false);
    setSurveyComplete(true);
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

   // Function to handle survey completion
   const handleSurveyCompletion = () => {
     // Log the user's name and survey answers to the console
     console.log("User Name:", userName);
     console.log("Survey Answers:", surveyAnswers);
   };

   // Use useEffect to log data when the survey is complete
   useEffect(() => {
     if (surveyComplete) {
       handleSurveyCompletion();
     }
   }, [surveyComplete]);

  return (
      <div>
      {!surveyStarted && (
        <div className="flex flex-col items-center justify-center h-screen">
  <div className="max-w-sm p-6 bg-white border border-none rounded-lg shadow">
    <p>Please enter your name <span className='text-rose-600 font-semibold'> (minimum 3 characters):</span></p>
    <input
      type="text"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
      placeholder="John"
      required
    />
    <button
      className="cursor-pointer text-white bg-violet-700 hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 mt-2"
      onClick={handleStartSurvey}
      disabled={!canStartSurvey}
    >
      Start Survey
    </button>
  </div>
</div>
      )}
      {surveyStarted && !surveyComplete && (
        <>
          <div className="p-4 flex flex-col items-center justify-center gap-4 h-screen">
            <div className="bg-indigo-300 h-1 w-full">
              <div className="bg-indigo-500 h-full" style={{ width: `${(currentQuestionIndex + 1) / questions.length * 100}%` }} />
            </div>
          <p className='max-w-sm p-6 bg-white border border-none rounded-lg shadow mt-10'>Time Left: {timer} seconds</p>
    <Card
      questionData={questions[currentQuestionIndex]}
      onAnswerSubmit={handleAnswerSubmit}
      currentQuestionIndex={currentQuestionIndex}
    />
  </div>
</>

      )}
      {surveyComplete && (
        <End surveyAnswers={surveyAnswers} onRestart={handleRestartSurvey} userName={userName} />
      )}
    </div>
  )
       

};
export default Survey