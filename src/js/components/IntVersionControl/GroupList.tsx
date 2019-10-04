import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { inCEPEnvironment, evalExtendscript } from 'cep-interface';
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


const GroupList = (props) => {
  const {profile} = useContext(ProfileContext);
  const [group, setGroup] = useState('ae_scripts');
  const groups = [ 'ae_scripts', 'ae_farm', 'ae_renders' ];

  useEffect(() => {
    profile.manager.deadline.group = group;
  }, [group]);
    
  return (
      <TextField
        error={group === ''}
        select
        label="Group"
        className={props.classes.textField}
        variant="filled"
        value={group}
        onChange={e => setGroup(e.target.value)}
        margin="dense"
      >
        {groups.map((value, index) =>
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

GroupList.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(GroupList);