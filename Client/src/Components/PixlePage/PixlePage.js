import React, { Component } from 'react';
import io from 'socket.io-client'

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
        socket.emit('getSit', "");
    }

     render() {
        return (
       <div>
        <h1> You are going to be a part of a big picture!</h1>
        <div>
            row: {this.state.row}
        </div>
        <div>
            col: {this.state.col}
        </div>
  </div>
        );
    }
}

export default PixlePage;
