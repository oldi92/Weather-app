import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/indexActions';
import Forecast5List from './Forecast5List/Forecast5List';
import classes from './Forecast5.module.css'

class Forecast5 extends Component {

    componentDidMount(){
        this.props.onForecast5Fetch(this.props.longitude, this.props.latitude) 
    }

    render() {

        let forecast5ListDiv = [];

            if(this.props.data5) {
                forecast5ListDiv = this.props.data5.map( element => {                    
                        const date = element.valid_date;
                        const weatherIcon = element.weather.icon
                        const maxTemp = element.max_temp.toFixed(0)
                        const minTemp = element.min_temp.toFixed(0)
                        return <Forecast5List  key={date} 
                               date={date}
                               weatherIcon={weatherIcon}
                               maxTemp={maxTemp}
                               minTemp={minTemp}
                               celsius={this.props.celsiusToggle}
                                />
                      
                }) 
                
                
            }
        
        return(
            <div style={{marginTop: '50px', paddingBottom: '30px'}}>
                <h2 style={{paddingBottom: '10px'}}>Forecast Next Days</h2>
                <ul className={classes.Forecast5}>
                {forecast5ListDiv}
                </ul>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        longitude: state.longitude,
        latitude: state.latitude,
        data5: state.data5,
        celsiusToggle: state.celsius
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onForecast5Fetch: (longitude, latitude) => dispatch(actions.forecast5Fetch(longitude, latitude))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Forecast5)