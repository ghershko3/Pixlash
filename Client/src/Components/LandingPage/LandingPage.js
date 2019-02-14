import React, { Component } from 'react';
import logo from '../../logo.png';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

class LandingPage extends Component {  
  state = {
    checked: true,
  };

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  componentDidMount() {
    setInterval(() =>  {
      this.handleChange()
      window.location.href = '/ScanningPage' 
    } , 2000);
  }
  
  render() {
    const {classes} = this.props
    const {checked} = this.state
       
    return (
      <Fade in={checked}>
      <Grid container direction={"column"} alignItems={"center"} justify={"center"} className={classes.root}>
        <Grid item xs={12}>
          <img name="" src={logo} className={classes.logo} />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.txt}> You are going to be a part of a big picture!</div>
        </Grid>
      </Grid>
      </Fade>
    );
  }
}

const styles = () => ({
  root: {
    minHeight: '100vh'
  },
  txt: {
    color: '#62717b'
  },
});

export default withStyles(styles)(LandingPage);
