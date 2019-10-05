import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from "@material-ui/core/styles";
import { inCEPEnvironment, evalExtendscript } from 'cep-interface';
import {
    withStyles,
    Card,
    CardContent,
    CardActions,
    Typography,
    TextField,
    FormGroup,
    FormControl,
    FormControlLabel,
    Switch,
    Button,
    IconButton,
    Drawer,
    Divider,
} from '@material-ui/core';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import PlayerContext from './PlayerContext';
import Teams from './Teams';

import ARI from '../img/ARI_alt.svg';
import ATL from '../img/ATL_alt.svg';
import BAL from '../img/BAL_alt.svg';
import BUF from '../img/BUF_alt.svg';
import CAR from '../img/CAR_alt.svg';
import CHI from '../img/CHI_alt.svg';
import CIN from '../img/CIN_alt.svg';
import CLE from '../img/CLE_alt.svg';
import DAL from '../img/DAL_alt.svg';
import DEN from '../img/DEN_alt.svg';
import DET from '../img/DET_alt.svg';
import GB from '../img/GB_alt.svg';
import HOU from '../img/HOU_alt.svg';
import IND from '../img/IND_alt.svg';
import JAX from '../img/JAX_alt.svg';
import KC from '../img/KC_alt.svg';
import LAC from '../img/LAC_alt.svg';
import LAR from '../img/LAR_alt.svg';
import MIA from '../img/MIA_alt.svg';
import MIN from '../img/MIN_alt.svg';
import NE from '../img/NE_alt.svg';
import NO from '../img/NO_alt.svg';
import NYG from '../img/NYG_alt.svg';
import NYJ from '../img/NYJ_alt.svg';
import OAK from '../img/OAK_alt.svg';
import PHI from '../img/PHI_alt.svg';
import PIT from '../img/PIT_alt.svg';
import SEA from '../img/SEA_alt.svg';
import SF from '../img/SF_alt.svg';
import TB from '../img/TB_alt.svg';
import TEN from '../img/TEN_alt.svg';
import WAS from '../img/WAS_alt.svg';


const drawerWidth = '90%';

const styles = theme => ({
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
    subtitle1: {
        fontSize: 14,
        color: theme.palette.textColor.medium,
    },
    textField: {
        display: 'flex',
        margin: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(1),
    },
    switch: {
        margin: theme.spacing(1),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-start"
    },
    teamCount: {
        ...theme.typography.subtitle2,
    },
    drawerButtons: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    },
});


