import React from 'react'

const End = ({
    surveyAnswers,
    onRestart
  }) => {
    const handleRestart = () => {
      onRestart();
    };
  return (
     <div>
      <h2>Survey Completed!</h2>
      <p>Thank you for completing the survey.</p>
      {/* Display survey answers or perform any required analysis */}
      <button onClick={handleRestart}>Restart Survey</button>
    </div>
  )
}

export default End
