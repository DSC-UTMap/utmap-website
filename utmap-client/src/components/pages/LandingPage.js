import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import preview_image from "../img/preview_image.png";

const useStyles = makeStyles(theme => ({
    paper: {
        height: '25rem',
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(4),
        marginBottom: theme.spacing(4),
        padding: theme.spacing(6),
    },
    description: {
        marginLeft: theme.spacing(6),
        marginRight: theme.spacing(6),
        fontSize: '1.5rem',
    },
    button: {
        marginTop: theme.spacing(4)
    },
    media: {
        marginTop: theme.spacing(8),
        marginLeft: theme.spacing(25),
        maxHeight: '20rem',
        maxWidth: '30rem',
    }
}))

function LandingPage() {
    const classes = useStyles();

    return (
        <>
            <Header />
            <Grid container spacing={0}>
                <Grid item xs={6} align="center">
                    <Paper className={classes.paper}>
                        <Typography className={classes.description}>
                            Confused about when events are taking place? Want to invite people to your own event?
                            Come and check out the events calendar to see when events are taking place and our custom
                            map for where the events are taking place!
                        </Typography>
                        <Button variant="contained"
                            size="medium"
                            color="primary"
                            className={classes.button}
                            component={Link}
                            to='/map'>
                            Try it out!
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <img src={preview_image} className={classes.media} alt={"map"} />
                </Grid>
            </Grid>
            <Footer />
        </>
    )
}

export default LandingPage;
