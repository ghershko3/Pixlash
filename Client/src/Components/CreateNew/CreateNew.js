import React, { Component, Fragment } from 'react';
import logo from '../../logo.png';
import { Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import QRCode from './QRCode'
import io from 'socket.io-client'

class CreateNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: false,
      count: 0
    }
  }

  GetCounter = async () => {
      try {
          debugger
          const req = await fetch('/api/getClientsCount')
          debugger
          const json = await req.json()
          debugger
          this.setState({count: json.count})
      }
      catch (err) {
          console.log(err)
      }
  }

    click = () => {
        this.setState({ value: true }, this.GetCounter)
    }

    componentDidMount() {
        new io();
        // fetch('/api/admin')
    }

    render() {
        const { value, count } = this.state
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
            onClick={this.click}
          >
            Click Me!
    </button>
        </form>

        {value &&
          <Fragment>
            <QRCode />
            <h3>{count}</h3>
          </Fragment>}

      </div>
    );
  }
}
export default CreateNew;




