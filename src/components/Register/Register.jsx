import axios from "axios";
import React, { useState } from "react";

export default function Register() {
  const [error, setError] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    phoneNumber: "",
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
      let { data } = await axios.post(`http://localhost:3001/v1/auth/register`, user);
  
      if (data.role === 'user') {
        window.location.href = "/login";
      } else {
        setError(data.message);
        console.log(error.message);
      }
    } catch (error) {
      console.error("An error occurred:", error.response.data.message);
      setError(error.response.data.message);
    }
  }
  
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h1 className="pb-3">Register Now</h1>

        <form onSubmit={formSubmit}>
          {error && <div className="alert alert-danger"> {error}</div> } 
          <div className="my-3">
            <label htmlFor="first-name pb-2"></label>
            <input
              type="text"
              onChange={getUser}
              placeholder="first name"
              name="name"
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
            <label htmlFor="password pb-2"></label>
            <input
              type="password"
              onChange={getUser}
              placeholder="Confirm password"
              name="confirmpassword"
              className="form-control"
            />
          </div>
          <div className="my-3">
            <label htmlFor="last-name pb-2"></label>
            <input
              type="text"
              onChange={getUser}
              placeholder="phoneNumber"
              name="phoneNumber"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-info mt-3 ">
            {" "}
            Register
          </button>
        </form>
      </div>
    </>
  );
}
