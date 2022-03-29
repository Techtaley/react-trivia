import React, {useState, useEffect } from 'react'
import he from 'he'
import Questions from '../components/Questions'
//import loadingSpinner from 'loading-spinner'
//import styled from 'styled-components';

//nextStep: import loadingSpinner from 'loading-spinner'

//typescript: data coming from db
type Results = {
    correct_answer: string,
    incorrect_answers: string[]
    questions: string[],
    setQuestions: string[],
    question: string,
    setQuestion: string[]
    questionNum: number,
    setQuestionNum: number,
    setAnswers: string[],  
    correct: string,
    setCorrect: string,
    score: number,
    setScore: number,
    answerDisabled: boolean,
    setAnswerDisabled: boolean,
    nextDisabled: boolean, 
    gameStart: boolean,
    setGameStart: boolean,
    gameOver: boolean,
    setGameOver: boolean,
    isLoading: boolean,
    setIsLoading: boolean,
    errorMessage: string,
    setErrorMessage: string    
}

//types from data coming back from api
//type QuestionState = Questions & { answers: string[] }

export default function Trivia(){
  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState([])
  const [questionNum, setQuestionNum] = useState(0)
  const [answers, setAnswers] = useState([])  
  const [correct, setCorrect] = useState("")
  const [score, setScore] = useState(0)
  const [answerDisabled, setAnswerDisabled] = useState(false)
  const [gameStart, setGameStart] = useState(true)
  const [gameOver, setGameOver] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage]  = useState("")

  const nextDisabled = false

  const TOTAL_QUESTIONS = 10

  useEffect(() => {  
    let fetchQuestions = async() => {
      
      try {                 
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=9&type=multiple&count`)

        if (!response.ok) {
          throw new Error(`Something went wrong, server responded with ${response.status}.`)
        } 

        const json = await response.json()  

        const { response_code, results } = json

        //response_code: 0 means it's good  
        if(response_code === 1) {
          throw new Error("Bad API Request - no results!")
        } else if(response_code === 2) {
          throw new Error("Bad API request - invalid parameter!")
        }

        let shuffleArray = (arr: any[]) => [...arr].sort((a,b) => Math.random() - 0.5)  
        
        //ISSUE TO FIX:  fix answers decode issue
        //let newAnswers = shuffleArray.map(shuffledAnswer => he.decode(shuffledAnswer))
        //let newAnswers = he.decode(shuffleArray)

        // let shuffleArray = arr => 
        //   //arr = he.decode(arr) 
        //   //arr = he.decode((/[\W0-9]/gi, '')) 

        //   [...arr].sort((a,b) => Math.random() - 0.5)           
        //   //arr = he.decode(arr)
        // } 
        //let decodeAnswers = results.map(props => he.decode([...props.incorrect_answers]))

        //gets single question with answers
        let shuffledDecoded = results.map((props: Results) => ({  
          ...props, 
          question: he.decode(props.question),
          answers: shuffleArray([
            ...props.incorrect_answers, 
            he.decode(props.correct_answer)
          ])
        }))

        //gets all questions
        setQuestions(results.map((r: Results) => ({
          questions: r.question
        })))

        //setFetchResults(shuffledDecoded)  //move to startTrivia

        setQuestion(shuffledDecoded[questionNum].question)
        setQuestionNum(questionNum)
        setAnswers(shuffledDecoded[questionNum].answers)
        setCorrect(shuffledDecoded[questionNum].correct_answer)         

      } catch(err) {

        setErrorMessage("Something went wrong loading the quiz.  Try again!")

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
    //console.log(questions)
    //console.log(question)
    //console.log(answers)
  
    fetchQuestions() 
  }, [questionNum]) //runs when component runs for the very first time.

  let startQuiz = async () => {
    setIsLoading(true)  

    setTimeout(() => {
      setIsLoading(false)
      setGameStart(true) 
      setGameOver(false)
      setScore(0)
      setQuestionNum(0)
  
      //nextstep:
      // const newQuestions = await fetchQuestions(TOTAL_QUESTIONS)
      // setQuestions(newQuestions)
      //setFetchResults(shuffledDecoded)
    }, 1000)
  }

  let nextQuestion = () => {  
    //setNextDisabled(false)

    setQuestionNum(questionNum => questionNum + 1)
    setQuestions(questions => questions[questionNum])
    setAnswerDisabled(false)

    //nextstep:  require user to provide an answer
    if (questionNum === questions.length - 1) {
      setGameOver(true)    
      setIsLoading(false)
    } 
    //setNextDisabled(false)
  }

  let gameStatus  
  isLoading ? gameStatus = "Loading..." 
  : gameOver ? gameStatus = `You scored is ${score} points!`
  : errorMessage ? gameStatus = "Issue loading application."
  : gameStatus = ""

  return (    
    <div className="triviaQuiz"> 
       
          { gameStart &&
            <h1 className="triviaQuiz_title">Trivia Quiz</h1> 
          } 

          <h1 className="welcome">{ gameStatus }</h1> 

          { gameOver  ? 
            <button   
              className="startQuiz " 
              onClick={startQuiz} 
            >
              Start
            </button>        
            : null 
          }

          { !isLoading && !gameOver &&           
            <Questions 
              questions={questions}
              question={question}
              answers={answers}
              correct={correct}
              questionNum={questionNum} 
              total_questions={TOTAL_QUESTIONS}
              score={score}
              setScore={setScore}
              answerDisabled={answerDisabled}
              setAnswerDisabled={setAnswerDisabled}
            />
          }

          { !gameOver && !isLoading ?
            <button 
                data-testid="nextBtn"
                className="nextQuestion" 
                name="button" 
                value="nextQuestion" 
                onClick={nextQuestion}
                disabled={nextDisabled}
            >
              Next Question
            </button>   
            : null 
          }  
    </div>      
  )
}
