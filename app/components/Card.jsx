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
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="max-w-sm p-6 bg-white border border-none rounded-lg shadow">
        <h1>{num}</h1>
        <p>{question}</p>
        <form onSubmit={handleSubmit}>
          {options?.map((answer, index) => (
            <label key={index} className="block">
              <input
                type="radio"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={() => setSelectedAnswer(answer)}
                disabled={isLocked}
                className="mr-2"
              />
              {answer}
            </label>
          ))}
        </form>
      </div>
      {!isLocked && (
        <button
          className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 mt-5"
          onClick={isLastQuestion ? handleSubmit : handleNextQuestion}
          disabled={isLastQuestion && (!selectedAnswer || isLocked)}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </button>
      )}
    </div>
  );
}

export default Card
