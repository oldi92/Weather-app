import React,{ Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/indexActions';
import classes from './Forecast.module.css';
import Forecast24 from './Forecast24/Forecast24';
import {Transition} from 'react-transition-group'

class Forecast extends Component  {

    state = {
        forecastToggle : false,
        scrollposistion: null
    }

    componentDidMount() {
            console.log('FORECAST ' ,this.props.longitude, this.props.latitude);  
            this.props.onForcastFetch(this.props.longitude, this.props.latitude)  
            window.scrollTo({
                top: 765,
                left: 0,
                behavior:"smooth"
            }) 
            console.log('trigreted compotenet did mount');
            
                            
    }

    forecastToggle= () =>{
        this.setState({ forecastToggle : !this.state.forecastToggle})
        console.log('FIRST FUNCTION ON CLICK');
        setTimeout( () => this.scrollHandler() ,500)
        
    }
    scrollHandler(){
        window.scrollTo({
            top: 765,
            left: 0,
            behavior:"smooth"
        })  
        
        
        
    }
    
        render() {
            
            let forecast24 = null;
            if(this.props.data24) {
                console.log('DATA24' ,this.props.data24);
                forecast24 = this.props.data24.map( element => {                    
                        const date = element.timestamp_utc
                        const temp = element.temp.toFixed(0)
                        const humidity = element.rh
                        const windSpeed = element.wind_spd.toFixed(2)
                        const weatherDescription = element.weather.description
                        const weatherIcon = element.weather.icon

                        return <Forecast24 key={date} 
                               date={date}
                               temp={temp}
                               humidity={humidity}
                               windSpeed={windSpeed}
                               weatherDescription={weatherDescription}
                               weatherIcon={weatherIcon} />
                      
                }) 
                
                
            }
            

        let btnClass = !this.state.forecastToggle ? classes.second : classes.remove
        let btnClassFirst =!this.state.forecastToggle ? classes.first : classes.firstAlone
        return (            
                <div >
                    
                    <h2 className={classes.Title}>Forecast Daily  
                    <button className={classes.Parent} onClick={this.forecastToggle}>
                         <div className={btnClassFirst}></div>
                         <div className={btnClass}></div>
                    </button> 
                    <div ref={this.myRef}></div>   
                    </h2> 
                    
                    
                    <Transition in={this.state.forecastToggle}timeout={300}>
                        {state => (
                            
                            <div className={classes.Forecast} style={{
                                transition: 'all 0.3s ease-in',
                                opacity: state === 'exiting' ? '0' : '1',
                                display: state === 'exited' ? 'none' : 'block' ,  
                                height: state === 'exited' ? '0' : '100%'
                            }}>
                                {forecast24}
                            </div>
                        )}
                    </Transition>
                    
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        longitude: state.longitude,
        latitude: state.latitude,
        data24: state.data24,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onForcastFetch: (longitude, latitude) => dispatch(actions.forecastFetch(longitude, latitude))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);