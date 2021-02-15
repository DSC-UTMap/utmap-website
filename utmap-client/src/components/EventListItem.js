import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';


const styles = theme => ({
    column: {
        flexBasis: '20%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '40%',
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '40%',
        color: theme.palette.text.secondary,
    },
    description: {
        width: '100%',
    }
  });

export class EventListItem extends Component {
    constructor() {
        super();
        this.onAccordionClick = this.onAccordionClick.bind(this);
        this.state = { expanded: true };
    }

    onAccordionClick(){
        this.setState({
            expanded: !this.state.expanded
        });
    }

    displayTitle(){
        if (this.props.event.title.length >= 50){
            return (this.props.event.title.substring(0,50) + '...');
        } else {
            return (this.props.event.title);
        }
    }

    displayDescription(){
        if (this.props.event.description.length >= 50){
            return (this.props.event.description.substring(0,50) + '...');
        } else {
            return (this.props.event.description);
        }
    }

    displayDate(){
        var date = new Date(this.props.event.startDate);
        return (date.toDateString());
    }

    render() {
        const { classes } = this.props;
        
        return (
            <Accordion onChange={this.onAccordionClick}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {/* Event Title and First 50 characters */}
                    <div className={classes.heading}>
                        <Typography>
                            {this.displayTitle()}
                        </Typography>
                    </div>
                    <div className={classes.secondaryHeading}>
                        <Fade in={this.state.expanded}>
                            <Typography>
                                {this.displayDescription()}
                            </Typography>
                        </Fade>
                    </div>
                    {/* Event Date and Location*/}
                    <div className={classes.column}>
                        <Typography variant="caption" noWrap='true' >
                            {this.displayDate()}
                        </Typography>
                        <Divider />
                        <Typography variant="caption" noWrap='true' >
                            {this.props.event.location}
                        </Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.description}>
                        {/* Event Description */}
                        <Typography align='center' variant='h6'>
                            {this.props.event.title}
                        </Typography>
                        <Typography>
                            {this.props.event.description}
                        </Typography>
                    </div>

                </AccordionDetails>
            </Accordion>
        )
    }
}

// PropTypes
EventListItem.propTypes = {
    event: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventListItem);