import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

import ShowList from './ShowsList';
import ScriptList from './ScriptList';


const styles = theme => ({
    card: {
        marginBottom: 3,
        display: 'flex-1',
        width: '100%',
        wordBreak: 'break-word',
    },
    title: {
        fontSize: 14,
        color: theme.palette.textColor.main,
    },
    button: {
        margin: theme.spacing(1),
        color: theme.palette.textColor.medium,
    },
});


const Project = (props) => {
    const [display, setDisplay] = useState(false);
    const [script, setScript] = useState('')

    let scriptNode;
    
    if(display === true){
        scriptNode = 
            <ScriptList
                script={script}
                setScript={setScript}
            />
    }
  
    return (
        <Card className={props.classes.card}>
            <CardContent>
                <Typography className={props.classes.title}>
                    Scripts
                </Typography>
                <ShowList
                    setScript={setScript}
                    setDisplay={setDisplay}
                />
                {scriptNode}
            </CardContent>
        </Card>
    );
}

Project.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Project);
