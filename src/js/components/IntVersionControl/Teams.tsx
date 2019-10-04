import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { orange, grey } from '@material-ui/core/colors';
import {
  withStyles,
  FormGroup,
  FormControl,
  FormControlLabel,
  Typography,
} from '@material-ui/core';

import '../../containers/App.css';
import ProfileContext from './ProfileContext';

const styles = theme => ({
  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: orange[700]
  },
});


const Teams = (props) => {
  const {profile} = useContext(ProfileContext);
  const {teams, teamCollection, setTeamCollection} = props;

  const handleTeamChange = (event) => {
    let target = event.target;
    console.log('src: ' + target.src)
    
    if(!isChecked(target.id)){
        setTeamCollection([...teamCollection, target.id]);
        profile.data.teamCollection = [...teamCollection, target.id];
    }
    else{
        const newCollection = teamCollection.filter((team) => {
            return team !== target.id;
        });

        setTeamCollection(newCollection);
        profile.data.teamCollection = newCollection;
    }
    console.log(teamCollection);
  }

  const isChecked =(id) => {
    return teamCollection.includes(id);
  }

  const getImgPath = (team) => {
    if(isChecked(team.id)){
        return team.logo;  // CHANGE TO ANOTHER IMG IF DESIRED FOR CHECKED STATE
    }
    else{
        return team.logo;
    }
  };


  return (
    <FormControl component="fieldset">
        {/* <FormLabel component="legend">labelPlacement</FormLabel> */}
        <FormGroup
            aria-label="teams"
            name="teams"
            row
        >
            {teams.map(team => (
              <div className={props.classes.div} key={team.id}>
                  <FormControlLabel
                      control={
                        <img 
                          id={team.id} 
                          src={getImgPath(team)} 
                          alt="" 
                          width="50px" 
                          height="auto"
                          className="logo"
                          data-check={isChecked(team.id)}
                          onClick={handleTeamChange}
                        />
                      }
                      label={<Typography style={{color: grey[600]}}>{team.tri}</Typography>}
                      labelPlacement="bottom"
                  />
              </div>
            ))}
        </FormGroup>
      </FormControl>
  );
};

Teams.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Teams);