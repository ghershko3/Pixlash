import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';

class SimpleSelect extends React.Component {

    findClientById = id => this.props.areaMapping.find(c => id == c.id)

    markSquare = (id) => {
        const { selectedClients, editSelectedClients } = this.props

        const client = this.findClientById(id.target.id)
        
        selectedClients.find(c => client.id == c.id) ? editSelectedClients(client, "RM") : editSelectedClients(client, "ADD")
    }

    squareColor = usr => this.props.selectedClients.find(c => usr.id == c.id) ? "black" : "white"

    // buildMatrix = () => {
    //     const {areaMapping} = this.props

    //     const matrixHeight = _.maxBy(areaMapping, 'location[0]').location[0]
    //     const matrixWidth = _.maxBy(areaMapping, 'location[1]').location[1]

    //     for (let i = 0; i < matrixHeight; i++) {
    //         for (let j = 0; j < matrixWidth; j++) {
    //             var usr = areaMapping.find(c => c.location[0] == i && c.location[1] == j)
    //             if(usr){
    //                { <Grid 
    //                     item
    //                     id={areaMapping.id} 
    //                     style={{
    //                         height: `${70 / matrixHeight}vh`, 
    //                         width: `${90 / matrixWidth}vw`,
    //                         boxShadow:'0px 0px 0px 1px LightGray inset',
    //                         backgroundColor: `${this.squareColor(usr)}`}}
    //                     onTouchStart={(event) => {this.markSquare(event)}}>
    //                 </Grid>}
    //             }
    //             else{
    //                 {<Grid 
    //                     item
    //                     style={{ height: `${70 / matrixHeight}vh`, width: `${90 / matrixWidth}vw`}}>
    //                 </Grid>}
    //             }
    //         }
    //     }

    // }
    

    render() {
        
        const { classes, areaMapping } = this.props;
        
        const matrixHeight = _.maxBy(areaMapping, 'location[0]').location[0]
        const matrixWidth = _.maxBy(areaMapping, 'location[1]').location[1]

        return (
            <Grid container direction={"row"} style={{paddingLeft: '5vw'}}>
                {areaMapping.map(usr =>  
                    <Grid 
                        item
                        id={usr.id} 
                        style={{
                            height: `${70 / matrixHeight}vh`, 
                            width: `${90 / matrixWidth}vw`,
                            boxShadow:'0px 0px 0px 1px LightGray inset',
                            backgroundColor: `${this.squareColor(usr)}`}}
                        onTouchStart={(event) => {this.markSquare(event)}}>
                    </Grid>)}
            </Grid>
        )
    }
}

const styles = () => ({
  });
  

  SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SimpleSelect);
  