import React from 'react';

import classes from './Forecast5List.module.css'
import moment from 'moment';

const Forecast5List =  (props) => {
    const icon = require(`../../../assets/WeatherIcons/${props.weatherIcon}.png`);

    return (
    <li className={classes.Forecast5List}>
        <div>{moment(props.date).format('ddd')} </div>
        <div><img src={icon} alt='Forecast 5 days icon'/></div>
        <div style={{display: 'flex'}}>
            <div style={{paddingRight: '60px'}}>
                {props.celsius
                ? props.maxTemp + '°'
                : (props.maxTemp * 1.8 + 32).toFixed(0) + '°F'
                }
            </div>
            <div>
                {props.celsius
                ? props.minTemp + '°'
                : (props.minTemp * 1.8 + 32).toFixed(0) + '°F'
                }
            </div> 
        </div>
              
    </li>
    )
}

export default Forecast5List