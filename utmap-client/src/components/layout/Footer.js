import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import avatars from '../data/Contributors'

const useStyles = makeStyles(theme => ({
    divider: {
        marginTop: theme.spacing(2), 
    },
    title: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
    },
    icon: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(8),
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    name: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(4),
        fontSize: '0.95rem',
        width: '100%',
    },
    description: {
        color: 'grey',
        fontSize: '0.9rem',
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(3),
    }
}))

function Footer() {
    const classes = useStyles();
    return (
        <>
            <Divider className={classes.divider}/>
            <Typography variant='h5' className={classes.title}>
                About Us
            </Typography>
            <Grid container spacing={0}>
                {avatars.map((avatar) => (
                    <Grid item xs>
                        <Avatar alt={avatar.name} className={classes.icon} src={avatar.url}/>
                        <Typography className={classes.name}>
                            {avatar.name}
                        </Typography>
                        <Typography className={classes.description}>
                            {avatar.title}
                        </Typography>
                    </Grid>
                ))}
                <Grid item xs={5}>
                    <Typography className={classes.description}>
                        We are a team of students at UTM. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                        laboris nisi ut aliquip ex ea commodo consequat
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default Footer
