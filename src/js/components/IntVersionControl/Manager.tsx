import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Divider,
    Tabs,
    Tab,
    Card,
    CardContent,
    CardActions,
    Typography,
} from '@material-ui/core'

import ProfileContext from './ProfileContext';
import DeadlineSettings from './DeadlineSettings';
import AfterEffectsSettings from './AfterEffectsSettings';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    marginBottom: 3,
    display: 'flex-1',
    width: '100%',
    wordBreak: 'break-word',
    },
    title: {
        fontSize: 14,
        color: theme.palette.textColor.light,
    },
    tabs: {
        marginBottom: 0,
    },
    divider: {
        marginBottom: 4,
    }
});

const RenderManager = (props) => {
    const {profile} = useContext(ProfileContext);
    const [controllerType, setControllerType] = React.useState(1);

    const handleControlChange = (event, tabValue) => {
        setControllerType(tabValue);
    }

    useEffect(() => {
        controllerType === 0 ? profile.manager.controller = 'ae' : profile.manager.controller = 'deadline';
    }, [controllerType]);

    let settingsNode;

    switch(controllerType){
        case 0:
            settingsNode = <AfterEffectsSettings />
            break;
        case 1:
            settingsNode = <DeadlineSettings />
            break;
        default:
            break;
    }

    return (
        <Card>
            <CardContent>
                <Typography className={props.classes.title}>
                    Render Manager
                </Typography>
                    <Tabs
                        className={props.classes.tabs}
                        value={controllerType}
                        onChange={handleControlChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        >
                        <Tab label="After Effects" />
                        <Tab label="Deadline" />
                        {/* <Tab label="GS" disabled/> */}
                    </Tabs>
                    <Divider className={props.classes.divider}/>
                    <CardActions>
                        {settingsNode}
                    </CardActions>
            </CardContent>
        </Card>
    );
}

RenderManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RenderManager);
