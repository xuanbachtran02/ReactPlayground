import React from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { useApi, LoadingAnimation, monthNumtoName, monthNameToNumStr } from '../utils'

const CurrencyExChart = (props) => {
  let larger = props.unit_1
  let smaller = props.unit_2
  let datelist = ((new Date()).toString()).split(" ");
  let start_date = `${datelist[3] - 1}-${monthNameToNumStr[datelist[1]]}-${datelist[2]}`
  let end_date = `${datelist[3]}-${monthNameToNumStr[datelist[1]]}-${datelist[2]}`

  if (props.rate < 1) [smaller, larger] = [larger, smaller];

  const timeSeriesUrl = `https://api.exchangerate.host/timeseries?start_date=${start_date}&end_date=${end_date}&base=${larger}&symbols=${smaller}`
  const [yearRateData, yearRateError, yearRateLoading] = useApi(timeSeriesUrl)

  if (yearRateError || yearRateLoading || !yearRateData) 
  return <LoadingAnimation/>

  let yearRate = yearRateData.rates
  let dates = Object.keys(yearRate)
  let labels = []
  let data = []

  dates.map((date, index) => {
  if (date.substring(8, 10) == '01'){
      labels.push(`${monthNumtoName[date.substring(5, 7)]} ${date.substring(2, 4)}`)
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
    responsive: true,
  }

  return(
      <div class="ce-chart-container">
          <Line data={chartData} options={option} className='ce-linechart' height="125px" />
      </div>
  )
}

export default CurrencyExChart

  