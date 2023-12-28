
import { useEffect, useReducer } from "react"
import Header from "./Header.jsx"
import MainComponent from "./MainComponent.jsx"
import Loader from "./Loader.jsx"
import Error from "./Error.jsx"
import StartScreen from "./StartScreen.jsx"
import Question from "./Question.jsx"
import NextButton from "./NextButton.jsx"
import Progress from "./Progress.jsx"
import FinishedScreen from "./FinishedScreen.jsx"
import Footer from "./Footer.jsx"
import Timer from "./Timer.jsx"
const API = 'https://json-server-iota-olive.vercel.app/questions'
const SECS_PER_QUESTION = 30
const initialState = { questions: [], status: 'loading', index: 0, answer: null, points: 0, highscore: 0, secondsRemaining: null }


function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved':
      return { ...state, questions: action.payload, status: "ready" }

    case 'failed':
      return { ...state, status: 'error' }


    case 'start':
      return { ...state, status: 'active', secondsRemaining: state.questions.length * SECS_PER_QUESTION }

    case 'newAnswer':
      const question = state.questions.at(state.index)
      return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points }

    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }

    case 'finish':
      return { ...state, status: 'finish', highscore: state.points > state.highscore ? state.points : state.highscore }

    case 'restart':
      return { ...state, status: 'active', index: 0, answer: null, points: 0, secondsRemaining: 10 }

    case 'tick':
      return { ...state, secondsRemaining: state.secondsRemaining - 1, status: state.secondsRemaining === 0 ? 'finish' : state.status }

    default:
      throw new Error(' ERROR ');

  }


}
function App() {




  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length
  const maxPoints = questions.reduce((acc, question) => acc + question.points, 0)


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
        {status === 'active' &&
          <>
            <Progress answer={answer} maxPoints={maxPoints} poinst={points} index={index} numQuestion={numQuestions} />
            <Question answer={answer} dispatch={dispatch} question={questions[index]} />

            <Footer>



              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton index={index} numQuestion={numQuestions} dispatch={dispatch} answer={answer} />
            </Footer>




          </>}


        {status === 'finish' && <FinishedScreen highscore={highscore} points={points} maxPoints={maxPoints} dispatch={dispatch} />}

      </MainComponent>



    </div>
  )
}

export default App
