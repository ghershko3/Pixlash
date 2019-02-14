import React, { Component } from 'react';
import io from 'socket.io-client'

class PixlePage extends Component {
    constructor () {
        let socket = io();
        socket.on('setSit', sit => {
            this.setState({row: sit.row, col: sit.col})
        });
        socket.emit('getSit', "");
    }

     render() {
       
        return (
       <div>
        <h1> You are going to be a part of a big picture!</h1>
        row: {this.state.row}
        col: {this.state.col}
  </div>
        );
    }
}

export default PixlePage;
