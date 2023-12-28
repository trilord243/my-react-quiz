
import { useEffect, useReducer } from "react"
import Header from "./Header.jsx"
import MainComponent from "./MainComponent.jsx"
import Loader from "./Loader.jsx"
import Error from "./Error.jsx"
import StartScreen from "./StartScreen.jsx"
import Question from "./Question.jsx"
const API = 'http://localhost:8000/questions'
const initialState = { questions: [], status: 'loading', index: 0, answer: null, points: 0 }


function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved':
      return { ...state, questions: action.payload, status: "ready" }

    case 'failed':
      return { ...state, status: 'error' }


    case 'start':
      return { ...state, status: 'active' }

    case 'newAnswer':
      const question = state.questions.at(state.index)
      return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + 1 : state.points }

    case 'next':
      return { ...state, index: state.index + 1 }


    default:
      throw new Error(' ERROR ');

  }


}
function App() {




  const [{ questions, status, index, answer }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length


  async function fetcQuestion() {
    try {
      const response = await fetch(API)
      const data = await response.json()
      dispatch({ type: 'dataRecieved', payload: data })

    } catch (error) {
      dispatch({ type: 'failed' })
      console.log(error)

    }



  }
  useEffect(() => {
    fetcQuestion()




  }, [])




  return (
    <div className="app">
      <Header />

      <MainComponent>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && <Question answer={answer} dispatch={dispatch} question={questions[index]} />}




      </MainComponent>



    </div>
  )
}

export default App
