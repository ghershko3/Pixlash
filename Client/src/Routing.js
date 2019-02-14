import React from "react";
import { Route } from "react-router-dom";
import DrowingPage from './Components/Manager/DrowingPage/DrowingFile'
import ScanningPage from './Components/ScanningPage/ScanningPage'
import PixlePage from './Components/PixlePage/PixlePage'
import CreateNew from './Components/CreateNew/CreateNew'
import App from './App'

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Route exact path="/" component={App} />
            <Route path="/DrowingPage" component={DrowingPage} />
            <Route path="/ScanningPage" component={ScanningPage} />
            <Route path="/PixlePage" component={PixlePage} />
            <Route path="/CreateNew" component={CreateNew} />
        </React.Fragment>
    );
}
export default ReactRouter;