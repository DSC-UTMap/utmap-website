import React from 'react';
import {
	Avatar,
	Collapse,
	IconButton,
	Grid,
	GridList,
	makeStyles,
	Paper,
	Typography,
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({ //CSS styles on components
	box: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'gray',
	},
	paper: {
		width: '35rem',
		marginTop: theme.spacing(6),
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		display: 'flex',
	},
	largeIcon: {
		width: theme.spacing(6),
		height: theme.spacing(6),
	},
	largeAvatar: {
		background: '#002884',
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
	row: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	},
	title: {
		textAlign: 'center',
	},

}));

function SingleEventPage({startDate, endDate, title, description, location, sublocation, organizer}) {
	const classes = useStyles();
	
	//strings for the dates and location
	const startDateString = "Start Date: " + (new Date(startDate)).toLocaleString()
	const endDateString = "End Date: " + (new Date(endDate)).toLocaleString()
	const locationString = sublocation + " in " + location

	//expand for description
	const [expanded, setExpanded] = React.useState(false);
  	const handleExpandClick = () => {
    	setExpanded(!expanded);
	  };
	  
    return (
        <div className={classes.box}>
            <Paper className={classes.paper}>
				<GridList cellHeight='auto' cols={1}>

					{/* Close and Edit Icons */}
					<Grid item className={classes.row}>
						<Grid item xs="6" align="left">
							<IconButton aria-label="close"><CloseIcon /></IconButton>
						</Grid>
						<Grid item xs="6" align="right">
							<IconButton aria-label="edit"><EditIcon /></IconButton>
						</Grid>
					</Grid>

					{/* Event Icon */}
					<div align="center">
						<Avatar className={classes.largeAvatar}>
							<AssignmentIcon className={classes.largeIcon}/>
						</Avatar>
					</div>

					{/* Title */}
					<Typography className={classes.title} variant="h4">
						{title}
					</Typography>

					{/* Organizer */}
					<Typography variant="caption" align="center">
						Organizer: {organizer}
					</Typography>

					{/* Location */}
					<Typography variant="subtitle1" align="center">
						{locationString}
					</Typography>

					{/* Dates and Times */}
					<Grid item className={classes.row}>
						<Grid item xs="6" align="center">
							<Typography variant="subtitle2" align="center">
								{startDateString}
							</Typography>
						</Grid>
						<Grid item xs="6" align="center">
							<Typography variant="subtitle2" align="center">
								{endDateString}
							</Typography>
						</Grid>
					</Grid>

					{/* Description */}
					<div align="right">
						<IconButton onClick={handleExpandClick} aria-label="show more">
							{expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
						</IconButton>
					</div>
					<Collapse in={expanded} timeout="auto" unmountOnExit>
						<Typography variant="body2" component="span">
							Description: {description}
						</Typography>
					</Collapse>

				</GridList>
            </Paper>
        </div>
    );
}

SingleEventPage.propTypes = {
	startDate: PropTypes.string.isRequired,
	endDate: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
	sublocation: PropTypes.string.isRequired,
	organizer: PropTypes.string.isRequired,
}
 
export default SingleEventPage;