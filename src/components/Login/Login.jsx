import axios from 'axios';
import React, { useState } from 'react'

export default function Login() {

  const [error, setError] = useState('')
  const [user, setUser] = useState({
    email:"",password:""
  });


  function getUser(e){
    let myuser = {...user};
    myuser[e.target.name] = e.target.value;
    setUser(myuser);
  }

  async function submitForm(e){
    e.preventDefault();
    try {

      let {data}= await axios.post(`http://localhost:3001/v1/auth/login`,user);
      console.log(data);
      if(data.message === "user exist"){
        window.location.href = "/home";
      }
      else{
        setError(data.message);
        console.log(error.message);
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  }

  return (
    <div className="w-75 mx-auto py-3">
        <h1 className="pb-3">Login</h1>
        <form onSubmit={submitForm}>
          <div className="alert alert-danger"> {error}</div>
          <div className="px-3">
              <label htmlFor="email"></label>
              <input type="email" placeholder='email' name="email" className="form-control" onChange={getUser} />
          </div>
          <div className="px-3">
              <label htmlFor="password"></label>
              <input type="password" placeholder='password' name="password" className="form-control" onChange={getUser} />
          </div>
          <button type="submit" className="btn btn-info m-3">LOGIN</button>
        </form>
      </div>
  )
}
