import React, { useEffect, useState } from 'react'
import "./quizzSection.css"
import { nanoid } from 'nanoid'
import Answer from './Answer'
import Confetti from 'react-confetti'

const QuizzSection = (props) => {

    const [triviaData, setTriviaData] = useState([])
    const [results, setResults] = useState("Quiz Game")
    const [isWon, setIsWon] = useState(false)
    const [quizStatus, setQuizStatus] = useState(false)


    // -------------------- setTriviaData -----------------------
    useEffect(() => {
        fetch(props.apiValue)
            .then(res => res.json())
            .then(data => setTriviaData(
                data.results.map(data => {
                    return {
                        ...data,
                        id: nanoid(),
                        question: data.question.replace(/&[#A-Za-z0-9]+;/gi, ""),
                        answers: shuffle([
                            ...data.incorrect_answers,
                            data.correct_answer
                        ].map(answer => ({
                            id: nanoid(),
                            answer,
                            isSelected: false,
                            isCorrect: answer === data.correct_answer ? true : false,
                            isOver: false
                        })))
                    }
                })
            ))
    }, [props.apiValue])

    // console.log(triviaData);

    // -------------------- Shuffle answers to be in an random order -----------------------
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // -------------------- Create question - answers div -----------------------
    const questionAnswersBox = triviaData.map((data) => {
        const triviaQuestion = <p className='question-p'>{data.question}</p>
        const triviaAnswer = data.answers.map(answer => {
            return (
                <Answer
                    isSelected={answer.isSelected}
                    answer={answer.answer.replace(/&[#A-Za-z0-9]+;/gi, "")}
                    key={answer.id}
                    id={answer.id}
                    select={select}
                    isCorrect={answer.isCorrect}
                    isOver={answer.isOver}
                />
            )
        })
        return (
            <div className='questionAnswersBox' key={nanoid()}>
                <div className="questionBox">{triviaQuestion}</div>
                <div className="answerBox">{triviaAnswer}</div>
            </div>
        )
    })

    // -------------------- Create a function which will locates the answer selected by the user -----------------------
    function select(id) {
        setTriviaData(prevData =>
            prevData.map(element => ({
                ...element,
                answers: element.answers.map(answr =>
                    id === answr.id ?
                        { ...answr, isSelected: !answr.isSelected } :
                        { ...answr }
                )
            }))
        )
    }

    // -------------------- Create a two const with an array of corectAnswer - userAnswer -----------------------
    const correctAnswers = triviaData.map(element => element.correct_answer)
    const userAnswers = triviaData.map(element => {
        const selectedAnswers = element.answers.filter(answer => answer.isSelected === true).map(answer => answer.answer)
        return selectedAnswers
    }).flat()
    // console.log(correctAnswers);
    // console.log(userAnswers);

    // -------------------- Check game -----------------------
    function checkGame() {
        if (correctAnswers.length !== userAnswers.length && String(correctAnswers) !== String(userAnswers)) {
            setResults("Please answer all the questions.")
        } else if (correctAnswers.length === userAnswers.length && String(correctAnswers) === String(userAnswers)) {
            setResults(`Congrats!🎉🎉🎉 Your score is ${userAnswers.length} out of ${userAnswers.length}!`)
            setIsWon(true)
            setTriviaData(prevDtat =>
                prevDtat.map(elemet => ({
                    ...elemet,
                    answers: elemet.answers.map(answer => ({
                        ...answer,
                        isOver: !answer.isOver
                    }))
                }))
            )
        } else if (correctAnswers.length === userAnswers.length && String(correctAnswers) !== String(userAnswers)) {
            setQuizStatus(prevState => !prevState)
            setResults("Not all the answers are correct. Would you like to try once more?")
            setTriviaData(prevDtat =>
                prevDtat.map(elemet => ({
                    ...elemet,
                    answers: elemet.answers.map(answer => ({
                        ...answer,
                        isOver: !answer.isOver
                    }))
                }))
            )
        }
    }

    // -------------------- Reset game -----------------------
    function newGame() {
        if (isWon) { setIsWon(prevState => !prevState) }
        if (quizStatus) { setQuizStatus(prevState => !prevState) }
        if (isWon || quizStatus) {
            props.startGame()
            setResults("Trivia Quizz")
            setTriviaData(prevData =>
                prevData.map(element => ({
                    ...element,
                    answers: element.answers.map(ogg => ({
                        ...ogg,
                        isOver: false,
                        isSelected: false
                    }))
                }))
            )
        }
    }

    return (
        <div className="quizz-container">
            <div className='quizz-section'>
                <div className="confetti">{isWon && <Confetti />}</div>
                <h2 className='results'>{results}</h2>
                {questionAnswersBox}
                <div className="btn-container">
                    {isWon || quizStatus ?
                        <button className='quizz-btn' onClick={newGame}>New Game</button> :
                        <button className='quizz-btn' onClick={checkGame}>Check</button>
                    }
                </div>

            </div>
        </div>
    )
}

export default QuizzSection
