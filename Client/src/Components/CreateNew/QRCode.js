import React, { Component } from 'react';
import logo from '../../logo.png';
import { Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import QRCode from 'qrcode-react'


class Results extends Component {
    render() {
        return (
            <div>
                <QRCode logo={logo} logoHeight="30" logoWidth="50" value="https://www.npmjs.com/package/react-qr-scanner" />
            </div>
        );
    }
}
export default Results;