import React, { useState } from 'react';
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
		backgroundColor: theme.palette.primary.main,
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

function SingleEventPage({event, closePopup, handleEdit}) {
	const {startDate, endDate, title, description, 
		location, sublocation, organizer} = event;
	const classes = useStyles();

	//expand for description
	const [expanded, setExpanded] = useState(false);
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
							<IconButton aria-label="close" onClick={closePopup}>
								<CloseIcon />
							</IconButton>
						</Grid>
						<Grid item xs="6" align="right">
							{(Date.now() <= Date.parse(event.endDate)) &&
								<IconButton aria-label="edit" onClick={() => handleEdit(event)}>
									<EditIcon />
								</IconButton>
							}
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
						{sublocation + " in " + location}
					</Typography>

					{/* Dates and Times */}
					<Grid item className={classes.row}>
						<Grid item xs="6" align="center">
							<Typography variant="subtitle2" align="center">
								{"Start Date: " + (new Date(startDate)).toLocaleString()}
							</Typography>
						</Grid>
						<Grid item xs="6" align="center">
							<Typography variant="subtitle2" align="center">
								{"End Date: " + (new Date(endDate)).toLocaleString()}
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
	event: PropTypes.exact({
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
		sublocation: PropTypes.string.isRequired,
		organizer: PropTypes.string.isRequired,
	}),
}
 
export default SingleEventPage;