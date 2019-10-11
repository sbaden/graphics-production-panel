import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    useTheme,
    withStyles,
    Grid,
    Paper,
    Typography,
    Avatar,
} from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: 2,
        height: 102,
        width: 70,
        backgroundColor: '#222',
        display: 'flex',
        flexDirection: 'column',
    },
    bigAvatar: {
        marginBottom: 5,
        width: 66,
        height: 66,
        borderRadius: '2%',
    },
    name: {
        marginLeft: 5,
        padding: 0,
        fontSize: 9,
        textTransform: 'uppercase',
        color: theme.palette.textColor.light,
    }
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
                        <Paper className={props.classes.paper}>
                            <Avatar 
                                alt="Remy Sharp" 
                                src={player.headshot}
                                className={props.classes.bigAvatar} 
                            />
                            <Typography className={props.classes.name}>
                                {player.name.first}
                            </Typography>
                            <Typography className={props.classes.name}>
                                {player.name.last}
                            </Typography>
                        </Paper>
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