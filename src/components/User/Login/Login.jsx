import React, { useState } from "react";
import axios from 'axios';
import '../User.css';
import './Login.css';
import { Link } from 'react-router-dom';

let timeoutID;

const messageTimeout = ()=>{
  timeoutID = setTimeout(() => {
    document.querySelector('.form-alert').style.display = 'none'
  }, 3000)
}

const login = async (email, password) =>{
  clearTimeout(timeoutID);
  document.querySelector('.form-alert').style.display = 'none'
  document.querySelector('.submit').classList.add('removed')
  document.querySelector('.loader').classList.remove('removed')
  
  try {
    const { data } = await axios.post(`https://kicktracker-backend.herokuapp.com/api/v1/auth/login`, {
      email,
      password,
    })
    console.log(data)
    if(!data.token)
    {
      throw data
    }
    localStorage.setItem('token', data.token)
    let token = localStorage.getItem('token')
    console.log(token)
    if(token !== 'undefined'){
      window.location = "/";
    }
    else{
      localStorage.removeItem('token')
    }


  } catch (error) {
    //console.error(error)
    document.querySelector('.form-alert').style.display = 'block'
    document.querySelector('.form-alert').innerHTML = error
    document.querySelector('.form-alert').classList.add('submit-fail');
  }
  document.querySelector('.submit').classList.remove('removed')
  document.querySelector('.loader').classList.add('removed')
  messageTimeout();
}

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        login(email, password);
        event.preventDefault();
    }

    return(
        <div className = "background">
            <div className = "user-form">
                <form onSubmit={handleSubmit}>
                    <h1 className={"user-form-header"}> Login </h1>
                    <div className="form-control-internal">
                        <label>Email</label>
                        <input type="text" name="email" value={email} onChange={handleEmailChange}/>
                    </div>
                    <div className="form-control-internal">
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <button type = "submit" className = "submit">Submit</button>
                    <div className = "loader removed"></div>
                    <div className = "form-alert"></div>
                    <div className = "alt-route">
                      <Link to={"/register"} > Need to Sign Up? </Link>
                      <Link to={"/forgot"} > Forgot Password? </Link>
                    </div>
                </form>
            </div>
      </div>
    )
}

export default Login;
