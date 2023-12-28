import React from 'react'
import Options from './Options'

function Question({ question, dispatch, answer }) {

    console.log(question.options)
    return (
        <div>
            <h4> {question.question}</h4>
            <Options answer={answer} dispatch={dispatch} question={question} />



        </div>
    )
}

export default Question