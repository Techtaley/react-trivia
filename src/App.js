import React, {useState, useEffect } from 'react'
import he from 'he'
import Questions from './Questions'
//import loadingSpinner from 'loading-spinner'
import './style.css'
//import styled from 'styled-components';

export default function App(){
//nextstep:
//   const [fetchResults, setFetchResults] = useState({
//     isLoading: false,
//     errorMessage: "",
//     data: null,
// })

  //const [fetchResults, setFetchResults] = useState(null)

  const [questions, setQuestions] = useState("")
  const [question, setQuestion] = useState([])
  const [questionNum, setQuestionNum] =useState(0)
  const [answers, setAnswers] = useState([])  
  const [correct, setCorrect] = useState("")
  const [score, setScore] = useState(0)
  const [isDisabled, setIsDisabled] = useState(false)
  const [gameStart, setGameStart] = useState(true)
  const [gameOver, setGameOver] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  //const [errorMessage, setErrorMessage]  = useState("")

  const TOTAL_QUESTIONS = 10

  useEffect(() => {  
    let fetchQuestions = async() => {
      
      try {                 
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=9&type=multiple&count`)

        if (!response.ok) {
          throw new Error(`Something went wrong, server responded with ${response.status}.`)
        } 

        const json = await response.json()  //returns {response_code, results}
        //console.log("Fetching!")

        const { response_code, results } = json

        //response_code: 0 is good  
        if(response_code === 1) {
          throw new Error("Bad API Request - no results!")
        } else if(response_code === 2) {
          throw new Error("Bad API request - invalid parameter!")
        }

        let shuffleArray = arr => [...arr].sort((a,b) => Math.random() - 0.5)  
        
        //results: [{0: {question: ..., correct_answers: ..., incorrect_answers: [...], ...}, ...]
        let shuffledDecoded = results.map(props => ({  
          ...props, 
          question: he.decode(props.question),
          answers: shuffleArray([
            ...props.incorrect_answers, 
            he.decode(props.correct_answer)
          ])
        }))
        
        //ISSUE TO FIX:  fix answers decode issue
        setQuestions(results.map(q => ({
          questions: q.question
        })))

        //setFetchResults(shuffledDecoded)  //move to startTrivia

        setQuestion(shuffledDecoded[questionNum].question)
        setQuestionNum(questionNum)
        setAnswers(shuffledDecoded[questionNum].answers)
        setCorrect(shuffledDecoded[questionNum].correct_answer)         

      } catch(err) {
        //nextstep:
        //console.log("Issue loading data", err)

        //user see this errorMessage
        //setErrorMessage("Something went wrong loading the quiz.  Try again!")

        // setFetchResults({
        //   isLoading: false,
        //   errorMessage: "Something went wrong loading the quiz.  Try again!",
        //   data: null
        // })

        //developer see this errorMessage
        console.log(err)
      }    
    } 
          
    fetchQuestions() 
  }, [questionNum]) //runs when component runs for the very firt time.

  let startQuiz = async () => {
    setGameStart(true) 
    setIsLoading(true)  
    setGameOver(false)
    setScore(0)
    //setAnswers([])
    setQuestionNum(0)

    setIsLoading(false)
    //nextstep:
    // const newQuestions = await fetchQuestions(TOTAL_QUESTIONS)
    // setQuestions(newQuestions)
    //setFetchResults(shuffledDecoded)
  }

  let nextQuestion = () => {    
    setQuestionNum(questionNum => questionNum + 1)
    setQuestions(questions => questions[questionNum])
    setIsDisabled(isDisabled => !isDisabled)

    if (questionNum === questions.length - 1) {
      setGameOver(true)    
      setIsLoading(false)
    } 
  }

  //nextstep:
  //const { isLoading, errorMessage } = fetchResults

  // let gameStatus  
  // gameStart ? gameStatus = `Welcome to the Trivia Quiz` 
  // : gameOver  ? gameStatus = `Game Over.  You scored ${score} points!`
  //   : isLoading ? gameStatus = "Loading..."  //true
  //   : gameStatus = ""
  //   //: errorMessage ? gameStatus = "Issue loading application."
  // // //   : gameStatus = ""  

  return (    
    <div className="triviaQuiz">        
          { gameStart  ?
            <h1 className="triviaQuiz_title">Trivia Quiz</h1> 
            : null
          } 

          {/* <h1 className="welcome">{ gameStatus }</h1>  */}

          { gameOver  ? 
            <button 
              className="startQuiz " 
              onClick={startQuiz} 
            >
              Start
            </button>        
            : null 
          }

          { isLoading ? <p>Loading...</p> : null }

          { !isLoading && !gameOver &&           
            <Questions 
              questions={questions}
              setQuestions={setQuestions}
              question={question}
              answers={answers}
              correct={correct}
              questionNum={questionNum} 
              total_questions={TOTAL_QUESTIONS}
              score={score}
              setScore={setScore}
              isDisabled={isDisabled}
              setIsDisabled={setIsDisabled}
            />
          }

          { !gameOver && !isLoading ?
            <button 
              className="nextQuestion" 
              name="button" 
              value="nextQuestion" 
              onClick={nextQuestion}
            >
              Next Question
            </button>   
            : null 
          }  
          
          { gameOver ?   
            <h1 className="welcome">Your score is {score} points!</h1> 
            : null
          }          
    </div>      
  )
}
