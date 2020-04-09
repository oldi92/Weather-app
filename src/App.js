import React from 'react';
import { Route } from 'react-router-dom';


import Main from './Containers/Main/Main';
import SignIn from './Containers/SignIn/SingIn';
import SignUp from './Containers/SignUp/SignUp';
import Settings from './Containers/Settings/Settings';
import LogOut from './Components/LogOut/LogOut'
import classes from'./App.module.css';


function App() {
  //const counter = useSelector( state => state);

  return (

    
    <div className={classes.App}>
      <Route  exact path='/'  component={Main}/>
      <Route  path='/signin'  component={SignIn}/>
      <Route   path='/signup'  component={SignUp}/>
      <Route   path='/settings'  component={Settings}/>
      <Route   path='/logout'  component={LogOut}/>
    </div>
    
  );
}

export default App;

