import React, {useState} from 'react'

// let handleSubmit = (e: HTMLButtonElement) => {

// }

// type Props = {
//   // gameStart: boolean,
//   // setGameStart: any
//   //gameOver: boolean,
//   screenName: string,
//   setScreenName: any,
//   //startQuiz: any
//   // setIsLoading: any,
//   // setGameStart: any,
//   // setGameOver: any,
//   // setScore: any,
//   // setQuestionNum: any  
// }

//when the user clicks the submit button - send results to an api
  //const Home: React.FC<Props> = () => {  
export default function Home(){
  // const Home: React.FC<Props> = () => {  
    const [screenName, setScreenName] = useState("")

    let handleChange = ( e:any ) => {
      setScreenName(e.target.value)        
    }  
  // let startQuiz = async () => {
  //   setIsLoading(true)  

  //   setTimeout(() => {
  //     setIsLoading(false)
  //     setGameStart(true) 
  //     setGameOver(false)
  //     setScore(0)
  //     setQuestionNum(0)
  
  //     //nextstep:
  //     // const newQuestions = await fetchQuestions(TOTAL_QUESTIONS)
  //     // setQuestions(newQuestions)
  //     //setFetchResults(shuffledDecoded)
  //   }, 1000)
  // }    

    let handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
      e.preventDefault()
      
      setTimeout(() => {
        //history.push('/trivia')
        window.location.href ="/Trivia"
      }, 1000)
    }
  
    return (
      <div className="home"> 
     
          <h1>Enter a screen name to Begin</h1>
          
          <form className="homeForm" onSubmit={handleSubmit}>
            <label htmlFor="screenName">Your Screen Name</label>
            
            <input 
                type="text"
                name="screenName"
                id="screenName"
                className="inputHome"
                value={screenName}
                onChange={handleChange}
            />

            <button className="startQuiz ">
              Start
            </button>           

            {/* { gameOver  ? 
            <button   
              className="startQuiz " 
              onClick={startQuiz} 
            >
              Start
            </button>        
            : null 
          } */}


            {/* <button 
              type="submit" 
              className="homeBtn"
            >
              Submit
            </button> */}
        </form>

        { screenName && <p>Welcome {screenName}! </p> }
      </div>    
    )
  }
  
//export default Home