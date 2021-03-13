import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExploreIcon from '@material-ui/icons/Explore';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 3,
    },
    titleItem: {
        flexGrow: 0.1,
    },
    link: {
        color: '#FFF'
    }
}))


function Header() {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <ExploreIcon className={classes.icon}/>
                <Typography variant="h4" className={classes.title}>
                    UTMap
                </Typography>
                <Typography variant="h6" className={classes.titleItem}>
                    <Link to="/map" className={classes.link}>
                        Map
                    </Link>
                </Typography>
                <Typography variant="h6" className={classes.titleItem}>
                    <Link to="/calendar" className={classes.link}>
                        Calendar
                    </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
