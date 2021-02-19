import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideBarContent from '../SideBarContent';

const drawerWidth = '32rem';

const useStyles = makeStyles((theme) => ({
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
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
}));


function SideBar({open, onClose, events}) {
    const classes = useStyles();
    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={open}
            classes={{paper: classes.drawerPaper, }}
            >
            <div className={classes.drawerHeader}>
                <IconButton
                    color="inherit"
                    aria-label="close drawer"
                    edge="end"
                    onClick={onClose}>
                    <MenuIcon />
                </IconButton>
            </div>
						<SideBarContent events={events}/>
        </Drawer>
    );
    
}

export default SideBar;