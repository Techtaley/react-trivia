pipeline {
  agent any 

  tools (nodejs "node")

  stages {
      
    stage("build"){
        
      steps {
         git 'https://github.com/Techtaley/react-trivia.git'
         bat 'npm install' 
      }
    }
    
    stage("test"){ 
        
      steps {
         echo 'testing the application...' 
        
      }
    }

    stage("deploy"){
      steps {
         echo 'deploying the application...' 
        
      }
    }
  }        
}