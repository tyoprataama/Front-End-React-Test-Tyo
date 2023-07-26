import React, {
  useState
} from "react";

const Card = ({questionData, onAnswerSubmit, currentQuestionIndex}) => {
   const { question, options, num, isLocked } = questionData;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const isLastQuestion = currentQuestionIndex === questionData.length - 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAnswer && !isLocked) {
      onAnswerSubmit(selectedAnswer);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    onAnswerSubmit(selectedAnswer);
  };

  return (
   <div className="flex flex-col items-center justify-center w-screen p-6">
  <div className="max-w-sm px-6 py-6 pb-20 bg-white border border-none rounded-3xl shadow">
    <h1 className="head font-bold text-indigo-200 mb-5">{num}</h1>
    <p className="paragrap text-indigo-400 font-semibold mb-3">{question}</p>
    <form onSubmit={handleSubmit}>
      {options?.map((answer, index) => (
        <label key={index} className="block option text-indigo-400 flex items-center">
  <input
    type="radio"
    value={answer}
    checked={selectedAnswer === answer}
    onChange={() => setSelectedAnswer(answer)}
    disabled={isLocked}
    className="h-5 w-5 rounded-full text-purple-600 focus:ring-4 border-2 border-purple-600"
  />
  <span className="ml-2">{answer}</span>
</label>
      ))}
    </form>
  </div>
  {!isLocked && (
    <div className="max-w-sm w-full px-10">
      <button
        className="cursor-pointer w-full text-white bg-violet-700 hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-700 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 mt-5"
        onClick={handleNextQuestion}
        disabled={!selectedAnswer}
      >
        {isLastQuestion ? "Submit" : "Next"}
      </button>
    </div>
  )}
</div>
  );
}

export default Card
