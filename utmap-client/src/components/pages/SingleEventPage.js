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
	DialogActions,
	DialogContent,
	DialogTitle,
	DialogContentText,
	Dialog,
	Button
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete'
import { deleteEvent } from '../../requests'

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

function SingleEventPage({event, closePopup, handleEdit, refreshEvents}) {
	const {startDate, endDate, title, description, 
		location, sublocation, organizer} = event;
	const classes = useStyles();
	const [openDeletionConfirm, setOpenDeletionConfirm] = useState(false);

	//expand for description
	const [expanded, setExpanded] = useState(false);
  	const handleExpandClick = () => {
    	setExpanded(!expanded);
	  };

	const handleCloseDeletionConfirm = () => {
		setOpenDeletionConfirm(false);
	}

	const handleOpenDeletionConfirm = () => {
		setOpenDeletionConfirm(true);
	}
	
	const handleDelete = (id) => {
		
		console.log(deleteEvent('notreal'));
		//refreshEvents();
	}
	
	return (
		<div className={classes.box}>
			{/* Popup box for deletion confirmation*/}
			<Dialog open={openDeletionConfirm} onClose={handleCloseDeletionConfirm}>
				<DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this event?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Once an event is deleted, it is gone forever.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDeletionConfirm} color="primary">
						Cancel
					</Button>
					<Button onClick={() => handleDelete(event._id)} color="primary" autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>

			<Paper className={classes.paper}>
				<GridList cellHeight='auto' cols={1}>

					{/* Close, Edit, and Delete Icons */}
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
							<IconButton aria-label="delete" onClick={handleOpenDeletionConfirm}>
								<DeleteIcon />
							</IconButton>
							
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
					<div align="center">
						<IconButton onClick={handleExpandClick} disableRipple aria-label="show more">
							<Typography variant="caption">
								DESCRIPTION
							</Typography>
							{expanded ? <ExpandLessIcon fontSize={'large'}/> : <ExpandMoreIcon fontSize={'large'}/>}
						</IconButton>
					</div>
					<Collapse in={expanded} timeout="auto" unmountOnExit>
						<Typography variant="body2" component="span">
							{description}
						</Typography>
					</Collapse>

				</GridList>
			</Paper>
		</div>
	);
}

SingleEventPage.propTypes = {
	event: PropTypes.exact({
		_id: PropTypes.string,
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