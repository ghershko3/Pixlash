import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import QrReader from 'react-qr-reader'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import logo from '../../logo.png';

class ScanningPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }
  handleScan = (data, history) => {
    this.setState({
      result: data,
    })
    if (data){
      history.push('/PixlePage')
    }
  }
  handleError(err) {
    console.error(err)
  }

  componentDidMount() {
    this.setState({ loading: false })
  }

  render() {
    const previewStyle = {
      height: 300,
      width: '100vw',
    }

    const { classes } = this.props
    const { loading } = this.state

    return (
      <Fragment>
        <Grid container direction={"column"} alignItems={"center"} justify={"space-between"}  className={classes.root}>
          <Grid item>
            <img name="" src={logo} className={classes.logo} />
          </Grid>
          <Grid item>
            <div className={classes.txt}> You are going to be a part of a big picture!</div>
          </Grid>
          <Grid item>
            <Route render={({ history }) => (
              <QrReader
                style={previewStyle}
                onError={this.handleError}
                onScan={(data) => { this.handleScan(data, history) }}
              />
            )} />
          </Grid>
        </Grid>

        <Route render={({ history}) => (
                    

          <Fab className={classes.fab} variant="outlined"  color={"secondary"} onClick={() => { history.push('/CreateNew') }}>
            <Icon>add</Icon>
          </Fab>
        )} />
      </Fragment>
    );
  }
}

const styles = theme => ({
  logo: {
    width: '60vw'
  },
  txt: {
    color: '#62717b'
  },
  root: {
    minHeight: '70vh'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});


export default withStyles(styles)(ScanningPage);
