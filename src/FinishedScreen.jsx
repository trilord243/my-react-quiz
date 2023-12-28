import React from 'react'

export default function FinishedScreen({ maxPoints, points, highscore }) {
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
            <p className='highscore'> (Hihscore Points {highscore}) </p>
        </>
    )
}
