import React, { Component, Fragment } from 'react';
import logo from '../../logo.png';
import { Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import QRCode from './QRCode'
import Grid from '@material-ui/core/Grid';
import Txt from '../Manager/DrowingPage/TextToDrow'
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Icon from '@material-ui/core/Icon';

class CreateNew extends Component {
    constructor(props){
        super(props)
        this.state={
            value: false,
            input: undefined,
            dis: false,
            checked: true,
            count: 0
        }
    }


    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    
    handleTextDisable = val => {
        this.setState({ dis: val });
    };

    handleClick = () => {
        this.handleTextDisable(true)
        this.setState({value:true})
    }

    GetCounter = async () => {
        try {
            const req = await fetch('/api/getClientsCount')
            const json = await req.json()
            this.setState({ count: json.count })
        }
        catch (err) {
            console.log(err)
        }
    }

    handleMovePage = (history) => {
        history.push('/drowingPage')
    }
    


     render() {
        const {value, input, dis, checked, count} = this.state
        return (
            <Grid container direction={"column"} alignItems={"center"} justify={"space-around"} style={{ minHeight: '100vh' }}>
                <Grid item>
                    <Slide direction="up" in={checked} unmountOnEnter>
                        <Grid container direction={"column"} alignItems={"center"} justify={"center"}>
                            {!dis && <Grid item> Enter your project name to start!</Grid>}
                            <Grid item>
                                <Txt input={input} handleInputChange={this.handleInputChange} lbl={"Project's Name"} dis={dis}/>
                            </Grid>
                            <Grid item>
                                <Button 
                                    disabled={dis}
                                    variant="outlined" 
                                    color="secondary"
                                    onClick={() => { this.handleClick() }}
                                    >
                                    Click Me!
                                </Button>
                            </Grid>
                        </Grid>
                    </Slide>
                </Grid>
                
                { value 
                    ?   <Fragment>
                            <Grid item>
                                <QRCode />
                            </Grid> 
                            <Grid item>
                                connected clients: {count}
                            </Grid> 
                            <Grid item>
                            <Route render={({ history }) => (
                                <Button variant="outlined" color="secondary" onClick={() => {this.handleMovePage(history)}}>Next <Icon>chevron_right</Icon></Button>
                            )} />
                            </Grid> 
                        </Fragment>
                    : null }
                
            </Grid>
        );
    }
}
export default CreateNew;




