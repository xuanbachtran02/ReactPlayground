import { useEffect, useState } from 'react'
import './weatherWidget.css'
import {Button} from 'react-bootstrap'

const axios = require('axios').default;

// useState syntax: [ {current state}, {function to update current state} ] = useState({default state})

function TimeConverter(unix_time) {
  const array = ['day', 'date', 'month', 'year','time', 'tz']
  const milliseconds = unix_time * 1000;
  const datestr = (new Date(milliseconds)).toUTCString();
  const time_map = new Map()
  const dlist = datestr.split(" ").map(item => item.replace(",", " ").trim(" "));

  dlist.map((item, index) => time_map[array[index]] = item);

  return time_map;
}

const getIcon = (main, unix_time) => {
  const time_map = TimeConverter(unix_time)
  const hour = (time_map['time']).substring(0, 2)
  
  var isDay = (hour >= 6 && hour < 18)? true : false
  let src = './weather-icon/'
  const arr = ["Rain", "Snow", "Fog", "Clouds", "Clear"]

  switch(main){
    case 'Thunderstorm':
      src += 'thunderstorms-rain'; break;
    case 'Drizzle':
      src += 'drizzle'; break
    case 'Rain':
      src += 'partly-cloudy-rain'; break
    case 'Snow':
      src += 'partly-cloudy-snow'; break
    case 'Haze':
      src += 'haze'; break;
    case 'Mist':
      src += 'mist'; break;
    case 'Smoke':
      src += 'smoke'; break;
    case 'Fog':
      src += 'fog'; break;
    case 'Dust':
      src += 'dust'; break;
    case 'Tornado':
      src += 'tornado'; break;
    case 'Clouds':
      src += 'partly-cloudy'; break;
    case 'Clear':
      src += 'clear'; break;
    default: 
      src += 'not-available'; break;
  }

  if (arr.includes(main)){
    if (isDay === true) src += '-day';
    else src += '-night';
  }

  return(
    <img src={require(src + '.svg').default} width='160px' height='160px'/>
  )
}

const processTime = (unix_time) => {

  const timeMap = TimeConverter(unix_time)
  const date = timeMap['date']
  const month = timeMap['month']

  const get_th = (date) => {
    if (date > 3 && date < 21) return 'th';
      switch (date % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
      }
  } 

  return `${date}${get_th(date)} ${month}`
}


function MyComponent() {
  const [error, setError] = useState(null);
  const [apiData, setData] = useState({});
  const [city, setCity] = useState("Sunnyvale")
  const [getCity, setGetCity] = useState()

  const weather_api_key = process.env.REACT_APP_OPEN_WEATHER_API
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weather_api_key}`


  useEffect(() => {
    axios.get(apiUrl)
      .then(
        (response) => {
          console.log(response)
          setData(response);
        },

        (error) => {
          setError(error);
        }
      )
  }, [apiUrl]);


  const submitHandler = () => {
    setCity(getCity);
  }

  const inputHandler = (event) => {
    setGetCity(event.target.value);
  }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // } else 
  {
  return (
    <div>
      {apiData.data ? (

      <div className="weather-widget">

        <article className="widget" id="weather_widget">
          <div className="weatherIcon"> {getIcon(apiData.data.weather[0].main, apiData.data.dt + apiData.data.timezone)}</div>
          <div className="weatherInfo">
          <div className="temperature" id="temperature"><span>{Math.round(apiData.data.main.temp)}&deg;</span></div>
          <div className="description">    
              <div className="weatherCondition" id="weatherCondition">{apiData.data.weather[0].main}</div>    
              <div className="location" id="location">{apiData.data.name}, {apiData.data.sys.country}</div>
          </div>
          </div>
          <div className="date" id="date">{processTime(apiData.data.dt + apiData.data.timezone)}</div>
          <div>{TimeConverter(apiData.data.dt + apiData.data.timezone)}</div>
        </article>

        <div className="ww_user_input"> 
          <input id="ww_user_input_city" type="text" placeholder="Enter city name" onChange={inputHandler} /> 
          {/* <Button variant="outline-secondary">Submit</Button>{' '} */}
          <button id="search_ww" onClick={submitHandler}></button>
        </div> 
      
        </div>) : ( <h2 id='ww_loading'>Loading...</h2> )}
    </div>
    );
  }
}

export default MyComponent;


// for reference: https://reactjs.org/docs/faq-ajax.html 