//explicit types for incoming props 
type Props = {
  questions: string[],
  question: string[], 
  answers: string[], 
  correct: string, 
  questionNum: number, 
  total_questions: number, 
  score: number, 
  setScore: any,
  answerDisabled: boolean,
  setAnswerDisabled: any,
}

//rfce adjusted to include typescript
const Questions: React.FC<Props> = ({
  questions,
  question, 
  answers, 
  correct, 
  questionNum, 
  total_questions, 
  score, 
  setScore,
  answerDisabled, 
  setAnswerDisabled
}) => {

  let checkAnswer = ( e: React.MouseEvent<HTMLButtonElement>) => {
    const { value} = e.target as HTMLTextAreaElement  //get value from button 

    setAnswerDisabled(true)    

    if (value === correct) setScore((prev: number) => prev + 1) 
    
    //nextstep:  save all answers in an answerObjecgt
  }

  return (        
      <section className="questions_section">
        <div className="gameStats">
          <p className="questionNum">Questions: {questionNum + 1} / {total_questions}</p>  
          <p className="score">Score: {score} </p>  
        </div>       

        <p className="question">{question}</p>        
        
        <div className="answerForm">
            {answers.map(a => 
              <div className="answers" key={a}>
                <button
                  data-testid="answers"
                  key={a}
                  type="button"
                  name="answer"               
                  className="answer"
                  onClick={checkAnswer} 
                  value={a}
                  disabled={answerDisabled}
                > 
                {a}
                </button>
              </div>
            )}                         
        </div>  
        
      </section>
    )
}

export default Questions