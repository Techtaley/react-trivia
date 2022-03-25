import React from 'react'
import './style.css'
//nextstep:
//import React from 'react'
//const Questions: React.FC<Props> = ({  //tells typscript this is a FC functional Component & we want to use Props above
//tells typscript this is a FC functional Component & we want to use Props above

export default function Questions({
  questions,
  setQuestions,
  question, 
  setQuestion, 
  answers, 
  correct, 
  questionNum, 
  total_questions, 
  score, 
  setScore,
  isDisabled, 
  setIsDisabled
}){

  let checkAnswer = e => {
    const { value } = e.target  //get value from button 

    setIsDisabled(isDisabled => !isDisabled)

    if (value === correct) {
      setScore(prev => prev + 1) 
    } else if (value !== correct) {
    } 

    //nextstep:  save all answers in an answerObjecgt
  }

  return (        
      <div>
        <div className="gameStats">
          <p className="questionNum">Questions: {questionNum + 1} / {total_questions}</p>  
          <p className="score">Score: {score} </p>  
        </div>        
        <p className="question">{question}</p>        
        
        <div className="answerForm">
            {answers.map(a => 
              <div className="answers" key={a}>
                <button 
                  key={a}
                  type="button"
                  name="answer"               
                  className="answer" 
                  onClick={checkAnswer} 
                  value={a}
                  disabled={isDisabled}
                > 
                {a}
                </button>
              </div>
            )}                         
        </div>  
        
        <br/>
        <br/>
      </div>
    )
}

