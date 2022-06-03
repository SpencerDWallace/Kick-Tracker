import React from 'react';
import axios from 'axios';
import './KickCounter.css';

function KickCounter({currentKicks, setCurrentKick}){
    
    const updateKicks = async(kicks) =>{
        console.log("update kicks")
        let token = localStorage.getItem('token');
        if(token){
            const time = new Date();

            try{
            const { data } = await axios.post('https://kicktracker-backend.herokuapp.com/api/v1/auth/changekicks',{
                year:time.getFullYear(),
                month:time.getMonth(),
                day:time.getDate(),
                hour:time.getHours(),
                kicks:kicks,
            },
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            console.log(data);
            }
            catch(err){
            console.error(err);
            }
        }
        else{
            throw new Error("user not logged in.");
        }
    }

    const incrementKick = async() => {
        await updateKicks(currentKicks+1).then(()=>{
            setCurrentKick( prev=>prev + 1 )
        })
    }

    const decrementKick = async() => {
        if(currentKicks <= 0) 
            return; 
        await updateKicks(currentKicks-1).then(()=>{
        setCurrentKick( prev=>prev - 1 )
        })
    }

    return(
        <>
            <h2 className='kickcounter'> Kicks for this hour <br/><br/> {`${currentKicks}`}</h2>
            <div className='kickcounter-options-container'>
                <button className="kickcounter-option decrease" onClick={decrementKick} > &minus; </button>
                <button className="kickcounter-option increase" onClick={incrementKick} > &#x2B; </button>
            </div>
        </>
    );
};

export default KickCounter;