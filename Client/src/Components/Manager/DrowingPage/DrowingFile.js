import React, { Component, Fragment } from 'react';
import SelectType from "./SelectType";
import TextToDrow from './TextToDrow';
import BoxToDrow from './BoxToDrow';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Slide from '@material-ui/core/Slide';
import io from 'socket.io-client';

class DrowingFile extends Component {
    state = {
        selectedType: undefined,
        input: undefined,
        areaMapping: [],
        selectedClients: [],
        checked: true
    };

    handleSelectChange = event => {
        this.setState({ selectedType: event.target.value });
    };

    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    editSelectedClients = (client, action) => {
        const { selectedClients } = this.state

        switch (action) {
            case 'ADD':
                this.setState({ selectedClients: [...selectedClients, client] })
                console.log(selectedClients)
                break;
            case 'RM':
                this.setState({ selectedClients: selectedClients.filter(c => c.id !== client.id) })
                console.log(selectedClients)
                break;
        }  
        
    }

    componentDidMount() {
        try {
            fetch('/api/getAllClients')
                .then((res) => {
                    const json = res.json().then(map => {
                        this.setState({ areaMapping: map })
                    })
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    turnOnLights = () => {
        // let socket = io();
        const { selectedClients } = this.state;
        let ids = [];
        selectedClients.map(c => {
            ids.push(c.id)
        })
        console.log(ids)
        fetch('/api/turnOn', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(ids)
        })
        // socket.emit('turnOn', ids);
    }

    render() {
        const { classes } = this.props
        const { selectedType, input, areaMapping, selectedClients, checked } = this.state
        return (
            <Slide direction="up" in={checked} unmountOnEnter>
            <form noValidate autoComplete="off"> 
                <Grid container direction={"column"} alignItems={"center"} justify={"center"} style={{ minHeight: '100vh' }}>
                    <Grid item xs={12}>
                        <SelectType selectedType={selectedType} handleSelectChange={this.handleSelectChange} />
                    </Grid>
                    {selectedType === 'Text' && 
                    <Grid item xs={12}>
                        <TextToDrow input={input} handleInputChange={this.handleInputChange} lbl={"Text To Draw"}/>
                    </Grid>}
                    {selectedType === 'Draw' && 
                    <Grid item xs={12}>
                        <BoxToDrow areaMapping={areaMapping} selectedClients={selectedClients} editSelectedClients={this.editSelectedClients}/>
                    </Grid>}
                    {selectedType !== undefined && 
                    <Grid item xs={12}>
                        {areaMapping.length != 0 
                        ? <Button variant="outlined" color="secondary" className={classes.button} onClick={() => {this.turnOnLights()}}>
                                Turn Me ON! 
                                <Icon>chevron_right</Icon>
                            </Button> 
                            : <div className={classes.err}>No Connected Clients</div>}
                    </Grid>}
                </Grid>
            </form>
            </Slide>
        );
    }
}

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    err: {
        color: 'red'
    }
  });


DrowingFile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrowingFile);
