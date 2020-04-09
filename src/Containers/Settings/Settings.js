import React, { Component } from 'react'; 
import { connect } from 'react-redux';

import classes from './Settings.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import * as actions from '../../store/actions/indexActions';
import PersonalData from './PersonalData/PersonalData';

class Settings extends Component {

    componentDidMount(){
        this.props.onPersonalDataReset()
        this.props.onSetLocalIdIdtoken(localStorage.getItem('token'), localStorage.getItem('localId'))
    }

    buttonHandler = () =>{
        this.props.onCelsius()
    }
    

    
    render(){
        return(
            <div className={classes.Settings}>
                    <NavLink to='/'>
                    <FontAwesomeIcon icon={faBackspace} size='3x' className={classes.BackButton}/>
                    </NavLink>
                <div className={classes.CelciusButton}>
                    
                <Transition in={!this.props.celsiusToggle} timeout={300}>
                    {state => (
                        <button onClick={this.buttonHandler} 
                        style={{
                            transition: 'all 0.3s ease-out',
                            marginLeft : state === 'exited' ? '-45%' : '45%'
                        }}
                        >
                            {this.props.celsiusToggle 
                            ? <h2 style={{margin: 'auto'}}>Celsius °C</h2>

                            :<h2 style={{margin: 'auto'}}>Fahrenheit °F</h2>
                             }
                        </button>
                    )}
                </Transition>
                </div>
                <div>
                    <PersonalData />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        celsiusToggle: state.celsius,
        personalDataToggle: state.personalDataToggle,
        firstPersonalDataAutoFetch: state.firstPersonalDataAutoFetch,
        localId: state.localId      
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCelsius : () => dispatch(actions.calsius()),
        onPersonalDataToggle : () => dispatch(actions.personalDataToggle()),
        onPersonalDataReset : () => dispatch(actions.personalDataReset()),        onSetLocalIdIdtoken: (idToken , localId) => dispatch(actions.setLocalIdIdtoken(idToken , localId))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Settings)
