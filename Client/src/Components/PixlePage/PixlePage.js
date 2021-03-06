import React, { Component } from 'react';
import io from 'socket.io-client'
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import FlashLight from '../../Functionalities/Flashlight';


class PixlePage extends Component {
    constructor () {
        super();
        let socket = io();
        this.state = {
            row: null,
            col: null
        };
        socket.on('setSit', sit => {
            this.setState({row: sit.row, col: sit.col})
        });
        socket.on('turn on', () => {
            FlashLight.on()
        })
        socket.emit('getSit', "");
    }

     render() {
        return (
            <Grid container direction={"column"} alignItems={"center"} justify={"center"} style={{ minHeight: '100vh' }}>
                <Grid item>
                    <Icon color="secondary">done_outline</Icon>
                </Grid>
                <Grid item>
                    GREAT! your'e in!
                </Grid>
                <Grid item>
                    row: {this.state.row}
                    col: {this.state.col}
                </Grid>
            </Grid>
        );
    }
}

export default PixlePage;
