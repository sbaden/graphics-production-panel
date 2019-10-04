import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Checkbox,
    FormGroup,
    FormControl,
    FormControlLabel,
} from '@material-ui/core';

import ProfileContext from './ProfileContext';


const styles = theme => ({
    root: {
        width: '100%',
    },
    // margin: {
    //     height: theme.spacing(3),
    // },
});

const AfterEffectsSettings = (props) => {
    const {profile} = useContext(ProfileContext);
    const [start, setStart] = useState(false);

    const handleCheckboxChange = (event) => {
        setStart(event.target.checked);
        console.log(event.target.checked);
    }

    useEffect(() => {
        profile.manager.ae.start = start;
    }, [start]);

    return (
        <div className={props.classes.root}>
            <FormControl component="fieldset">
            {/* <FormLabel component="legend">labelPlacement</FormLabel> */}
                <FormGroup
                    aria-label="start"
                    name="start"
                    value={start}
                    onChange={handleCheckboxChange}
                    row
                >
                    <FormControlLabel
                        value="start"
                        control={<Checkbox color="primary" />}
                        label="Start Render after batching"
                        labelPlacement="end"
                    />
                </FormGroup>
            </FormControl>
        </div>
    );
}

AfterEffectsSettings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AfterEffectsSettings);
