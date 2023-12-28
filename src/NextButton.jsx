import React from 'react'

export default function NextButton({ dispatch, answer, index, numQuestion }) {

    if (answer !== null && index + 1 < numQuestion) {
        return (
            <button className='btn btn-ui' onClick={() => dispatch({ type: 'nextQuestion' })}>Next</button>
        )

    } else if (index + 1 === numQuestion) {
        return (
            <button className='btn btn-ui' onClick={() => dispatch({ type: 'finish' })}>Finish</button>
        )
    } else {
        return null
    }



}
