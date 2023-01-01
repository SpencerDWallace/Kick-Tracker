import React, { useState } from "react";
import axios from 'axios';
import '../User.css';
import { Link } from 'react-router-dom';

const url = window.location.protocol + '' + window.location.host + '/reset'

let timeoutID;

const messageTimeout = ()=>{
  timeoutID = setTimeout(() => {
    document.querySelector('.form-alert').style.display = 'none'
    document.querySelector('.submit').classList.remove('removed')
  }, 3000)
}
const forgot = async (email) =>{
    clearTimeout(timeoutID);
    document.querySelector('.form-alert').style.display = 'none'
    document.querySelector('.submit').classList.add('removed')
    document.querySelector('.loader').classList.remove('removed')

        try {
          const { data } = await axios.post(APIURL + `api/v1/auth/forgot`, {
            email,
            url,
          })
      
          if(!data.reset)
          {
            throw data
          }
          document.querySelector('.form-alert').style.display = 'block'
          document.querySelector('.form-alert').innerHTML = 'An email has been sent.'
          document.querySelector('.form-alert').classList.add('submit-success');
          document.querySelector('.form-alert').classList.remove('submit-fail');
          
        } catch (error) {
          console.error(error)
          document.querySelector('.form-alert').style.display = 'block'
          document.querySelector('.form-alert').innerHTML = error
          document.querySelector('.form-alert').classList.remove('submit-success');
          document.querySelector('.form-alert').classList.add('submit-fail');
        }
        document.querySelector('.loader').classList.add('removed')
        messageTimeout();
}

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handleSubmit(event) {
        forgot(email);
        event.preventDefault();
    }

    return (
        <div className = "background">
            <div className = "user-form">
                <form className ="forgot" onSubmit={handleSubmit}>
                    <h1 className="user-form-header"> Forgot Password </h1>
                    <div className="form-control-internal">
                        <label>Email</label>
                        <input type="text" name="email" value={email} onChange={handleEmailChange}/>
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

export default ForgotPassword;