import * as actionTypes from './actionTypes';
import axios from 'axios'

export const currentWeatherSuccess = (data) => {
    return {
        type:actionTypes.CURRENT_WEATHER_SUCCESS,
        data: data
    }
}


export const currentWeather = (longitude, latitude) => {
    return dispatch => {
        const lon = longitude;
        const lat = latitude;
        axios.post(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=3fab93ee25494833b253c5e6e3eff0a3`)
        .then( response => {
                //const data = response.data.data.map( element => {
                  //  return element.temp  
                //})
                const  data = response.data.data
                console.log('RESPOSE DATA ',data);
                dispatch(currentWeatherSuccess(data));
            }
        )
    };
}

export const geolocation = (longitude, latitude) => {
    return {
        type: actionTypes.GEOLOCATION,
        longitude: longitude,
        latitude: latitude
    }
}

export const forecastfetch24Sucess = ( data ) => {
    return {
        type: actionTypes.FORECAST_24_SUCESS,
        data24: data
    }
}

export const forecastFetch= (longitude, latitude) => {
    return dispatch => {
        const lon = longitude;
        const lat = latitude
        axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?&lat=${lat}&lon=${lon}&key=3fab93ee25494833b253c5e6e3eff0a3&hours=12`)
        .then( response => {
            console.log('[FORECAST RESPONSE]' ,response.data.data);  
            dispatch(forecastfetch24Sucess(response.data.data))          
        })
    }
}