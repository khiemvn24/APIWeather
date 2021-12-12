import './App.css';
import axios from "axios";
import React, {useState,useEffect} from "react"
// const api = {
//   key: '9295049b16ae30fbb6fbb1e74899de83',
//   base:'http://api.openweathermap.org/data/2.5'
// }
function App() {
  const dateBuilder = (d) =>{
    let months = ["Junuary", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  const [weatherData, setweatherData] = useState([]);
  const [text, setText] = useState('');
  const search = evt =>{
    if(evt.key === "Enter")
    {
      getWeather();
    }
  }

  useEffect(() =>{
   getWeather();
  },[]);
  const getWeather = async () =>{
    try {
      let weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=90da14e50a0ad3055b481d215c1dbb4f&units=metric`)
      setweatherData(weather);
    } catch (error) {
      alert("Bạn đã nhập sai tên tành phố: ", error)
    }
    setText('');
  }

  return (
    <div className= {
      (typeof weatherData.data != "undefined") ? 
      ((weatherData.data.main.temp > 16) ? 
      'App Warm' : 'App')
      :'App' 
    }>
      <div className="main">
        <input type="text" placeholder="search...." className="input" onKeyPress={search}
          onChange={e =>setText(e.target.value)}
          value={text}/>
        {(typeof weatherData.data != "undefined") ? (
          <div>
             <div className="weather">
              <div className="weather_location">
                {weatherData.data.name},{weatherData.data.sys.country}
              </div>
              <div className="weather_date">
              {dateBuilder(new Date())}
              </div>
            </div>
            <div className="Temp">
               <div className="Temp_temp">
                  <span>{Math.round(weatherData.data.main.temp)}<sup>o</sup>C</span>
               </div>
                <div className="Temp_Clouds">
                 {weatherData.data.weather[0].main}
                </div>
             </div>
        </div>
        ) : ('')}
      </div>
    </div>
  );
}

export default App;