import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

class AfterDrowing extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <Grid container>
                    <Grid item>
                    </Grid>
            </Grid>
        )
    }
}

const styles = () => ({
  });
  

  AfterDrowing.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AfterDrowing);
  