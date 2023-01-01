import React, { useState } from "react";
import axios from 'axios';
import '../User.css';
import { Link } from 'react-router-dom';

let timeoutID;

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

const errorTimeout = ()=>{
    timeoutID = setTimeout(() => {
        document.querySelector('.form-alert').style.display = 'none'
        document.querySelector('.submit').classList.remove('removed')
        document.querySelector('.loader').classList.add('removed')
    }, 3000)
  }
  
const successTimeout = ()=>{
    timeoutID = setTimeout(() => {
        window.location = '/login'
    }, 3000)
}


const resetPassword = async (email, password) =>{
    clearTimeout(timeoutID);
    document.querySelector('.form-alert').style.display = 'none'
    document.querySelector('.submit').classList.add('removed')
    document.querySelector('.loader').classList.remove('removed')
    try {
 const { data } = await axios.patch(APIURL + `api/v1/auth/reset/${id}`, {
        email,
        password,
      })
      if(!data.reset)
      {
        throw data
      }
      document.querySelector('.form-alert').style.display = 'block'
      document.querySelector('.form-alert').innerHTML = 'Password reset!'
      document.querySelector('.form-alert').classList.add('submit-success');
      document.querySelector('.form-alert').classList.remove('submit-fail');
      
      successTimeout()
      
    } catch (error) {
      console.error(error)
      document.querySelector('.form-alert').style.display = 'block'
      document.querySelector('.form-alert').innerHTML = error
      document.querySelector('.form-alert').classList.remove('submit-success');
      document.querySelector('.form-alert').classList.add('submit-fail');
      errorTimeout()
    }
    document.querySelector('.loader').classList.add('removed')
}

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        resetPassword(email, password);
        event.preventDefault();
    }

    return (
      <div className = "background">
          <div className = "user-form">
              <form onSubmit={handleSubmit}>
                  <h1 className="user-form-header" > Reset Password</h1>
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
                  <Link to={"/login"}> Return to login </Link>
                  </div>
              </form>
          </div>
      </div>
    );
  }

export default PasswordReset;