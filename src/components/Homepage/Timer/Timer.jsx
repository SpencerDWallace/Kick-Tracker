import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { APIURL } from '../../utilities/user-utilities';
import './Timer.css';

function Timer({setCurrentKick}){
    const [currentHour, setCurrentHour] = useState(Number);
    const [localTime, setLocalTime] = useState("");
    let timeoutID;
    useEffect(()=>{
        clearTimeout(timeoutID);
        timeUpdater();
        const time = new Date();
        setCurrentHour(time.getHours());
    }, [localTime])

    useEffect(()=>{
        getKicks();
    },[currentHour]);

    const getKicks = async() =>{
        let token = localStorage.getItem('token');
        if(token){
            const time = new Date();

            const year = time.getFullYear();
            const month = time.getMonth();
            const day = time.getDate();
            const hour = time.getHours();

            console.log("Year is: " + year + " Month is: " + month + " Day is: " + day);
            try{
                const { data } = await axios.get(APIURL + 'api/v1/auth/kicks-hour',
                    { 
                        params:{
                            year,
                            month,
                            day,
                            hour,
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if(data.data && data.data.kicks)
                {
                    console.log(data.data);
                    setCurrentKick(data.data.kicks);
                    console.log("kicks set!");
                }
                else{
                    throw new Error("No data for given date.")
                }
            }
            catch(err){
                setCurrentKick(0);
                throw err;
            }
        }
        else{
            setCurrentKick(0);
            throw new Error("user not logged in.");
        }
    }

    const updateHour = async(time) => {
        if(time.getHours() === currentHour)
            return;
        
        setCurrentHour(time.getHours())
    }

    function updateTime(){
        let time = new Date();
        let timeString;
        (Number(time.getHours()) > 12) ? timeString = "" + (Number(time.getHours())-12).toString() : timeString = time.getHours();
        (Number(time.getMinutes()) < 10) ? timeString += ":0" + time.getMinutes() : timeString += ":" + time.getMinutes();
        (Number(time.getSeconds()) < 10) ? timeString+= ":0" + time.getSeconds() : timeString+= ":" + time.getSeconds();
        (Number(time.getHours()) > 12) ? timeString += " pm" : timeString += " am"
        setLocalTime(timeString);
        updateHour(time)
    }

    function timeUpdater(){
        updateTime();
        timeoutID = setTimeout(() => {
            updateTime();
        }, 1000)
    }

  return(
      <>
          <h1 className='time'> Current Time <br/> {`${localTime}`}</h1>
      </>
  );
};

export default Timer;