import React , {useState} from 'react';
import './App.css';

const Api={
  key:"MY_API_KEY",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query,setQuery]=useState('')
  const [weather,setWeather]=useState({})
  const [classes,setClasses]=useState('location')
  const [classes1,setClasses1]=useState('date')
  const [classes2,setClasses2]=useState('weather')

  const search=evt=>{
    setClasses('location')
    setClasses1('date')
    setClasses2('weather')
    if (evt.key==="Enter"){
      fetch(`${Api.base}weather?q=${query}&units=metric&APPID=${Api.key}`)
        .then(res=>res.json())
        .then(result=> {
          if (result.message==="city not found"){
            alert('Enter a valid Location...!!!');
            return;
          }
          setClasses('location animate')
          setClasses1('date animate1')
          setClasses2('weather animate2')
          setWeather(result)
          setQuery('');
        });
    }
  }

  const databulider=(d)=>{
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }


  const selectClass=()=>{
    let c;
    if (typeof weather.main!="undefined"){
      if (weather.main.temp<-20){
        c="App veryCold";
      }
      else if (weather.main.temp<0 && weather.main.temp>-20){
        c="App cold"
      }
      else if (weather.main.temp<20 && weather.main.temp>0){
        c="App warm"
      }
      else if (weather.main.temp>20 && weather.main.temp<40){
        c="App hot"
      }
      else {
        c="App veryHot"
      }
    }
    else {
      c="App";
    }
    return c;
  }

  return (
    <>
    <div className={selectClass()}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." onChange={e=> setQuery(e.target.value)} value={query} onKeyPress={search}>

          </input>
        </div>
        {(typeof weather.main!="undefined") ? (
          <div id="main-box">
            <div className="location-box">
              <div className={classes}>{weather.name},{weather.sys.country}</div>
              <div className={classes1}>{databulider (new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}*C
              </div>
              <div className={classes2}>
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
    </>
  )
}

export default App;
