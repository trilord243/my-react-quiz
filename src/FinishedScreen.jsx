import React from 'react'

export default function FinishedScreen({ maxPoints, points, highscore, dispatch }) {
    let emoji;
    if (points / maxPoints < 0.5) {
        emoji = '😢'
    } else if (points / maxPoints < 0.8) {
        emoji = '😐'
    } else {
        emoji = '😄'
    }

    const percentage = (points / maxPoints) * 100
    return (
        <>

            <p className='result'>  {emoji} You scored  <strong> {points} </strong>     out of {maxPoints} ({Math.ceil(percentage)})%   </p>
            <p className='highscore'> (Highscore Points: {highscore}) </p>
            <button className='btn btn-ui' onClick={() => dispatch({ type: 'restart' })} > Restart</button>
        </>
    )
}
