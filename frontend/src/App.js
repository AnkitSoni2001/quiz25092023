import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Quizs from "./components/Quizs";
import QuizState from "./context/quizs/QuizState";
import Login from "./components/Login";
import PlayQuizEntry from "./components/PlayQuizEntry";
import Signup from "./components/Signup";

function App() {
  
  return (
    <>
      <QuizState>
        <BrowserRouter>
        <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} />
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Quizs/>} />
              <Route exact path="/playquiz" element={<PlayQuizEntry />} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<Signup/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </QuizState>
    </>
  );
}

export default App;
