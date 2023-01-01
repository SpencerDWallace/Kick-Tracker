import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './KickTable.css';
import HourDetails from './HourDetails/HourDetails';
import AddHour from './AddHour/AddHour';
import Calendar from '../Calendar/Calendar';
import KickChart from '../KickChart/KickChart';

function KickTable({loading, setLoading}){
    const [date, setDate] = useState("")
    const [hours, setHours] = useState([])
    const [modifiedHours, setModifiedHours] = useState([])
    const [edit, setEdit] = useState(false);

    const getHours = async(year, month, day, useParams) =>{
        let token = localStorage.getItem('token');
        if(token){
            const time = new Date();
            if(useParams)
                ;
            else{
                year = time.getFullYear();
                month = time.getMonth();
                day = time.getDate();
            }
            console.log("Year is: " + year + " Month is: " + month + " Day is: " + day);
            try{
                const { data } = await axios.get(APIURL + 'api/v1/auth/kicks-day',
                    { 
                        params:{
                            year,
                            month,
                            day,
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if(data.data && data.data.hours)
                {
                    console.log(data.data.hours);
                    setHours(data.data.hours);
                    console.log("hours set!");
                }
                else{
                    setHours([]);
                    console.log("No data for given date.")
                }
            }
            catch(err){
                // console.error(err);
                throw err;
            }
        }
        else{
            throw new Error("user not logged in.");
        }
    }

    const updateDay = async()=>{
        let token = localStorage.getItem('token');
        if(token){
            const dateString = date.toString().split("-");
            const year = Number(dateString[2]);
            const month = Number(dateString[0]) - 1;
            const day = Number(dateString[1]);
            console.log("Year is: " + year + " Month is: " + month + " Day is: " + day);
            try{
                const { data } = await axios.patch(APIURL + 'api/v1/auth/update-day',
                    { 
                        year,
                        month,
                        day:{day:day, hours:modifiedHours},
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if(data.data && data.data.hours)
                {
                    console.log(data.data.hours);
                    setHours(data.data.hours);
                    console.log("day updated!");
                }
                else{
                    throw new Error("update failed.")
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

    const updateKicks = async()=>{
        console.log("update kicks!");
        console.log(modifiedHours);
        await updateDay();
    }

    const resetKicks = async()=>{
        let newHours = [];
        for(let i = 0; i < hours.length; i++){
            const hour = {hour:hours[i].hour, kicks:hours[i].kicks}
            newHours.push(hour);
        }
        setModifiedHours(newHours);
    }

    const removeHour = (hourToRemove) =>{
        const newHours = modifiedHours.filter(hour => hour.hour !== hourToRemove);
        setModifiedHours(newHours);
    }

    const updateHour = (hourToUpdate, kicks)=>{
        if( Number.isNaN(kicks) || kicks[kicks.length - 1] < "0" ||  kicks[kicks.length - 1] > "9" || kicks[kicks.length - 1]  === "e")
            return;

        for(let i = 0; i < modifiedHours.length; i++){
            if(modifiedHours[i].hour === hourToUpdate){
                let newModifiedHours = modifiedHours;
                newModifiedHours[i].kicks = Number(kicks);
                setModifiedHours(newModifiedHours);
                return;
            }
        }
    }

    const setDateString = (year, month, day) =>{
        let currentDateString;
        (month < 9)? currentDateString = "0" + Number(month).toString() : currentDateString = Number(month).toString();
        (day <= 9)? currentDateString += "-0" + day.toString() : currentDateString += "-" + day.toString();
        currentDateString += "-" + year.toString();
        setDate(currentDateString);
    }

    const addHour = (hour) =>{
        if(Number.isNaN(hour))
            return;

        let newHours = [];
        for(let i = 0; i < modifiedHours.length; i++){
            const hour = {hour:modifiedHours[i].hour, kicks:modifiedHours[i].kicks}
            newHours.push(hour);
        }

        for(let i = 0; i < modifiedHours.length; i++){
            if(modifiedHours[i].hour === hour)
                return;
            if(modifiedHours[i].hour > hour)
            {
                newHours.splice(i, 0, {hour:hour, kicks:0});
                setModifiedHours(newHours);
                console.log(newHours);
                return;
            }
        }
        newHours.push({hour, kicks:0});
        setModifiedHours(newHours);
    }

    useEffect(()=>{
        getHours();
        const currentDate = new Date();
        setDateString(currentDate.getFullYear(), currentDate.getMonth()+1, currentDate.getDate())
    },[])

    useEffect(()=>{
        let newHours = [];
        for(let i = 0; i < hours.length; i++){
            const hour = {hour:hours[i].hour, kicks:hours[i].kicks}
            newHours.push(hour);
        }
        setModifiedHours(newHours);
    },[hours])

    return(
        <>
        { !loading &&
        <>
        <Calendar setLoading={setLoading} getHours={getHours} setDateString={setDateString}/>
        <div className="kicktable">
            <h1 className='kicktable-date user-form-header'> {`${date}`}</h1>
            <div className='kicktable-edit-options' >
                {!edit &&
                    <button className='kicktable-edit-option' onClick={()=>{setEdit(prev => !prev)}}> Edit </button>
                }
                {edit &&
                <>
                    <button className='kicktable-edit-option' onClick={ ()=>{ console.log(hours); resetKicks(); setEdit(prev => !prev); } }> Cancel </button>
                    <button className='kicktable-edit-option' onClick={ ()=>{ updateKicks(); setEdit(prev => !prev); } }> Save </button>
                </>
                }
            </div>
            {edit &&
                <div>
                    <AddHour hours={modifiedHours} addHour={addHour}/>
                </div>
            }
            <div className='kicktable-details'>
                <table role="table">
                    <thead role="rolegorup" >
                        <tr role="row">
                            <th scope="col" role="columnheader" className='th-half'> Hour </th>
                            <th scope="col" role="columnheader" className='th-half'> Kicks </th>
                        </tr>
                    </thead>
                    {   modifiedHours.length !== 0 && 
                        modifiedHours.map(hour =>(
                            <HourDetails key={"hour:" + hour.hour + " kicks:" + hour.kicks} edit={edit} hour={hour} removeHour={removeHour} updateHour={updateHour}/>
                        ))
                    }
                </table>
            </div>
        </div>
        <KickChart hours={hours} date={date}/>
        </>
        }
        </>
    );
};

export default KickTable;