import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Kicks.css';
import KickTable from './KickTable/KickTable';

function Kicks({}){
    const [loading, setLoading] = useState(false);

    return(
    <div className="kicks background">
        {loading &&
        <div className='loading-page'>
            <div className='loader'/>
        </div>
        }
        {!loading &&
        <div className='kicks-container'>
            <KickTable loading={loading} setLoading={setLoading}/>
        </div>
        }
    </div>
    );
};

export default Kicks;