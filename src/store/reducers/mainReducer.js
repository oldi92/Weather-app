import * as actionTypes from '../actions/actionTypes';

const initialState = {
    longitude: null,
    latitude: null,
    data: [],
    data12: [],
    data5: [],
    personalData: [],
    weatherIcon: null,
    temp: null,
    weatherDescription: null,
    cityName: null,
    feelsLike: null,
    sunrise: null,
    windSpeed: null,
    sunset: null,
    loginSuccess: false,
    idToken: null,
    localId: null,
    celsius: true,
    personalDataToggle: true,
    firstPersonalDataAutoFetch : false,
    personalDataLoaded: false
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
        case actionTypes.FORECAST_12_SUCCESS:
            return {
                ...state,
                data12: action.data12
            }
        case actionTypes.FORECAST_5_SUCCESS:
            return{
                ...state,
                data5: action.data5
            }
        case actionTypes.LOGIN_SUCCESS:
            return{
                ...state,
                loginSuccess: true,
                idToken: action.idToken,
                localId: action.localId
            }
        case actionTypes.SIGNUP_SUCCESS:
            return{
                ...state,
                loginSuccess: true,
                idToken: action.idToken,
                localId: action.localId
            }
        case actionTypes.CELSIUS:
            return{
                ...state,
                celsius: !state.celsius
            }
        case actionTypes.PERSONAL_DATA_TOGGLE:
            return{
                ...state,
                personalDataToggle: !state.personalDataToggle
            }
        case actionTypes.PERSONAL_DATA_RESET:
            return{
                ...state,
                personalDataToggle: true
            }
        case actionTypes.FIRST_PERSONAL_DATA_AUTO_FETCH_SUCCESS:
            return{
                ...state,
                firstPersonalDataAutoFetch: true
            }
        case actionTypes.PERSONAL_INFO_FETCH_SUCCESS:
            return{
                ...state,
                personalData: action.personalData
            }
        case actionTypes.PERSONAL_DATA_LOADED:
            return{
                ...state,
                personalDataLoaded: !state.personalDataLoaded
            }
        case actionTypes.SET_LOCALID_IDTOKEN:
            return{
                ...state,
                localId: action.localId,
                idToken: action.idToken
            }
        default: return state
    }
}

export default mainReducer;

