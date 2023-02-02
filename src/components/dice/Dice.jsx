import React from 'react'

const Dice = (props) => {

    const clickedDice = {
        backgroundColor: props.isHeld ? "#F8F988" : "#ECE8DD"
    }

    return (
        <div onClick={props.holdDice} style={clickedDice} className='dice-container'>
            <span>{props.value}</span>
        </div>
    )
}

export default Dice