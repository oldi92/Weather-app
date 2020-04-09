import React, { Component } from 'react';
import classes from './LogOut.module.css';

class LogOut extends Component {
    componentDidMount(){
        setTimeout(() => this.logout() , 2000)
    }
    logout= () => {
        localStorage.removeItem('token');
        localStorage.removeItem('localId');
        this.props.history.push('/')
    }

    render(){
        return(
            <div className={classes.LogOut}>
                <div className={classes.Module}>
                <div className={classes.ldsroller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        )
    }
}

export default LogOut