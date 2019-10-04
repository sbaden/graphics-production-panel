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


const PoolList = (props) => {
  const {profile} = useContext(ProfileContext);
  const [pool, setPool] = useState('shawn_primary');
  const pools = [ 'shawn_primary', 'shawn_secondary', 'grfx_all', 'laengineering' ];

  useEffect(() => {
    profile.manager.deadline.pool = pool;
  }, [pool]);
    
  return (
      <TextField
        error={pool === ''}
        select
        label="Pool"
        className={props.classes.textField}
        variant="filled"
        value={pool}
        onChange={e => setPool(e.target.value)}
        margin="dense"
      >
        {pools.map((value, index) =>
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

PoolList.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PoolList);