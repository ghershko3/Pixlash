import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class SimpleSelect extends React.Component {

    markSquare = (connection) => {
        alert(connection.target.id)
    }

    render() {
        
        const { classes, muiTheme, areaMapping } = this.props;
        
        const matrixHeight = _.maxBy(areaMapping, 'location[0]').location[0]
        const matrixWidth = _.maxBy(areaMapping, 'location[1]').location[1]

        return (
            <div className={classes.root} style={{ height: '100%', width: '100%' }}>
                {areaMapping.map(usr =>  
                    <div 
                        id={usr.connection} 
                        style={{height: `${100 / matrixHeight}%`, width: `${100 / matrixWidth}%`, boxShadow:'0px 0px 0px 1px black inset'}}
                        onMouseEnter={(event) => {this.markSquare(event)}}>
                    </div>)}
            </div>
        )
    }
}

const styles = () => ({
  });
  

  SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SimpleSelect);
  