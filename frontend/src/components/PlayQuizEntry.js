import React, { useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import GameQuizCard from './GameQuizCard';
import '../Style/PlayQuizEntry.css'
import axios from 'axios';

const PlayQuizEntry = () => {

  const [message, setMessage] = useState('');
  const [seq, setSeq] = useState("")
  const quizsInitial = []
  const [quizs, setQuizs] = useState(quizsInitial)

  var [val, setVal] = useState('')

  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login")

    }
  }, []);




  const handleChange = (event) => {
    setMessage(event.target.value);
  };



  const fetchallquiz = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:1000/api/quiz/fetchallquizbasedonmessage/${message}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });

      const json = response.data;
      console.log(json, "FETCH");
      setSeq('1');
      setQuizs(json);

      const disableBtn = () => {
        document.getElementById('btn2').disabled = true;
      }
      disableBtn();
    } catch (error) {
      console.error('Error fetching quiz:', error);
      // Handle error, show an error message, etc.
    }
  }

  // const fetchallquiz = async () => {
  //   const response = await fetch(`http://localhost:1000/api/quiz/fetchallquiznoauthentication/${message}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "auth-token": localStorage.getItem('token')
  //     }
  //   });
  //   const json = await response.json()
  //   console.log(json, "FETCH");
  //   setSeq('1')
  //   setQuizs(json)
  //   // localStorage.setItem("val", 0);
  //   const disableBtn = () => {
  //     document.getElementById('btn2').disabled = true;
  //   }
  //   disableBtn();
  // }

  console.log(seq);

  const myFunction = () => {
    console.log(sessionStorage.getItem("val"))
    setVal(sessionStorage.getItem("val"))
    const disableBtn = () => {
      document.getElementById('btn').disabled = true;
    }
    disableBtn();

  }


  useEffect(() => {
    setVal(sessionStorage.setItem("val", "0"))
  }, [])



  return (
    <div className='playQuixEntry_container'>
      <div className='pin_play'>
        <input
          className='input_gamepin'
          type="text"
          id="message"
          name="message"
          placeholder='Game PIN'
          onChange={handleChange}
          value={message}
        />
        {/* <h2>Message: {message}</h2> */}

        <button className='btn btn-primary btn_play' id="btn2" onClick={fetchallquiz}>Play</button>
      </div>

      {quizs.map((quiz) => {
        return (
          <GameQuizCard quiz={quiz} key={quiz._id} />

        );
      })}

      <button className={seq == '1' ? 'btn btn-primary' : 'd-none mx-2'} id="btn" onClick={myFunction}>  GENERATE SCORE </button>

      <div className={seq == '1' ? 'd-flex' : 'd-none'}> <h2>Your Score is : {val} </h2></div>


      {/* <button >GENERATE SCORE</button>  */}
      <div>
        <a href="/playquiz" className={seq == '1' ? "btn btn-danger my-2" : 'd-none mx-2'} id='reset_btn' tabIndex="-1" role="button">RESET</a>
      </div>

    </div>
  )
}

export default PlayQuizEntry;