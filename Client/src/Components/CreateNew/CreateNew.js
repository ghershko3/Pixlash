import React, { Component } from 'react';
import logo from '../../logo.png';
import { Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import QRCode from './QRCode'
import Grid from '@material-ui/core/Grid';
import Txt from '../Manager/DrowingPage/TextToDrow'
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

class CreateNew extends Component {
    constructor(props){
        super(props)
        this.state={
            value: false,
            input: undefined,
            dis: false,
            checked: true,
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


     render() {
        const {value, input, dis, checked} = this.state
        return (
            <Grid container direction={"column"} alignItems={"center"} justify={"space-around"} style={{ minHeight: '100vh' }}>
                <Grid item>
                    <Slide direction="up" in={checked} unmountOnEnter>
                        <Grid containeralignItems={"center"} justify={"center"}>
                            <Grid item> Enter your project name to start!</Grid>
                            <Grid item>
                                <Txt input={input} handleInputChange={this.handleInputChange} lbl={"Project's Name"} dis={dis}/>
                            </Grid>
                            <Grid item>
                                <Button 
                                    variant="outlined" 
                                    color="secondary"
                                    type='button'
                                    onClick={() => { this.handleClick() }}
                                    >
                                    Click Me!
                                </Button>
                            </Grid>
                        </Grid>
                    </Slide>
                </Grid>
                
                { value ?  <Grid item><QRCode /></Grid> : null }
                
            </Grid>
        );
    }
}
export default CreateNew;




