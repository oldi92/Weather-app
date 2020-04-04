import * as actionTypes from '../actions/actionTypes';

const initialState = {
    longitude: null,
    latitude: null,
    data: [],
    weatherIcon: null,
    temp: null,
    weatherDescription: null,
    cityName: null,
    feelsLike: null,
    sunrise: null,
    windSpeed: null,
    sunset: null,
    data24: null,
}; 

const mainReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.GEOLOCATION:
            return {
                ...state,
                longitude: action.longitude,
                latitude: action.latitude
            }
        case actionTypes.CURRENT_WEATHER_SUCCESS:
            return {
                ...state,
                data: action.data,
                weatherIcon: action.data.map( element => {
                    return element.weather.icon 
                    }),
                temp: action.data.map( element => {
                    return element.temp.toFixed(0)
                    }),
                weatherDescription: action.data.map( element => {
                    return element.weather.description
                    }),
                cityName: action.data.map( element => {
                    return element.city_name
                    }),
                countryCode: action.data.map( element => {
                    return element.country_code
                    }),
                feelsLike: action.data.map( element => {
                    return element.app_temp.toFixed(0)
                    }),
                precipitation: action.data.map( element => {
                    return element.precip
                    }),
                sunrise: action.data.map( element => {
                    return element.sunrise
                    }),
                windSpeed: action.data.map( element => {
                    return element.wind_spd
                    }),
                humidity: action.data.map( element => {
                    return element.rh
                    }),
                sunset: action.data.map( element => {
                    return element.sunset
                    }),
            }
        case actionTypes.FORECAST_24_SUCESS:
            return {
                ...state,
                data24: action.data24
            }
        default: return state
    }
}

export default mainReducer;

