import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';



const intialstate = {
  questions : [] ,
  status : "ready" ,
  index : 0 ,
  answer : null ,
  points : 0,
}

function reducer(state , action) {
  switch(action.type){
    case "dataRecieved" :
      return{
        ...state , 
        questions: action.payload ,
        status : 'ready',
      };
      case "datafailed" :
        return{
          ...state , status : "error",
        };
        case "start" :
          return{
            ...state , status : "active" ,
          };
          case "newanswer" :
            const question  = state.questions.at(state.index)
            return{
              ...state , answer : action.payload,
              points : action.payload === question.correctOption ? state.points + question.points : state.points ,
            };
      default :
      throw new Error ("invalid choice")
      };
     

  }




const App = () => {
  const [{status , questions , index , answer} , dispatch] = useReducer(reducer , intialstate)

  const numquestions = questions.length;

  useEffect(() =>{
    fetch('http://localhost:9000/questions').then((res) => res.json()).then((data) => dispatch({type:"dataRecived" , payload : data}))
    .catch((err) => dispatch({ type : "datafailed" }))

  }, [])


  return (
    <div className='app'>
      <Header />
      <Main>
        {status === "loading" &&  <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numquestions = {numquestions} dispatch={dispatch}/>}
        {status === "active" && <Question question = {questions[index]} dispatch={dispatch} answer={answer} />}

             </Main>
    
    </div>
  )
}

export default App;
