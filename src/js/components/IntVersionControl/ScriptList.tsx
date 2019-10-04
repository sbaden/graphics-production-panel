import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { inCEPEnvironment, evalExtendscript } from 'cep-interface';
import {
    withStyles,
    MenuItem,
    TextField
} from '@material-ui/core';

import ProfileContext from './ProfileContext';

const styles = theme => ({
    textField: {
      display: 'flex',
      margin: theme.spacing(1)
    },
});


const ScriptList = (props) => {
  const {profile} = useContext(ProfileContext);
  const {script, setScript} = props;
  
  const [scripts, setScripts] = useState([]);

  let getScripts = () => {
    
    if (inCEPEnvironment()) {
      evalExtendscript(`getTargetFiles(${JSON.stringify(profile)})`)
      .then(result => {
        setScripts(result);
      })
      .catch(error => alert(error))
    }
    else{
      setScripts(['Script01', 'Script02', 'Script03', 'Script04', 'Script05', 'Script06']);
    }
  }

  const handleScriptChange = (e) => {
    setScript(e.target.value);
    profile.script = e.target.value;
  }
    
  return (
      <TextField
        required
        error={script === ''}
        select
        label="Select Script"
        className={props.classes.textField}
        variant="filled"
        value={script}
        onClick={getScripts}
        onChange={e => handleScriptChange(e)}
        margin="dense"
      >
        {scripts.map((value, index) =>
          <MenuItem 
            key={index} 
            value={value}
          >
              {value}
          </MenuItem>
        )}
      </TextField>
  );
};

ScriptList.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ScriptList);