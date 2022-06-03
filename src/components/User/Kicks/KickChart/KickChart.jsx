import React, {useState, useEffect} from 'react';
import Chart from "react-apexcharts";
import './KickChart.css'

function KickChart({hours, date}){
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([]);

    const parseData = ()=>{
        let hoursData = [];
        let kicksData = [];
        for(let i = 0; i < hours.length; i++){
            let currentHour = hours[i].hour%12;
            if(currentHour === 0)
                currentHour = 12;
            let currentHourString = currentHour.toString();
            (hours[i].hour < 12) ? currentHourString = currentHourString + "am" : currentHourString = currentHourString + "pm";
            
            hoursData.push(currentHourString);
            kicksData.push(hours[i].kicks);
        }

        const seriesData = [{
            name: "Kicks",
            data: kicksData,
        }];
        
        const optionsData={
            chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
            },
            dataLabels: {
            enabled: false
            },
            stroke: {
            curve: 'straight'
            },
            title: {
            text: `Kicks for ${date}`,
            align: 'left'
            },
            grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
            },
            xaxis: {
            categories: hoursData,
            title: {
                text: 'Hours'
              }
            },
            yaxis: {
                title: {
                    text: 'Kicks'
                },
            },
        };
        
          setOptions(optionsData);
          setSeries(seriesData);
    }

    useEffect(()=>{
        parseData();
    },[hours])
  
    return (
        <>
            <Chart className={'kick-chart'} options={options} series={series} type="line" height={350} />
        </>
    );
}

export default KickChart;