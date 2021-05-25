import React,{useState,useEffect} from 'react'
import {fetchDailyData} from '../../api'
import { Line,Bar } from 'react-chartjs-2'
import styles from './Chart.module.css';

const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {
    

    const [dailyData,setDailyData] = useState([]);

    useEffect(()=>{
        const fatchApi = async() =>{
            setDailyData(await fetchDailyData());
        }
        console.log(dailyData);
        fatchApi();
    },[]);

    const data = {
        labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
        datasets: [
          {
            label: "First dataset",
            data: dailyData.map((data) => data.confirmed),
            fill: true,
            label: 'Infected',
            borderColor: '#3333ff',
            pointBorderWidth:0,
            pointHoverRadius:10,
            pointRadius:0,
        
            
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
            pointBorderWidth:0,
            pointHoverRadius:10,
            pointRadius:0,
          },
          {
            data:null,
            label: 'Recovered',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
          },
        ]
      };

    const lineChart = (
        dailyData.length ? (
            <Line data={data} />
        ) : null
      );
    const barChart = (
      confirmed
      ? (
        <Bar
            data={{
                labels:['Infected','Recovered','Deaths'],
                datasets:[{
                  label:'People',
                  backgroundColor:['rgba(0,0,255,0.5)','rgba(0,255,0,0.5)','rgba(255,0,0,0.5)'],
                  data:[confirmed.value,recovered.value,deaths.value],
                }]
            }}
            options={{
              legend:{display:false},
              title:{display:true,text:`Current state in ${country}`},
            }}
        />
      ): null
    )
    return (
        <div className={styles.container}>
          {country ? barChart :lineChart}
        </div>
    )
}

export default Charts
