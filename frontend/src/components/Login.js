import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import '../Style/Login.css'

const Login = () => {
  const [credential, setcredential] = useState({ email: "", password: "" });

  let Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1000/api/auth/login", {
        email: credential.email,
        password: credential.password,
      });

      const json = response.data;

      if (json.success) {
        localStorage.setItem('token', json.authToken);
        Navigate('/');
        toast.success("Logged In successfully");
      } 
      else{
        toast.error("Invalid Credentials");
      }
      if(json.data == "token expired"){
        toast.success("Token expired log in again");
      }
    } catch (error) {
      console.error("API Error:", error);

      toast.error("An error occurred while logging up");
    }
  };

  const onChange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value })
  }
  return (
    <div className="login_container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credential.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credential.password}
            onChange={onChange}
            name="password"
          />
        </div>
        <button type="submit" className="login_btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;