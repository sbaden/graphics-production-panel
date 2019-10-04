import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { inCEPEnvironment, evalExtendscript } from 'cep-interface';
import {
    withStyles,
    MenuItem,
    TextField
} from '@material-ui/core';

import ProfileContext from '../IntVersionControl/ProfileContext';

const styles = theme => ({
    textField: {
      display: 'flex',
      margin: theme.spacing(1)
    },
});


const ShowList = (props) => {
  const {profile} = useContext(ProfileContext);
  const { setScript, setDisplay } = props;
  
  const [show, setShow] = useState('');
  const [shows, setShows] = useState([]);

  let getShows = () => {
    if (inCEPEnvironment()) {
      evalExtendscript(`getTargetFolders(${JSON.stringify(profile.showDirectory)})`)
      .then(result => {
        setShows(result);
        setScript('');
      })
      .catch(error => alert(error))
    }
    else{
      setShows(['Show01', 'Show02', 'Show03', 'Show04', 'Show05', 'Show06', 'Show07', 'Show08']);
      setScript('');
    }
  }

  const handleShowChange = (e) => {
    setShow(e.target.value);
    profile.show = e.target.value;
    setDisplay(true);
  }
    
  return (
      <TextField
        required
        error={show === ''}
        select
        label="Select Show"
        className={props.classes.textField}
        variant="filled"
        value={show}
        onClick={getShows}
        onChange={e => handleShowChange(e)}
        margin="dense"
      >
        {shows.map((value, index) =>
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

ShowList.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ShowList);