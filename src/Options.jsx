import React from 'react'

export default function Options({ question, dispatch, answer }) {

    const hasAnswer = answer !== null

    return (
        <div className='options'>

            {question.options.map((option, index) => {
                return (<button disabled={answer !== null} onClick={() => dispatch({ type: 'newAnswer', payload: index })} key={option} className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswer ? index === question.correctOption ? 'correct' : 'wrong' : ''}   `}> {option} </button>)
            })}


        </div>
    )
}
