import React, { Component } from 'react';

import moment from 'moment'
import classes from './Forecast12List.module.css';

class Forecast24 extends Component {

    render(){
    const icon = require(`../../../assets/WeatherIcons/${this.props.weatherIcon}.png`);
    return (        
            <div className={classes.Forecast24}> 
            <h2>{moment(this.props.date.toString()).calendar()}<hr style={{                
                                                            backgroundColor: 'white',
                                                            width:'63%',
                                                            marginLeft:'0',                                     padding: '0' }}/></h2>
            <ul>
            <li>
                Temp <br/>
                {this.props.celsius 
                ? this.props.temp + '° '
                :(this.props.temp * 1.8 +32).toFixed(0) + '°F'
                }   
            </li>
            <li>
                 Humidity <br/> 
                 {this.props.humidity} %
            </li>
            <li>
                Wind <br/>
                {this.props.windSpeed} m/s                
            </li>
            <li>
                {this.props.weatherDescription}                
            </li>
            <li>
            <img src={icon} alt='DailyIcon'/>
            </li>          
            </ul>

            </div>      
        )
    }
} 


export default Forecast24