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

class DrowingFile extends Component {
    state = {
        selectedType: undefined,
        input: undefined,
        areaMapping: [
            {id: 1, location: [1, 1]},
            {id: 2, location: [1, 2]},
            {id: 3, location: [2, 1]},
            {id: 4, location: [2, 2]},
            {id: 5, location: [1, 3]},
            {id: 6, location: [2, 3]},
            {id: 7, location: [3, 1]},
            {id: 8, location: [3, 2]},
            {id: 9, location: [3, 3]},
            {id: 10, location: [4, 1]},
            {id: 11, location: [4, 2]},
            {id: 12, location: [4, 3]},
        ],
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

    // componentDidMount() {
    //     try {
    //         const req = await fetch('/api/getClientsCount')
    //         const json = await req.json()
    //         this.setState({ count: json.count })
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

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
                        <Button variant="outlined" color="secondary" className={classes.button}>Next <Icon>chevron_right</Icon></Button>
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
  });


DrowingFile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrowingFile);
