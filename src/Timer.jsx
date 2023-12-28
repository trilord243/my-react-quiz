import React, { useEffect } from 'react'

export default function Timer({ secondsRemaining, dispatch }) {
    const mins = Math.floor(secondsRemaining / 60)
    const secs = secondsRemaining % 60
    useEffect(() => {
        const intervalId = setInterval(function () {
            dispatch({ type: 'tick' })
        }, 1000)

        // Clear interval on component unmount
        return () => clearInterval(intervalId)

    }, [])

    return (
        <div className='timer'> {mins < 10 && "0"}   {mins}:{secs < 10 && "0"} {secs}</div>
    )
}