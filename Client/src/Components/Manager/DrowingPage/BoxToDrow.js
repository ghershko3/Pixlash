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

    render() {
        
        const { classes, muiTheme, areaMapping } = this.props;
        
        const matrixLength = _.maxBy(areaMapping, 'location').location

        return (
            <div className={classes.root} style={{ height: '100%', width: '100%' }}>
                {areaMapping.map(usr =>  
                    <div style={{height: `100 / ${areaMapping.length}`, width: `100 / ${areaMapping.length}`, boxShadow:'0px 0px 0px 1px black inset'}}>
                    </div>)}
            </div>
        )
    }
}

const styles = () => ({
    root: {
        height: '100%',
        width: '100%',
    },
  });
  

  SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SimpleSelect);
  