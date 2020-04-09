import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './SignUp.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../store/actions/indexActions'



class SignUp extends Component {

    state = {
        email : "",
        password : "",
        emailError: "",
        passError: ""
    } 

    componentDidUpdate(){
        if(this.props.loginSuccess){
            this.props.history.push('/')
        }
    }

    changedHanlder =(event) => {
        this.setState({
            ...this.state,
            [event.target.name] : event.target.value
        }) 
    }

    submitHandler  = (event) => {
        event.preventDefault();

        const isValid = this.validation();

        if(isValid){
            if(isValid){
                this.props.onSignUpAuth(this.state.email, this.state.password)
            }

            this.setState({
                email : "",
                password : "",
                emailError: "",
                passError: ""
            })
            
        }
    }

    validation = () =>{

        let emailError = "";
        let passError = "";


        if(!this.state.email.includes('@')){
            emailError = 'Please type @ with your email'
        }

        if(this.state.email.length === 0 ){
            emailError = 'Email field cannot be empty.';          
        }  else if(this.state.email.length < 5 ){
            emailError = 'Email field to short.';          
        }  
        
        if(this.state.email.length > 25 ){
            emailError = 'Email to long';          
        }           
        
        if(this.state.password.length === 0 ){
            passError = 'Password field cannot be empty'
        }else if(this.state.password.length < 6 ){
            passError = 'Password field to short'
        }
        
        if(this.state.password.length > 20 ){
            passError = 'Password to long'
        }

        if(passError || emailError ){
            this.setState({ 
                     passError : passError ,
                     emailError: emailError
                    }) 
            return false 
        }

        if(passError || emailError ){
            this.setState({
                emailError : "",
                passError : "",
            })
        } else {
            return true
        }     
    }


    render() {
        return (
            <div className={classes.Settings}>
                <div>
                    <NavLink to='/'>
                    <FontAwesomeIcon icon={faBackspace} size='3x' className={classes.BackButton}/>
                    </NavLink>
                    <div className={classes.Form}>
                        <div className={classes.LockIcon}>
                            <FontAwesomeIcon icon={faUserPlus} size='2x' style={{color: 'white'}}/>
                        </div>
                        <h2>Sign up</h2>
                        <form onSubmit={this.submitHandler}>
                            <div className={classes.Error}>{this.state.emailError}</div>
                            <input type='email' 
                                   name='email' 
                                   placeholder='example@example.com'
                                   value={this.state.email}
                                   onChange={this.changedHanlder}
                                    />
                            <div className={classes.Error}>{this.state.passError}</div>
                            <input type='password' 
                                   name='password' 
                                   placeholder='password*'
                                   value={this.state.password}
                                   onChange={this.changedHanlder}
                                   />
                            <button type='submit'>Sign up</button>  
                            <NavLink to='/signin' className={classes.SignUp}>You have account? Back to Sign In</NavLink>           
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loginSuccess: state.loginSuccess,
        idToken: state.idToken,
        localId: state.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUpAuth : (email, password) => dispatch(actions.signUpAuth(email, password))        
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(SignUp)