const Data = (props) => {
    const theme = useTheme();
    const {profile} = useContext(PlayerContext);

    const [open, setOpen] = useState(false);
    const [allTeamsToggle, setAllTeamsToggle] = useState(true);
    const [selectTeamColor, setSelectTeamColor] = useState('secondary');
    const [teamCollection, setTeamCollection] = useState([]);

    let teams = [
        {tri: 'ARI',    id: '3800', logo: ARI},
        {tri: 'ATL',    id: '0200', logo: ATL},
        {tri: 'BAL',    id: '0325', logo: BAL},
        {tri: 'BUF',    id: '0610', logo: BUF},
        {tri: 'CAR',    id: '0750', logo: CAR},
        {tri: 'CHI',    id: '0810', logo: CHI},
        {tri: 'CIN',    id: '0920', logo: CIN},
        {tri: 'CLE',    id: '1050', logo: CLE},
        {tri: 'DAL',    id: '1200', logo: DAL},
        {tri: 'DEN',    id: '1400', logo: DEN},
        {tri: 'DET',    id: '1540', logo: DET},
        {tri: 'GB',     id: '1800', logo: GB},
        {tri: 'HOU',    id: '2120', logo: HOU},
        {tri: 'IND',    id: '2200', logo: IND},
        {tri: 'JAX',    id: '2250', logo: JAX},
        {tri: 'KC',     id: '2310', logo: KC},
        {tri: 'LAC',    id: '4400', logo: LAC},
        {tri: 'LAR',    id: '2510', logo: LAR},
        {tri: 'MIA',    id: '2700', logo: MIA},
        {tri: 'MIN',    id: '3000', logo: MIN},
        {tri: 'NE',     id: '3200', logo: NE},
        {tri: 'NO',     id: '3300', logo: NO},
        {tri: 'NYG',    id: '3410', logo: NYG},
        {tri: 'NYJ',    id: '3430', logo: NYJ},
        {tri: 'OAK',    id: '2520', logo: OAK},
        {tri: 'PHI',    id: '3700', logo: PHI},
        {tri: 'PIT',    id: '3900', logo: PIT},
        {tri: 'SEA',    id: '4600', logo: SEA},
        {tri: 'SF',     id: '4500', logo: SF},
        {tri: 'TB',     id: '4900', logo: TB},
        {tri: 'TEN',    id: '2100', logo: TEN},
        {tri: 'WAS',    id: '5110', logo: WAS},
    ];

    const teamsAll = () => {
        return teams.map(team => (team.id))
    }

    const selectAll = () => {
        setTeamCollection(teamsAll);
        profile.teamCollection = teamsAll;
    }

    const selectNone = () => {
        setTeamCollection([]);
        profile.teamCollection = [];
    }

    useEffect(() => {
        teamCollection.length < 1 ? setSelectTeamColor('secondary') : setSelectTeamColor('primary');
    }, [teamCollection]);

    useEffect(() => {
        if(allTeamsToggle){
            setOpen(false);
            profile.teamCollection = teamsAll()
        }
        else{
            profile.teamCollection = selectNone();
        }
        profile.allTeams = allTeamsToggle;
    }, [allTeamsToggle]);

    useEffect(() => {
        if(!open && teamCollection.length === 32){
            setAllTeamsToggle(true);
        }
    }, [open]);

    const handleAllTeamsToggle = () => {
        setAllTeamsToggle(!allTeamsToggle);
    }

    let selectTeamsNode;

    if (allTeamsToggle === false) {
        selectTeamsNode = (
            <CardActions>
                <Button
                    color={selectTeamColor}
                    aria-label="open drawer"
                    edge="end"
                    onClick={() => setOpen(true)}
                >
                    Select Teams *
                </Button>
                <div className={props.classes.teamCount}>{teamCollection.length}</div>
            </CardActions>
        );
    }

    let getPlayersNode;

    if(teamCollection.length > 0){
        getPlayersNode = (
            <Button 
                variant="contained"
                type="submit"
                size="small"
                color="primary"
                className={props.classes.button}
                // onClick={handleImport}
            >
                Get Players
            </Button>
        );
    }

    return (
        <div>
            <Drawer
                className={props.classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                paper: props.classes.drawerPaper
                }}
            >
                <div className={props.classes.drawerHeader}>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === "rtl" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                    {getPlayersNode}
                </div>
                <Divider />
                <div className={props.classes.drawerButtons}>
                    <Button
                        color="primary"
                        aria-label="open drawer"
                        edge="end"
                        onClick={selectAll}
                    >
                        Select All
                    </Button>
                    <Button
                        color="primary"
                        aria-label="open drawer"
                        edge="end"
                        onClick={selectNone}
                    >
                        Select None
                    </Button>
                </div>  
                <Teams
                    teams={teams}
                    teamCollection={teamCollection}
                    setTeamCollection={setTeamCollection}
                />
            </Drawer>
            <Card className={props.classes.card}>
                <CardContent>
                    <Typography className={props.classes.title}>
                        Get Player Data
                    </Typography>
                    <CardActions>
                        <FormControl>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            className={props.classes.switch}
                                            color="primary"
                                            size="small"
                                            checked={allTeamsToggle}
                                            onChange={handleAllTeamsToggle}
                                            value="allTeamsToggle"
                                        />
                                    }
                                    label="All Teams"
                                    />
                                {selectTeamsNode}
                            </FormGroup>
                        </FormControl>
                    </CardActions>
                </CardContent>
            </Card>
        </div>
    );
}

Data.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Data);
