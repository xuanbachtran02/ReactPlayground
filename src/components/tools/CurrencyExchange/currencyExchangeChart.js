import React from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Price in VND",
      data: [23344.598819, 23086.158374, 23017.070808, 22985.62902, 23169.813824, 23062.12568, 23049.064878, 22999.349804, 22720.955474, 22731.640725, 22698.770228, 22704.777893 ],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    }
  ]
};

export default function CurrencyExChart() {
  return (
    <div className="App">
      <Line data={data}/>
    </div>
  );
}

  
  