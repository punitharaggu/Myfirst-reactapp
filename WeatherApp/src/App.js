import React from "react";

import Titles from "./component/title";
import Form from "./component/form";
import Weather from "./component/weather";

const API_KEY = "94a8b8764d87b3618e997e7042e1ffc6";
const API_KEY1= "a7e6e0fd26c1409f80870189d6892402";

class App extends React.Component {
  state = {
    pending:false,
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    latitude: undefined,
    longitude: undefined,
    error: undefined
  }

  getWeather = async (e) => {
   this.setState({pending:true});
   this.setState({haserror:false});
   try{
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    localStorage.setItem(city,country);
    localStorage.getItem(city,country);
    e.preventDefault();
    e.target.reset();

    if (city && country) {

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const api_call1 = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city},${country}&key=${API_KEY1}`);

    const data = await api_call.json();
    const data1 = await api_call1.json();
    console.log(data, data1);

   this.setState({ pending: false, data });
      this.setState({

        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        latitude: data1.data[0].lat,
        longitude: data1.data[0].lon,
        error: ""
      });


    } else {

        this.setState({haserror:true});

    }
  }
  catch(e)
  {
    this.setState({haserror:true});
  }
  }
  render() {



    if(this.state.haserror){
      return(
        <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                    <p className="loader">Please Enter Valid Input</p>
                 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );}

    if(this.state.pending){
        return(
            <div>
              <div className="wrapper">
                <div className="main">
                  <div className="container">
                    <div className="row">
                      <div className="col-xs-5 title-container">
                        <Titles />
                      </div>
                        <div className="col-xs-7 form-container">
                          <Form getWeather={this.getWeather} />
                            <p className="loader">Loading....</p>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
        );}


    return (

      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather

                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
