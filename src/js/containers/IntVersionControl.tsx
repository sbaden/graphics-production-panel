import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inCEPEnvironment, evalExtendscript, loadExtendscript } from 'cep-interface';
import {
  withStyles,
  CardHeader,
  Button,
} from '@material-ui/core';

import SimpleSnackbar from '../components/SimpleSnackbar';
import ProfileContext from '../components/IntVersionControl/ProfileContext';
import Project from '../components/IntVersionControl/Project';
import Data from '../components/IntVersionControl/Data';
import Batch from '../components/IntVersionControl/Batch';
import Render from '../components/IntVersionControl/Render';
import Manager from '../components/IntVersionControl/Manager';

////  IF loadExtendscript DOESN'T WORK:
////    1) STOP SERVER IF RUNNING && QUIT AE
////    2) COMMENT OUT loadExtendscript() LINE
////    3) START SERVER
////    4) START AE
////    5) UNCOMMENT loadExtendscript() LINE
////    6) DO NOT REFRESH SERVER
////    7) REFRESH AE PANEL IF NEEDED
loadExtendscript('index.jsx');

const styles = theme => ({
  button: {
    display: 'flex',
    marginTop: 8,
    color: theme.palette.textColor.primary,
    width: '100%',
  },
  panel: {
    width: 360,
  }
});

const profile = {
  jsonProfileUIRepo: '/Users/sbaden/Documents/development_AE/JSON_REPO/',
  showDirectory: '/Users/sbaden/Documents/development_AE/SCRIPTS/03_PROJECTS/',
  show: '',
  script: '',
  data: {
    feedURL: 'http://feeds.nfl.com/feeds-rs/roster/',
    feedRepo: '/Users/sbaden/Documents/development_AE/JSON_TEAM_REPO/',
    dataType: 'csv',
    dataPath: '',
    allTeams: true,
    teamCollection: [],
  },
  batch: {
    path: '',
  },
  render: {
    path: ''
  },
  manager: {
    controller: '',
    ae: {
      start: false,
    },
    deadline: {
      priority: 50,
      pool: 'shawn_primary',
      group: 'ae_scripts',
    },
  },
};

const IntVersionControl = (props) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertMessage, setAlertMessage] = useState('default message');


  const handleSubmit = () => {
    console.log(profile);
    // alert('script: ' + profile.script + '\n' +
    // 'dataType: ' + profile.data.dataType + '\n' +
    // 'dataPath: ' + profile.data.dataPath + '\n' +
    // 'allTeams: ' + profile.data.allTeams + '\n' +
    // 'teamCollection: ' + profile.data.teamCollection.length + '\n' +
    // 'batchPath: ' + profile.batch.path + '\n' +
    // 'renderPath: ' + profile.render.path + '\n' +
    // 'controller: ' + profile.manager.controller
    // );

    const validateProfile = () => {
      const validateScript = () => {
        return profile.script === '' ? false : true;
      }
    
      const validateDataType = () => {
        if(profile.data.dataType === 'csv'){
          return profile.data.dataPath === '' ? false : true;
        }
        else{
          return profile.data.allTeams === false && profile.data.teamCollection.length < 1 ? false : true;
        }
      }
    
      const validateBatch = () => {
        return profile.batch.path === '' ? false : true;
      }
    
      const validateRender = () => {
        return profile.render.path === '' ? false : true;
      }
    
      if(validateScript() && validateDataType() && validateBatch() && validateRender()){
        return true;	
      }
      else{
        return false;
      }
    }
    
    if(validateProfile()){
      if (inCEPEnvironment()) {
        evalExtendscript(`submit(${JSON.stringify(profile)})`)
        .then(result => {
          // USE RESULT FOR SNACKBAR
          setAlertVariant(result.variant)
          setAlertMessage(result.message)
          setAlertOpen(true)
        })
        .catch(error => alert(error))
      }
      else{
        console.log('Outside CEPEnvironment');
        setAlertVariant('error');
        setAlertMessage('Outside CEPEnvironment');
        setAlertOpen(true)
      }
    }
    else{
      // alert('!valid')
      ///////////// RETURN ERROR FOR SNACKBAR
      // result.variant = 'error';
      // result.message = 'Panel is not valid';
      // return JSON.stringify(result);
    }
  }

  let snackbarNode;
  
  if(alertOpen === true){
    snackbarNode =
        <SimpleSnackbar
          alertOpen={alertOpen}
          alertVariant={alertVariant}
          alertMessage={alertMessage}
          setAlertOpen={setAlertOpen}
        />
  }

  return (
    <ProfileContext.Provider value={{profile}}>
      <div className={props.classes.panel}>
        <CardHeader
            title="Interstitial Batching"
            // subheader="Batch and Render Interstitials"
        />
        <Project />
        <Data />
        <Batch />
        <Render />
        <Manager />
        <Button 
            variant="contained"
            type="submit"
            size="small"
            color="primary"
            className={props.classes.button}
            onClick={handleSubmit}
        >
            Submit
        </Button>
        {snackbarNode}
      </div>
    </ProfileContext.Provider>
  );
}

IntVersionControl.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntVersionControl);
