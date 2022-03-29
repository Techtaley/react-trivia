import React from 'react'
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import Home from './pages/Home'
import Trivia from './pages/Trivia'
import './style.css'

// type Props = {
// //   gameStart: boolean  
//   screenName: string
//   setScreenName: any
//   startQuiz: boolean
// //   gameOver: any
// //   setIsLoading: any
// //   setGameStart: any 
// //   setGameOver: any
// //   setScore: any
// //   setQuestionNum: any  
// }

// type Props = {
//   screenName: string,
//   setScreenName: any
// }

//const App: React.FC<Props> = ({startQuiz}) => {

export default function App(){

  return (  
    <div className="App">
      <Trivia />
      
    </div>      
  )
}

//export default App
