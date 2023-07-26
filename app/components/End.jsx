import React from 'react'

const End = ({
    surveyAnswers,
    onRestart
  }) => {
    const handleRestart = () => {
      onRestart();
    };
  return (
       <div className="flex flex-col items-center justify-center h-screen w-screen">
  <div className="max-w-sm p-6 bg-white border border-none rounded-lg shadow">
      <h2>Survey Completed!</h2>
      <p>Thank you for completing the survey.</p>
      {/* Display survey answers or perform any required analysis */}
      <button className='text-white bg-purple-700 hover:bg-purple-800 mt-3 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2' onClick={handleRestart}>Restart Survey</button>
    </div>
    </div>
  )
}

export default End
