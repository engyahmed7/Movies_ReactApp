import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    cpassword: "",
    age: 0,
  });

  function getUser(e) {
    let myuser = { ...user };
    myuser[e.target.name] = e.target.value;
    setUser(myuser);
    console.log(myuser);
  }

  async function formSubmit(e) {
    e.preventDefault();
  
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:3001/auth/signUp`, user);
  
      if (response && response.data && response.data.message === 'User added successfully') {
        setLoading(false);
        window.location.href = "/login";
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
    <>
      <div className="w-75 mx-auto py-4">
        <h1 className="pb-3">Register Now</h1>

        <form onSubmit={formSubmit}>
        {error && (
            <div className="alert alert-danger">
              {error.split(',').map((errMsg, index) => (
                <div className="fw-bold" key={index}>{errMsg.trim()}</div>
              ))}
            </div>
          )} 
          <div className="my-3">
            <label htmlFor="userName pb-2"></label>
            <input
              type="text"
              onChange={getUser}
              placeholder="Username"
              name="userName"
              className="form-control"
            />
          </div>
          <div className="my-3">
            <label htmlFor="email pb-2"></label>
            <input
              type="email"
              onChange={getUser}
              placeholder="email"
              name="email"
              className="form-control"
            />
          </div>

          <div className="my-3">
            <label htmlFor="password pb-2"></label>
            <input
              type="password"
              onChange={getUser}
              placeholder="password"
              name="password"
              className="form-control"
            />
          </div>
          <div className="my-3">
            <label htmlFor="cpassword pb-2"></label>
            <input
              type="password"
              onChange={getUser}
              placeholder="Confirm password"
              name="cpassword"
              className="form-control"
            />
          </div>
          <div className="my-3">
            <label htmlFor="age pb-2"></label>
            <input
              type="text"
              onChange={getUser}
              placeholder="age"
              name="age"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-info mt-3 ">
            {loading? <FontAwesomeIcon icon={faSpinner} spinPulse /> : 'Register' } 
          </button>
        </form>
      </div>
    </>
  );
}
