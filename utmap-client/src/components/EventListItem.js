import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';


const useStyles = makeStyles(theme => ({
    column: {
        flexBasis: '20%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '40%',
				textAlign: 'left',
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '40%',
        color: theme.palette.text.secondary,
				textAlign: 'left',
    },
    description: {
        width: '100%',
				textAlign: 'center',
    }
}));

function EventListItem(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const onAccordionClick = () => {
        setExpanded(!expanded);
    }

    const displayName = () => {
        if (props.event.name.length >= 50){
            return (props.event.name.substring(0,50) + '...');
        } else {
            return (props.event.name);
        }
    }

    const displayDescription = () => {
        if (props.event.description.length >= 50){
            return (props.event.description.substring(0,50) + '...');
        } else {
            return (props.event.description);
        }
    }

    const displayDate = () => {
        var date = new Date(props.event.startTime);
        return (date.toDateString());
    }
        
    return (
        <Accordion onChange={onAccordionClick}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {/* Event Title and First 50 characters */}
                <div className={classes.heading}>
                    <Typography>
                        {displayName()}
                    </Typography>
                </div>
                <div className={classes.secondaryHeading}>
                    <Fade in={!expanded}>
                        <Typography>
                            {displayDescription()}
                        </Typography>
                    </Fade>
                </div>
                {/* Event Date and Location*/}
                <div className={classes.column}>
                    <Typography variant="caption" noWrap='true' >
                        {displayDate()}
                    </Typography>
                    <Divider />
                    <Typography variant="caption" noWrap='true' >
                        {props.event.building.name}
                    </Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className={classes.description}>
                    {/* Event Description */}
                    <Typography align='center' variant='h6'>
                        {props.event.name}
                    </Typography>
                    <Typography>
                        {props.event.description ? props.event.description : 'No description'}
                    </Typography>
                </div>

            </AccordionDetails>
        </Accordion>
    )
    
}

// PropTypes
EventListItem.propTypes = {
    event: PropTypes.object.isRequired,
}

export default EventListItem;