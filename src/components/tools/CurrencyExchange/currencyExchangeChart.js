import React from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { useApi, LoadingAnimation } from '../utils'

const CurrencyExChart = (props) => {
  let larger = props.unit_1
  let smaller = props.unit_2
  let today = new Date();
  let start_date = `${today.getFullYear() - 1}-${today.getMonth() + 1}-${today.getDate()}`
  let end_date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

  if (props.rate < 1) [smaller, larger] = [larger, smaller];

  const timeSeriesUrl = `https://api.exchangerate.host/timeseries?start_date=${start_date}&end_date=${end_date}&base=${larger}&symbols=${smaller}`
  const [yearRateData, yearRateError, yearRateLoading] = useApi(timeSeriesUrl)

  if (yearRateError || yearRateLoading || !yearRateData) 
  return <LoadingAnimation/>

  const month_convert = {"01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun",
                        "07":"Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"}
  let yearRate = yearRateData.rates
  let dates = Object.keys(yearRate)
  let labels = []
  let data = []

  dates.map((date, index) => {
  if (date.substring(8, 10) == '01'){
      labels.push(`${month_convert[date.substring(5, 7)]} ${date.substring(2, 4)}`)
      data.push(yearRate[date][smaller])
  }
  })

  const chartData = {
      labels: labels,
      datasets: [
        {
          label: `${larger} price in ${smaller}`,
          data: data,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    };

  const option = {
    plugins:{   
      legend: {
        display: false
              },
        title: {
          display: true,
          text: `${larger} IN ${smaller} CHART`
        }
      },
    responsive: true
  }

  return(
      <div>
          <Line data={chartData} options={option} className='ce-linechart' height="125px" />
      </div>
  )
}

export default CurrencyExChart

  
  