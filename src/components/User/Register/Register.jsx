import React, { useState } from "react";
import axios from 'axios';
import '../User.css';
import './Register.css';
import { Link } from 'react-router-dom';

let timeoutID;

const messageTimeout = ()=>{
  timeoutID = setTimeout(() => {
    document.querySelector('.form-alert').style.display = 'none'
  }, 3000)
}

const register = async (email, password) =>{
    clearTimeout(timeoutID);
    document.querySelector('.form-alert').style.display = 'none'
    document.querySelector('.submit').classList.add('removed')
    document.querySelector('.loader').classList.remove('removed')
    try {
        const { data } = await axios.post(`https://kicktracker-backend.herokuapp.com/api/v1/auth/register`, {
        email,
        password
        })
        console.log(data)
        if(!data.token)
        {
        throw data
        }
        localStorage.setItem('token', data.token)
        let token = localStorage.getItem('token')
        if(token !== 'undefined'){
        window.location = "/";
        }
        else{
        localStorage.removeItem('token')
        }

    } catch (error) {
        console.error(error)
        document.querySelector('.form-alert').style.display = 'block'
        document.querySelector('.form-alert').innerHTML = error
        document.querySelector('.form-alert').classList.add('submit-fail');
    }
    document.querySelector('.submit').classList.remove('removed')
    document.querySelector('.loader').classList.add('removed')
    messageTimeout();
}

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        register(email, password);
        event.preventDefault();
    }

    return(
        <div className = "background">
            <div className = "user-form">
                <form onSubmit={handleSubmit}>
                    <h1 className={"user-form-header"}> Register </h1>
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
                      <Link to={"/login"} > Already Signed Up? </Link>
                    </div>
                </form>
            </div>
      </div>
    )
}

export default Register;
