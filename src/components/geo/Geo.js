import React, { Component } from "react";

class Geo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {


    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    }

    
  }

  render() {
    return (
      <div>
        <h4>Using geolocation JavaScript API in React</h4>
      </div>
    );
  }
}

export default Geo