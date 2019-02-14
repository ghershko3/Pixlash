import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import QrReader from 'react-qr-reader'

class ScanningPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
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

  render() {
    const previewStyle = {
      height: 300,
      width: 300,
    }

    return (
      <div>
        <h1> You are going to be a part of a big picture!</h1>
        <Route render={({ history }) => (
          <QrReader          
            delay={this.state.delay}
            style={previewStyle}
            onError={this.handleError}
            onScan={(data) => { this.handleScan(data, history) }}
          />
        )} />


        <p>{this.state.result} </p>

        <Route render={({ history}) => (
    <button
      type='button'
      onClick={() => { history.push('/CreateNew') }}
    >
      <h1>+</h1>
    </button>
  )} />
      </div>
    );
  }
}

export default ScanningPage;
