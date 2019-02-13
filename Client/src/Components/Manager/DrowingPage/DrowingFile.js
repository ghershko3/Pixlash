import React, { Component, Fragment } from 'react';
import SelectType from "./SelectType";
import TextToDrow from './TextToDrow';
import BoxToDrow from './BoxToDrow';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class DrowingFile extends Component {
    state = {
        selectedType: undefined,
        inputToDraw: undefined,
        areaMapping: [
            {connection: 1, location: [1, 1]},
            {connection: 2, location: [1, 2]},
            {connection: 3, location: [2, 1]},
            {connection: 4, location: [2, 2]},
            {connection: 4, location: [3, 1]},
        ],
        selectedClients: []
    };

    handleSelectChange = event => {
        this.setState({ selectedType: event.target.value });
    };

    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    editSelectedClients = (client, action) => {
        switch (action) {
            case 'ADD':
                [...selectedClients, client]
                break;
            case 'RM':
                selectedClients.map(c => {if(c.id != client.id) return c})
                break;
            case 'CHECK':
                selectedClients.map(c => {if(c.id != client.id) return c})
                break;
        }  
        
    }

    render() {
        const { classes } = this.props
        const { selectedType, inputToDraw, areaMapping, selectedClients } = this.state
        return (
            <form noValidate autoComplete="off"> 
                <Grid container direction={"column"} alignItems={"center"} justify={"center"} style={{ minHeight: '100vh' }}>
                    <Grid item xs={12}>
                        <SelectType selectedType={selectedType} handleSelectChange={this.handleSelectChange}/>
                    </Grid>
                    {selectedType === 'Text' && 
                    <Grid item xs={12}>
                        <TextToDrow inputToDraw={inputToDraw} handleInputChange={this.handleInputChange}/>
                    </Grid>}
                    {selectedType === 'Draw' && 
                    <Grid item xs={12} style={{ height: '70vh', width: '90vw' }}>
                        <BoxToDrow areaMapping={areaMapping} selectedClients={selectedClients}/>
                    </Grid>}
                    {selectedType !== undefined && 
                    <Grid item xs={12}>
                        <Button variant="outlined" color="primary" className={classes.button}>Next <Icon>chevron_right</Icon></Button>
                    </Grid>}
                </Grid>
            </form>
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
  });


DrowingFile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrowingFile);
