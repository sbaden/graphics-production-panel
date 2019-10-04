import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';


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
});


const Workflow3 = (props) => {

  return (
    <div>
      <CardHeader
          title="Workflow 3"
          // subheader="Workflow 3 will occupy this space"
      />
      <Card className={props.classes.card}>
      <CardContent>
        <Typography className={props.classes.title}>
            Content Header
        </Typography>
      </CardContent>
      </Card>
    </div>
  );
}

Workflow3.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Workflow3);
