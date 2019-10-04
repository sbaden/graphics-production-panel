import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { inCEPEnvironment, evalExtendscript } from 'cep-interface';
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';

import ProfileContext from './ProfileContext';


const styles = theme => ({
    card: {
        marginBottom: 3,
        flex: 'flex-1',
        width: '100%',
        wordBreak: 'break-word',
    },
    title: {
        fontSize: 14,
        color: theme.palette.textColor.light,
    },
    subtitle1: {
        fontSize: 14,
        color: theme.palette.textColor.medium,
    },
    textField: {
        display: 'flex',
        margin: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(1),
    },
    switch: {
        margin: theme.spacing(1),
    },
    div: {
        display: 'flex-1',
        alignContent: 'center',
    }
});


const Batch = (props) => {
    const presetPath = '/Users/sbaden/Documents/development_AE/AE_BATCH/';
    const {profile} = useContext(ProfileContext);
    const [locationType, setLocationType] = useState('preset');
    const [path, setPath] = useState('');

    const handleRadioChange = (event) => {
        setLocationType(event.target.value);
        console.log(event.target.value);
    }

    const getCustomPath = () => {
        if (inCEPEnvironment()) {
            evalExtendscript(`returnDirectory()`)
            .then(result => {
                result === undefined ? setPath('') : setPath(result);
            });
        }
        else{
            setPath('No path is available outside the CEP Environment');
            profile.batch.path = 'No path is available outside the CEP Environment';
        }
    }

    useEffect(() => {
        switch(locationType){
            case 'preset':
                profile.batch.path = presetPath;
                break;

            case 'custom':
                profile.batch.path = path;
                break;

            default:
                break;
        }
    }, [locationType, getCustomPath]);

    let buttonNode;

    if(locationType === 'custom'){
        buttonNode =
            <div>
                <TextField
                    required
                    error={path === ''}
                    label="Select Batch Location"
                    className={props.classes.textField}
                    value={path}
                    onClick={getCustomPath}
                    margin="dense"
                >
                </TextField>
            </div>
    }
  
    return (
        <div>
            <Card className={props.classes.card}>
                <CardContent>
                    <Typography className={props.classes.title}>
                        Batch Location
                    </Typography>
                    <CardActions>
                        <FormControl component="fieldset">
                            {/* <FormLabel component="legend">labelPlacement</FormLabel> */}
                                <RadioGroup 
                                    aria-label="location" 
                                    name="location" 
                                    value={locationType} 
                                    onChange={handleRadioChange}
                                    row
                                >
                                    <FormControlLabel
                                        value="preset"
                                        control={<Radio color="primary" />}
                                        label="Preset"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="custom"
                                        control={<Radio color="primary" />}
                                        label="Custom"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                        </FormControl>
                    </CardActions>
                    {buttonNode}
                </CardContent>
            </Card>
        </div>
    );
}

Batch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Batch);
