import React, { Component } from 'react';
import logo from '../../logo.png';
import { Route } from 'react-router-dom';


class LandingPage extends Component {
  
     render() {
       
        return (
       <div>
         <img name="" src={logo} />
        <h1> You are going to be a part of a big picture!</h1>
        <Route render={({ history}) => (
    <button
      type='button'
      onClick={() => { history.push('/ScanningPage') }}
    >
      Click Me!
    </button>
  )} />
  </div>
        );
    }
}

export default LandingPage;
