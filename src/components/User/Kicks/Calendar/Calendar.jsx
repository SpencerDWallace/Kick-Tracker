import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import './Calendar.css';

function CalendarInternal({setLoading, getHours, setDateString}) {
  const [date, setDate] = useState(new Date());
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',  'Sep', 'Oct', 'Nov', 'Dec']

  useEffect(()=>{
    getValidDays();
  },[])

  const getValidDays = async(year, month, useParams)=>{
    let token = localStorage.getItem('token');
    if(token){
        const time = new Date();
        if(useParams)
            ;
        else{
            year = time.getFullYear();
            month = time.getMonth();
        }
        try{
            const { data } = await axios.get('https://kicktracker-backend.herokuapp.com/api/v1/auth/valid-days',
                { 
                    params:{
                        year,
                        month,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if(data.data)
            {
                for(let i = 0; i < data.data.length; i++){
                    const validDay = document.querySelector(`[aria-label='${data.data[i]}'`)   
                    validDay.classList.add('valid-date')
                }             
            }
            else{
                throw new Error("No data for given date.")
            }
        }
        catch(err){
            throw err;
        }
    }
    else{
        throw new Error("user not logged in.");
    }
}

  const dateClicked = async (event) =>
  {
    console.log(String(event));
    const newDate = String(event).split(" ");
    const time = new Date();
    if(time < event)
      return;
      
    let month = -1; //-1 if not updated in for loop

    for(let i = 0; i < months.length; i++){
      if(months[i] === newDate[1]){
        month = i; 
        break;
      }
    }

    const day = Number(newDate[2]).toString();
    const year = newDate[3];
    console.log(day)
    if(month === -1)
      return;

    getHours(Number(year), month, Number(day), true).then(()=>{
      setDate(event);
      setDateString(year, Number(month)+1, day);
    })      
  }

  const viewChanged = async(event)=>{
    const newDate = String(event.activeStartDate).split(" ");
    let month = newDate[1];
    const year = newDate[3];

    for(let i = 0; i < months.length; i++){
      if(months[i] === newDate[1]){
        month = i; 
        break;
      }
    }

    getValidDays(Number(year), Number(month), true);
  }

  return (
    <div className='calendar'>
      <div className='calendar-container'>
        <Calendar onChange={dateClicked} onActiveStartDateChange={viewChanged} value={date} />
      </div>
    </div>
  );
}

export default CalendarInternal;