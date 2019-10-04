import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  withStyles,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
} from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';

import Workflow2 from '../containers/Workflow2';
import Workflow3 from '../containers/Workflow3';
import IntVersionControl from './IntVersionControl';

import MenuList from '../components/MenuList';
import InfoDialog from '../components/InfoDialog';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarTitle: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    paddingTop: 0,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});


const PersistentDrawerLeft = (props) => {

  const [open, setOpen] = useState(false);
  const [menuState, setMenuState] = useState('Interstitial Batching');
  const [menuItems] = useState([ 'Interstitial Batching', 'Workflow 2', 'Workflow 3' ]);
  const [openInfo, setOpenInfo] = useState(false);
  const [infoTitle, setInfoTitle] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  useEffect(() => {
    switch (menuState){
      case menuItems[0]:
          setInfoTitle('Workflow: Interstitial Batching');
          setInfoMessage('Requirements:\n' +
          '\t- Requirements/notes will be displayed here.')
        break;
  
      case menuItems[1]:
          setInfoTitle('Workflow: Workflow 2');
          setInfoMessage('Requirements:\n' +
          '\t- Requirements/notes will be displayed here.')
        break;
  
      case menuItems[2]:
          setInfoTitle('Workflow: Workflow 3');
          setInfoMessage('Requirements:\n' +
          '\t- Requirements/notes will be displayed here.')
        break;
  
      default:
        break;
    };
  }, [openInfo]);


  const handleSwitchMenuItem = (item) => {
    setMenuState(item);
    setOpen(false);
  };

  

  let menuNode;

  switch (menuState){
    case menuItems[0]:
      menuNode =
        <IntVersionControl />
      break;

    case menuItems[1]:
      menuNode =
        <Workflow2 />
      break;

    case menuItems[2]:
      menuNode =
        <Workflow3 />
      break;

    default:
      break;
  };


  let infoNode;
    
  if(openInfo === true){
    infoNode =
        <InfoDialog
          infoTitle={infoTitle}
          infoMessage={infoMessage}
          openInfo={openInfo}
          onClose={() => setOpenInfo(false)}
        />
  }


  return (
    <div className={props.classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classNames(props.classes.appBar, {
          [props.classes.appBarShift]: open,
        })}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => setOpen(true)}
            className={classNames(props.classes.menuButton, open && props.classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classNames(props.classes.appBarTitle)}
          >
            NFL Graphics Panel
          </Typography>
          <IconButton
            aria-label="info of current workflow"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setOpenInfo(true)}
            color="inherit"
          >
            <InfoIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {infoNode}
      <Drawer
        className={props.classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: props.classes.drawerPaper,
        }}
      >
        <div className={props.classes.drawerHeader}>
          <IconButton onClick={() => setOpen(false)}>
            {props.theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <MenuList 
          listItems={menuItems}
          handleSwitchMenuItem={handleSwitchMenuItem}
        />
      </Drawer>
      <main
        className={classNames(props.classes.content, {
          [props.classes.contentShift]: open,
        })}
      >
        <div className={props.classes.drawerHeader} />
        {menuNode}
      </main>
    </div>
  );
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
