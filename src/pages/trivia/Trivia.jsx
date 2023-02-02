import React, { useState } from 'react';
import QuizzSection from '../../components/trivia/quizSection/QuizzSection';
import SelectCategory from '../../components/trivia/selectCategory/SelectCategory';

const Trivia = () => {

    const [apiValue, setApiValue] = useState({
        category: "",
        difficulty: ""
    })

    const [pageToggle, setPageToggle] = useState(true)

    const createAPI = `https://opentdb.com/api.php?amount=6&category=${apiValue.category}&difficulty=${apiValue.difficulty}&type=multiple`;
    // console.log(createAPI);

    function handleChange(event) {
        const { name, value } = event.target;
        setApiValue(prevValue => {
            return { ...prevValue, [name]: value }
        })
    }

    function startGame() {
        setPageToggle(prevState => !prevState)
    }

    return (
        <div className='trivia-container'>
            {pageToggle ?
                <SelectCategory
                    category={apiValue.category}
                    difficulty={apiValue.difficulty}
                    startGame={startGame}
                    handleChange={handleChange}
                /> :
                <QuizzSection
                    apiValue={createAPI}
                    startGame={startGame}
                />
            }
        </div>
    )
}

export default Trivia