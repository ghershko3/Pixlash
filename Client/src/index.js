import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import DrowingPage from './Components/Manager/DrowingPage/DrowingFile'
import ScanningPage from './Components/ScanningPage/ScanningPage'
import PixlePage from './Components/PixlePage/PixlePage'
import CreateNew from './Components/CreateNew/CreateNew'


const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/DrowingPage" component={DrowingPage} />
            <Route path="/ScanningPage" component={ScanningPage} />
            <Route path="/PixlePage" component={PixlePage} />
            <Route path="/CreateNew" component={CreateNew} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();