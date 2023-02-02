import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../App.css"

const Home = () => {
    const navigate = useNavigate();

    function goToTrivia() {
        navigate("/trivia")
    }
    function goToTenzies() {
        navigate("/tenzies")
    }

    return (
        <div className='home-container'>
            <div onClick={goToTrivia} className='games-container triviaDiv'>
                <h2>Trivia</h2>
                <div className="img trivia">
                    <img src={process.env.PUBLIC_URL + '/images/trivia.jpg'} alt="img" />
                </div>
            </div>
            <div onClick={goToTenzies} className='games-container tenzieDiv'>
                <h2>Tenzies</h2>
                <div className="img tenzie">
                    <img src={process.env.PUBLIC_URL + '/images/tenzies.jpg'} alt="img" />
                </div>
            </div>
        </div>
    )
}

export default Home