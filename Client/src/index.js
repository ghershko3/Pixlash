import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router}  from 'react-router-dom';
import ReactRouter from './Routing';
import FlashLight from "./Functionalities/Flashlight";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

FlashLight.init()

const theme = createMuiTheme({
    palette: {
      primary: { main: '#37464f' },
      secondary: { main: '#f50057' },
    },
  });

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Router>
            <ReactRouter/>
        </Router>
    </MuiThemeProvider>, document.getElementById('root'));
