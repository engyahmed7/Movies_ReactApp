import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function getUser(e) {
    let myuser = { ...user };
    myuser[e.target.name] = e.target.value;
    setUser(myuser);
  }

  async function submitForm(e) {
    e.preventDefault();
    try {
      setLoading(true);
      let { data } = await axios.post(
        `http://localhost:3001/v1/auth/login`,
        user
      );
      console.log(data);
      if (data.message === "user exist") {
        setLoading(false);
        window.location.href = "/home";
      }
    } catch (error) {
      setLoading(false);
      let errorMsg= error.response.data.message
      let errMsg =  errorMsg.replace(/['"]/g, '');
      setError (errMsg);
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
