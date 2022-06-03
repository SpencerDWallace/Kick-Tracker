import React, {useState, useEffect} from 'react';
import Select from 'react-select'
import './AddHour.css';

function AddHour({hours, addHour}){

    const [AM, setAM] = useState([]);
    const [PM, setPM] = useState([]);
    const [selectHours, setSelectHours] = useState([]);
    const [AMPM, setAMPM] = useState([]);
    const [selectValue, setSelectValue] = useState(NaN);


    const updateLimitOptions = ()=>{
        let limitOptions = [];
        const defaultData = { 'value': 'none', "label": 'none'};
        limitOptions.push(defaultData);
        const allowedHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        let AMHours = []; let PMHours = [];
        for(let i = 0; i < allowedHours.length; i++)
        {
            let hourDoesNotExist = true;
            for(let j = 0; j < hours.length; j++)
                {
                    if(allowedHours[i] === hours[j].hour)
                        hourDoesNotExist = false;
                }
            if(hourDoesNotExist){
                let labelValue = allowedHours[i]%12;
                if(labelValue === 0) 
                    labelValue = '12';

                if(allowedHours[i] < 12)   
                    AMHours.push({'value': allowedHours[i], "label": labelValue})
                else
                    PMHours.push({'value': allowedHours[i], "label": labelValue})
            }
        }   
        setAM(AMHours);
        setPM(PMHours);

        const AMPMSelect = [{'value': 0, "label": 'AM'},{'value': 1, "label": 'PM'}]
        setAMPM(AMPMSelect);
    }

    useEffect(() => {
        updateLimitOptions();
    }, [hours]); 

    const changeAMPM = (event)=>{
        (event.value) ? setSelectHours(PM) : setSelectHours(AM); 
    }

    const updateSelectValue = (event)=>{
        setSelectValue(event.value);
    }

    return(
        <div className={'add-hour'}>
            <h2 style={{margin:'2rem 0 2rem'}}>Add Hour</h2>
            <div className={'add-hour-select-container'}>
                <Select placeholder='Hour' options={selectHours} onChange={updateSelectValue}/>  
                <Select placeholder='AM/PM' options={AMPM} onChange={changeAMPM}/>  
            </div>
            <button className={'submit'} onClick={()=>{addHour(selectValue)}} style={{padding:'0.4rem 0.7rem', marginTop:'2rem'}} >Add</button>
        </div>
    )
}

export default AddHour