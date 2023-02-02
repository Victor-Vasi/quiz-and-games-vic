import React, { useEffect, useState } from 'react';
import Dice from '../../components/dice/Dice';
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import "./tenzies.css"

const Tenzies = () => {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateDie() {
        return {
            value: Math.ceil(Math.random() * 14),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let index = 0; index < 15; index++) {
            newDice.push(generateDie())
        }
        return newDice
    }

    function holdDice(id) {
        setDice(prevDices => prevDices.map(dice => {
            return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
        }))
    }

    function rollDices() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }

    const allElements = dice.map(die => {
        return (
            <Dice
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                holdDice={() => holdDice(die.id)}
            />
        )
    })

    return (
        <div className='tenzies-container'>
            {tenzies && <Confetti />}
            <div className='tenzie'>
                <h2 className='game-name'>{tenzies ? "Congratulation, You won!" : "Tenzie"}</h2>
                <p className='game-rulles'>Roll until all dice have the same value.
                    Click each die to freeze it at its current value between rolls.</p>
                <div className='dice'>
                    {allElements}
                </div>
                <button onClick={rollDices} className='btn'>{tenzies ? "New Game" : "Roll"}</button>
            </div>
        </div>
    )
}

export default Tenzies