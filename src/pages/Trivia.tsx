import React, {useState, useEffect } from 'react'
import he from 'he'
import Questions from '../components/Questions'
import ScreenName from '../components/ScreenName'

//explicit typescript for data coming from db
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

export default function Trivia(){
  const [screenName, setScreenName] = useState("")
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

        setQuestion(shuffledDecoded[questionNum].question)
        setQuestionNum(questionNum)
        setAnswers(shuffledDecoded[questionNum].answers)
        setCorrect(shuffledDecoded[questionNum].correct_answer)         

      } catch(err) {

        setErrorMessage("Something went wrong loading the quiz.  Try again!")

        //developer see this errorMessage
        console.log(err)
      }    
    } 
  
    fetchQuestions() 
  }, [questionNum]) 

  let handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    
    setIsLoading(true)  

    setTimeout(() => {
      setIsLoading(false)
      setGameStart(true) 
      setGameOver(false)
      setScore(0)
      setQuestionNum(0)  
    }, 1000)
  }

  let handleChange = ( e:any ) => {
    //const { value } = e.target 
    //setTimeout(() => {
      setScreenName(e.target.value)  
    //}, 1000)

  } 

  let nextQuestion = () => {  
    setQuestionNum(questionNum => questionNum + 1)
    setQuestions(questions => questions[questionNum])
    setAnswerDisabled(false)

    if (questionNum === questions.length - 1) {
      setGameOver(true)    
      setIsLoading(false) 
      setScreenName("")
    } 
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

      {!screenName &&           
        <p className="screenName_title" id="screenName">Enter a screen name to begin</p>
      }

      { screenName && <p>Welcome {screenName}! </p> }

      { gameOver &&  
        <ScreenName
          handleSubmit={handleSubmit}
          screenName={screenName}
          handleChange={handleChange}
          gameStatus={gameStatus}
        />           
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
