import React, {
  useState
} from "react";

const Card = ({questionData, onAnswerSubmit}) => {
   const {
     question,
     options,
     num,
     isLocked,
     currentQuestionIndex
   } = questionData;
   const [selectedAnswer, setSelectedAnswer] = useState(null);

   const handleSubmit = (e) => {
     e.preventDefault();
     if (selectedAnswer && !isLocked) {
       onAnswerSubmit(selectedAnswer);
     }
   };
    const handleNextQuestion = () => {
      setSelectedAnswer(null); // Clear selected answer for the next question
      onAnswerSubmit(selectedAnswer); // Save the current answer before moving to the next question
    };

  return (
   <div className="flex flex-col items-center justify-center h-screen w-screen">
  <div className="max-w-sm p-6 bg-white border border-none rounded-lg shadow">
    <h1>{num}</h1>
    <p>{question}</p>
     <form onSubmit={handleSubmit}>
        {options?.map((answer, index) => (
          <>
            <input
              type="radio"
              className = 'w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600'
              value={answer}
              checked={selectedAnswer === answer}
              onChange={() => setSelectedAnswer(answer)}
              disabled={isLocked}
            />
            <label htmlFor={`question-${index}`} key={index} className="ml-2 text-sm font-medium text-black">
            {answer}
          </label>
          </>
        ))}
        <button type="submit" disabled={isLocked || !selectedAnswer}>
          Submit
        </button>
      </form>
    {/* {options.map((option, index) => (
        <div key={index} className="flex items-center flex items-center mb-4 mt-3">
          <input
            type="radio"
            className = 'w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600'
            id={`question-${index}`}
            value={option}
            checked={selectedOption === option}
            onChange={() => onOptionChange(option)}
          />
          <label htmlFor={`question-${index}`} className="ml-2 text-sm font-medium text-black">
            {option}
          </label>
        </div>
      ))} */}
  </div>
   {!isLocked && (
        <button onClick={handleNextQuestion} disabled={currentQuestionIndex === question.length - 1}>
          Next
        </button>
      )}
</div>
  )
}

export default Card
