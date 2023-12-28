import React from 'react'

export default function Progress({ index, numQuestion, poinst, maxPoints, answer }) {
    return (
        <header className='progress' >
            <progress value={index + Number(answer != null)} max={numQuestion} />

            <p>Question  <strong> {index + 1} /</strong>  {numQuestion}   </p>
            <p> <strong> {poinst}/{maxPoints} </strong>  </p>
        </header>
    )
}
