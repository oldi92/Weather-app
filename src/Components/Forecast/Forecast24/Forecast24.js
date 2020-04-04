import React, { Component } from 'react';
import moment from 'moment'
import classes from './Forecast24.module.css';

class Forecast24 extends Component {
    render(){
    const icon = require(`../../../assets/WeatherIcons/${this.props.weatherIcon}.png`);
    return (        
            <div className={classes.Forecast24}> 
            <h2>{moment(this.props.date.toString()).calendar()}<hr style={{                
                                                            backgroundColor: 'white',
                                                            width:'42%',
                                                            marginLeft:'0',                                     padding: '0' }}/></h2>
            <ul>
            <li>
                Temp <br/>
                {this.props.temp} °     
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