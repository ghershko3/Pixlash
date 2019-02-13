import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import QrReader from 'react-qr-scanner'

class ScanningPage extends Component {
 constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
    }
 
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    })
  }
  handleError(err){
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
        <Route render={({ history}) => (
            <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={() => { history.push('/ScanningPage') }}
          />
  )} />

        
        <p>{this.state.result} </p>
        </div>
        );
    }
}

export default ScanningPage;
