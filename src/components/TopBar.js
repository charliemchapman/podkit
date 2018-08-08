import React from 'react';
import { withStyles } from 'material-ui/styles';
import { AppBar, Toolbar, IconButton, Typography } from 'material-ui';
// import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    rightButton: {
        fill: "#FFF"
    }
  };

const TopBar = ({classes, onOpen, onCreateNew, onMenuClicked, children}) => {
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={onMenuClicked} className={classes.menuButton} color="inherit" aria-label="Menu">
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        PodKit
                    </Typography>
                    {children}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(TopBar);