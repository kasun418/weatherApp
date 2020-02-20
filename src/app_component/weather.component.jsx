import React from "react";
import "./form.style.css";

const Weather = props => {
  return (
    <div className="container">
      <div className="cards pt-5">
        <h1 className="py-4">{props.city}</h1>
        <h5 className="py-4">
          <i className={`wi ${props.weatherIcon} display-1`} />
        </h5>
        {props.temp_celsius ? (
          <h1 className="py-2">{props.temp_celsius}&deg;C</h1>
        ) : (
          ""
        )}

        {minmaxtemp(props.temp_min, props.temp_max)}

        <h4 className="py-1">{props.description}</h4>
      </div>
    </div>
  );
};

function minmaxtemp(min, max) {
  if (min && max) {
    return (
      <h3>
        <span className="px-5">{min}&deg;C</span>
        <span className="px-5">{max}&deg;C</span>
      </h3>
    );
  }
}

export default Weather;
