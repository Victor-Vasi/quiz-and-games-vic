import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Trivia from './pages/trivia/Trivia';
import Tenzies from './pages/tenzies/Tenzies';

function App() {
  return (
    <div className='app-container'>
      <>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/trivia' element={<Trivia />} />
            <Route path='/tenzies' element={<Tenzies />} />
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
