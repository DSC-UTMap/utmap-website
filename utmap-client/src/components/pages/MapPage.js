import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from "./SideBar";
import clsx from 'clsx';
  
const useStyles = makeStyles(theme => ({
    hide: {
      display: 'none',
    },
  }));

function MapPage() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      {/* Siderbar */}
      <div align="right">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          className={clsx(openDrawer && classes.hide)}
          alignment="right"
          >
          <MenuIcon />
        </IconButton>
        <SideBar open={openDrawer} onClose={handleDrawerClose}></SideBar>
      </div>
      <p>Map</p>
    </>
  )
}

export default MapPage;
