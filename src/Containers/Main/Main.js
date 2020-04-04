import React, { Component } from 'react';
import { connect } from 'react-redux';

import WeatherNow from '../../Components/WeatherNow/WeatherNow';
import Forecast from '../../Components/Forecast/Forecast'
import classes from './Main.module.css';
import * as actions from '../../store/actions/indexActions';

class Main extends Component {

    componentDidMount() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.getGeolocation);          
        }
    }

    getGeolocation = (position) => {  
        console.log(position.coords.latitude, position.coords.longitude);
        this.props.onGeolocation(position.coords.longitude, position.coords.latitude)  
        this.props.onCurrentWeather(position.coords.longitude, position.coords.latitude)
      }

    render() {   

        let weatherDiv = null
        if(this.props.weatherIcon){
            weatherDiv = <WeatherNow/>    
        } else {
            this.getGeolocation = (position) => {  
                this.props.onGeolocation(position.coords.longitude, position.coords.latitude)  
                this.props.onCurrentWeather(this.props.longitude, this.props.latitude)
              }
        }

        let forecastDiv= null;

        if(this.props.longitude){
            forecastDiv = <Forecast />                            
        }
        
        return (
            <div className={classes.Main}>
                <h1>Weather App</h1>
                {weatherDiv}   
                {forecastDiv}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        longitude: state.longitude,
        latitude: state.latitude, 
        weatherIcon: state.weatherIcon       
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onGeolocation: (longitude, latitude) => dispatch(actions.geolocation(longitude, latitude)),
        onCurrentWeather: (longitude, latitude) => dispatch(actions.currentWeather(longitude, latitude))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)