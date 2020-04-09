import * as actionTypes from './actionTypes';
import axios from 'axios'


export const geolocation = (longitude, latitude) => {
    return {
        type: actionTypes.GEOLOCATION,
        longitude: longitude,
        latitude: latitude
    }
}

export const currentWeather = (longitude, latitude) => {
    return dispatch => {
        const lon = longitude;
        const lat = latitude;
        axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=3fab93ee25494833b253c5e6e3eff0a3`)
        .then( response => {
                //const data = response.data.data.map( element => {
                  //  return element.temp  
                //})
                const  data = response.data.data
                dispatch(currentWeatherSuccess(data));
            }
        )
    };
}
export const currentWeatherSuccess = (data) => {
    return {
        type:actionTypes.CURRENT_WEATHER_SUCCESS,
        data: data
    }
}

export const forecastFetch= (longitude, latitude) => {
    return dispatch => {
        const lon = longitude;
        const lat = latitude
        axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?&lat=${lat}&lon=${lon}&key=3fab93ee25494833b253c5e6e3eff0a3&hours=12`)
        .then( response => {
            dispatch(forecastfetch12Success(response.data.data))          
        })
    }
}
export const forecastfetch12Success = ( data ) => {
    return {
        type: actionTypes.FORECAST_12_SUCCESS,
        data12: data
    }
}

export const forecast5Fetch = (longitude, latitude) => {
    return dispatch => {
        const lon = longitude
        const lat = latitude
        axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=3fab93ee25494833b253c5e6e3eff0a3&days=5`)
        .then( response => {
            dispatch(forecast5FetchSuccess(response.data.data))          
        })
    }
}
export const forecast5FetchSuccess = (data)=>{
    return {
        type: actionTypes.FORECAST_5_SUCCESS,
        data5: data
    }
}

export const signInAuth = (email, password) => {
    return dispatch => {
        const data = {
            email : email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDCA2dGQrKkk2VExEMTtatIKCVEw1M1FfI', data)
        .then( response => {
            dispatch(signInSuccess(response.data.idToken, response.data.localId)) 
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('localId' , response.data.localId)
            dispatch(setLocalIdIdtoken(localStorage.getItem('token'),localStorage.getItem('localId')))
        })
    }
}

export const signInSuccess = (idToken, localId) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        idToken: idToken,
        localId: localId
    }
}

export const signUpAuth = (email, password) => {
    return dispatch => {
        const data = {
            email : email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDCA2dGQrKkk2VExEMTtatIKCVEw1M1FfI', data)
        .then( response => {
            const personalData= {
                name: 'Please edit name',
                lastName: 'Please edit name',
                country: 'Please edit country'
            }
            axios.put(`https://weather-app1-1bb76.firebaseio.com/${response.data.localId}.json`, {
                                                                                id:response.data.localId,personalData})
        .then( response => {
            dispatch(firstPersonalDataAutoFetchSuccess())
            dispatch(personalInfoFetch(response.data.localId))
        })
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('localId' , response.data.localId)
            dispatch(setLocalIdIdtoken(localStorage.getItem('token'),localStorage.getItem('localId')))
            dispatch(signUnSuccess(response.data.idToken, response.data.localId))
        })
    }
}

export const signUnSuccess = (idToken, localId) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        idToken: idToken,
        localId: localId
    }
}

export const calsius = () => {
    return {
        type:actionTypes.CELSIUS
    }
}

export const personalDataToggle = () => {
    return {
        type:actionTypes.PERSONAL_DATA_TOGGLE
    }
}

export const personalDataReset = () => {
    return {
        type:actionTypes.PERSONAL_DATA_RESET
    }
}

export const firstPersonalDataAutoFetchSuccess = () => {
    return {
        type: actionTypes.FIRST_PERSONAL_DATA_AUTO_FETCH_SUCCESS,
    }
}

export const personalDataEditFetch = (personalData, localId) => {
    return dispatch => {
        axios.put(`https://weather-app1-1bb76.firebaseio.com/${localId}.json`, {id:localId,personalData })
        .then( response => {
            dispatch(personalInfoFetch(localId))
        })
    }
}

export const personalInfoFetch = (localId) => {
    return dispatch => {
        axios.get(`https://weather-app1-1bb76.firebaseio.com/${localId}/personalData.json`)
        .then( response => {
            dispatch(personalInfoFetchSuccess(response.data))
        })
    }
}

export const personalInfoFetchSuccess = (personalData) => {
    return {
        type:actionTypes.PERSONAL_INFO_FETCH_SUCCESS,
        personalData: personalData
    }
}

export const personalDataLoaded = () => {
    return {
        type:actionTypes.PERSONAL_DATA_LOADED
    }
}

export const setLocalIdIdtoken = (idToken, localId) => {
    return {
        type:actionTypes.SET_LOCALID_IDTOKEN,
        localId: localId,
        idToken: idToken
    }
}

