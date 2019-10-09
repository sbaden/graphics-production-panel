import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  CardHeader,
  Button,
} from '@material-ui/core';

import Data from '../components/PlayerImport/Data';
import PlayerContext from '../components/PlayerImport/PlayerContext';


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
  feedURL: 'http://feeds.nfl.com/feeds-rs/roster/',
  feedRepo: '/Users/sbaden/Documents/development_AE/JSON_TEAM_REPO/',
  allTeams: true,
  teamCollection: [],
  playerCollection: [],
};


const PlayerImport = (props) => {

  const handleImport = () => {
    console.log('Import clicked');
    alert(profile.playerCollection.length);
  }

  return (
    <PlayerContext.Provider value={{profile}}>
      <div className={props.classes.panel}>
        <CardHeader
            title="Player Import"
            // subheader="Workflow 3 will occupy this space"
        />
        <Data />
        <Button 
          variant="contained"
          type="submit"
          size="small"
          color="primary"
          className={props.classes.button}
          onClick={handleImport}
        >
          Import
        </Button>
      </div>
    </PlayerContext.Provider>
  );
}

PlayerImport.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerImport);
