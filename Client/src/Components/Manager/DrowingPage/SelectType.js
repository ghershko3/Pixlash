import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class SimpleSelect extends React.Component {

    render() {
      const { classes, selectedType, handleSelectChange } = this.props;
  
      return (
        <form autoComplete="off">
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="types-select">Input Type</InputLabel>
            <Select value={selectedType || ""} onChange={handleSelectChange} inputProps={{ id: 'types-select' }} fullWidth>
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={"Text"}>Text</MenuItem>
                <MenuItem value={"Draw"}>Draw</MenuItem>
            </Select>
        </FormControl>
        </form>
      )
    }
}

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });
  

  SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SimpleSelect);
  