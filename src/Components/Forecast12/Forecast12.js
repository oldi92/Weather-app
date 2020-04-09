import React,{ Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/indexActions';
import classes from './Forecast12.module.css';
import Forecast12List from './Forecast12List/Forecast12List';
import {Transition} from 'react-transition-group'

class Forecast12 extends Component  {

    state = {
        forecastToggle : false,
        scrollposistion: null
    }

    componentDidMount() {
            this.props.onForcastFetch(this.props.longitude, this.props.latitude)                 
    }

    forecastToggle= () =>{
        this.setState({ forecastToggle : !this.state.forecastToggle})
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
            
            let forecast12 = null;
            if(this.props.data12) {
                forecast12 = this.props.data12.map( element => {                    
                        const date = element.timestamp_utc
                        const temp = element.temp.toFixed(0)
                        const humidity = element.rh
                        const windSpeed = element.wind_spd.toFixed(2)
                        const weatherDescription = element.weather.description
                        const weatherIcon = element.weather.icon

                        return <Forecast12List key={date} 
                               date={date}
                               temp={temp}
                               humidity={humidity}
                               windSpeed={windSpeed}
                               weatherDescription={weatherDescription}
                               weatherIcon={weatherIcon}
                               celsius={this.props.celsiusToggle} />
                      
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
                                {forecast12}
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
        data12: state.data12,
        celsiusToggle: state.celsius
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onForcastFetch: (longitude, latitude) => dispatch(actions.forecastFetch(longitude, latitude))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forecast12);