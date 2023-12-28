import React from 'react'

export default function Progress({ index, numQuestion, poinst, maxPoints }) {
    return (
        <header className='progress' >
            <p>Question  <strong> {index + 1} </strong>  {numQuestion}   </p>
            <p> <strong> {poinst}/{maxPoints} </strong>  </p>
        </header>
    )
}
