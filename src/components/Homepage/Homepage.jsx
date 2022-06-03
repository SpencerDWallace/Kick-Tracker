import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import Timer from './Timer/Timer';
import KickCounter from './KickCounter/KickCounter';

function Homepage({currentKicks, setCurrentKick}){

    return(
    <div className="homepage background">
        <div className='homepage-container'>
            <Timer setCurrentKick={setCurrentKick}/>
            <KickCounter currentKicks={currentKicks} setCurrentKick={setCurrentKick}/>
        </div>
    </div>
    );

};

export default Homepage;