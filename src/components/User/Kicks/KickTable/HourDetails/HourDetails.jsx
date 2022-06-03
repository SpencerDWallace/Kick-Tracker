import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './HourDetails.css'

function HourDetails({edit, hour, removeHour, updateHour}){
    
    const [kicks, setKicks] = useState(hour.kicks);

    useEffect(()=>{
        setKicks(hour.kicks);
    },[hour])

    let hourString;
    if(hour.hour < 12)
        hourString = "am"
    else
        hourString = "pm"

    const convertedHour = hour.hour%12;

    if(convertedHour === 0)
        hourString = "12" + hourString;
    else
        hourString = convertedHour + hourString;
        
    return(
    <>
        {!edit &&
                <thead role="rolegorup">
                <tr role="row">
                    <th role="cell">{`${hourString}`}</th>
                    <th role="cell">{`${hour.kicks}`}</th>
                </tr>
            </thead>
        }
        {edit &&
                <thead role="rolegorup">
                <tr role="row">
                    <th role="cell">{`${hourString}`}</th>
                    <th role="cell" className='hourdetails-edit-options'>
                        <input type="number" name='kicks' value={`${kicks}`} onChange={ (event)=>{ if( event.target.value !== "" && Number.isNaN(event.target.valueAsNumber)) return; setKicks(event.target.valueAsNumber); updateHour(hour.hour, event.target.valueAsNumber); event.preventDefault(); } }/>
                        <button className='hourdetails-edit-option' onClick={ ()=>{removeHour(hour.hour)} }>&#x2716;</button>
                    </th>
                </tr>
            </thead>
        }
    </>
    );
};

export default HourDetails;