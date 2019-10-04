import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Typography,
    Slider,
} from '@material-ui/core';

import ProfileContext from './ProfileContext';
import PoolList from './PoolList';
import GroupList from './GroupList';


const styles = theme => ({
    root: {
        width: '100%',
    },
    margin: {
        height: theme.spacing(3),
    },
});

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 50,
        label: '50',
    },
    {
        value: 100,
        label: '100',
    },
];


const DeadlineSettings = (props) => {
    const {profile} = useContext(ProfileContext);
    const [priority, setPriority] = useState(50);
    
    const handlePriorityChange = (value) => {
        setPriority(value);
        profile.manager.deadline.priority = value;
    }

    return (
        <div className={props.classes.root}>
            <Typography id="discrete-slider-custom" gutterBottom>
                Priority
            </Typography>
            <Slider
                defaultValue={priority}
                getAriaValueText={handlePriorityChange}
                aria-labelledby="discrete-slider-custom"
                step={10}
                valueLabelDisplay="on"
                marks={marks}
            />
            <div className={props.classes.margin} />
            <PoolList />
            <GroupList />
        </div>
    );
}

DeadlineSettings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeadlineSettings);
