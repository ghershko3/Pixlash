import React, { Component } from 'react';
import logo from '../../logo.png';
import { Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import QRCode from './QRCode'
import io from 'socket.io-client'

class CreateNew extends Component {
    constructor(props){
        super(props)
        this.state={
            value: false
        }
    }

    componentDidMount() {
        new io();
        // fetch('/api/admin')
    }

     render() {
         const {value} = this.state
        return (
       <div>
        <h1> You are going to be a part of a big picture!</h1>
        <form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <button
      type='button'
      onClick={() => { this.setState({value:true}) }}
    >
      Click Me!
    </button>
</form>

 { value ?  <QRCode /> : null }

  </div>
        );
    }
}
export default CreateNew;




