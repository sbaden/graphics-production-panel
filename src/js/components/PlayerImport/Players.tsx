import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    useTheme,
    withStyles,
    Grid,
    Paper,
} from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 100,
        width: 70,
        backgroundColor: '#222',
    },
});


const Players = (props) => {
    const {players} = props;

    const theme = useTheme();
    const [spacing] = useState(1);

    return (
    <Grid container className={props.classes.root} spacing={2}>
        <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
                {players.map(player => (
                    <Grid key={player.id} item>
                        <Paper className={props.classes.paper} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    </Grid>
    );
}

Players.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Players);