import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';


export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isVerified = queryParams.get('verified');

  function getUser(e) {
    let myuser = { ...user };
    myuser[e.target.name] = e.target.value;
    setUser(myuser);
  }

  async function submitForm(e) {
    e.preventDefault();
    try {

      setLoading(true);
      const response = await axios.post(`http://localhost:3001/auth/signIn`, user);
  
      if (response && response.data && response.data.message === "userExist") {
        setLoading(false);
        const token = response.data.token;

        localStorage.setItem('authToken', token);
        window.location.href = "/home";
      }
    } catch (error) {
      setLoading(false);
      console.error("An error occurred:", error.response?.data?.message || "Unknown error");
      let errorMsg = error.response?.data?.message;
      let errMsg = errorMsg ? errorMsg.replace(/['"]/g, '') : "An unknown error occurred";
      setError(errMsg);
    }
  }

  return (
    <div className="w-75 mx-auto py-3">
      <h1 className="pb-3">Login</h1>
      <form onSubmit={submitForm}>
      {error && (
            <div className="alert alert-danger">
              {error.split(',').map((errMsg, index) => (
                <div className="fw-bold" key={index}>{errMsg.trim()}</div>
              ))}
            </div>
          )} 
          
      {isVerified === 'true' && (
        <div className="alert alert-success">Your email has been verified. You can now log in.</div>
      )}
      {isVerified === 'false' && (
        <div className="alert alert-danger">Email verification failed. Please try again.</div>
      )}
        <div className="px-3">
          <label htmlFor="email"></label>
          <input
            type="email"
            placeholder="email"
            name="email"
            className="form-control"
            onChange={getUser}
          />
        </div>
        <div className="px-3">
          <label htmlFor="password"></label>
          <input
            type="password"
            placeholder="password"
            name="password"
            className="form-control"
            onChange={getUser}
          />
        </div>
        <button type="submit" className="btn btn-info m-3">
        {loading? <FontAwesomeIcon icon={faSpinner} spinPulse /> : 'Login' }
        </button>
      </form>
    </div>
  );
}
