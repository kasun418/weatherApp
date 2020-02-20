import React from "react";
import "./App.css";

import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./app_component/weather.component";
import Form from "./app_component/form.component";

//api call  api.openweathermap.org/data/2.5/weather?q=London,uk
const API_KEY = "185c1f1c2a0e66236057b1fcf252202e";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    //this.getWeather();
  }

  weatherIcon = {
    Thunderstome: "wi-thunderstorm",
    Sunny: "wi-day-sunny",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clouds: "wi-day-fog"
  };

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  getWeatherCondition(icon, rangeid) {
    switch (true) {
      case rangeid >= 200 && rangeid < 233:
        this.setState({ icon: this.weatherIcon.Thunderstome });
        break;
      case rangeid >= 300 && rangeid < 322:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeid >= 500 && rangeid < 532:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeid >= 600 && rangeid < 623:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeid >= 701 && rangeid < 782:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeid >= 801 && rangeid < 805:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      case rangeid === 800:
        this.setState({ icon: this.weatherIcon.Sunny });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const weather_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`;

    if (city && country) {
      const api_call = await fetch(weather_URL);
      const response = await api_call.json();

      console.log(response);

      this.setState({
        city: `${response.name},${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      this.getWeatherCondition(this.weatherIcon, response.weather[0].id);
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          temp_celsius={this.state.celsius}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
