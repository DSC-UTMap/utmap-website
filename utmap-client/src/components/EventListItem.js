import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';


const styles = theme => ({
    column: {
        flexBasis: '33.33%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexShrink: 0,
      },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
  });

export class EventListItem extends Component {

    render() {
        const { classes } = this.props;
        var date = new Date(this.props.event.startDate);
        return (
            <div>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {/* Event Title and First 50 characters */}
                        <div className={classes.column}>
                            <Typography className={classes.heading}>{this.props.event.title}</Typography>
                        </div>
                        <div className={classes.column}>
                            <Typography className={classes.secondaryHeading} >
                                {this.props.event.description.substring(0,50)}
                            </Typography>
                        </div>
                        {/* Event Date and Location*/}
                        <div className={classes.column}>
                            <Typography variant="caption" noWrap='true' >
                                {date.toDateString()}
                            </Typography>
                            <Divider />
                            <Typography variant="caption" noWrap='true' >
                                {this.props.event.location}
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* Event Description */}
                        <Typography variant="body1">{this.props.event.description}</Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }
}

// PropTypes
EventListItem.propTypes = {
    event: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventListItem);