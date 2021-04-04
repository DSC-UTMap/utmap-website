import React, { useState, useEffect } from 'react';
import {
	Paper,
	Grid,
	Button,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import DescriptionIcon from '@material-ui/icons/Description';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import {updateEvent, getBuildings, addEvent} from '../../requests';

const useStyles = makeStyles(theme => ({ //CSS styles on components
	box: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'gray',
	},
	paper: {
		width: '40rem',
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(6),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		display: 'flex',
	},
	row: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	},
	longBox: {
		width: '100%',
		marginLeft: theme.spacing(2),
	},
	shortBox: {
		width: '50%',
		marginLeft: theme.spacing(2),
	},
}));


function EventFormPage({onClose, refreshEvents, editEvent, event, errorCallback}) {
	const isEdit = Object.keys(event).length !== 0;
	const formStyle = useStyles(); 
	const [startDate, setStartDate] = useState(isEdit ? new Date(event.startDate) : new Date());
	const [endDate, setEndDate] = useState(isEdit ? new Date(event.endDate) : new Date());
	const [location, setLocation] = useState(isEdit ? event.location : '');
	const [title, setTitle] = useState(isEdit ? event.title : '');
	const [sublocation, setSublocation] = useState(isEdit ? event.sublocation : '');
	const [description, setDescription] = useState(isEdit ? event.description : '');
	const [organizer] = useState(isEdit ? event.organizer : 'Unknown'); // currently no organizer input
	const [buildings, setBuildings] = useState([]);

	//Get list of buildings
	useEffect(() => {
		getBuildings().then(data => setBuildings(data), err => { errorCallback(err); })
	}, [errorCallback]);

	//This is where the form will send to server
	const handleSubmit = e => {
		e.preventDefault(); //Stop the form from submitting
		startDate.setSeconds(0,0);
		endDate.setSeconds(0,0);
		
		if (startDate >= endDate){
			alert("End date must be after start date");
		} else {
			const eventForm = {
				title, 
				startDate: startDate.toLocaleString('en-US', { timeZone: 'America/New_York' }), 
				endDate: endDate.toLocaleString('en-US', { timeZone: 'America/New_York' }),
				location, sublocation, description, organizer};
			const toBackend = {
				name: title,
				organizer: eventForm.organizer,
				startTime: eventForm.startDate,
				endTime: eventForm.endDate,
				building: buildings.find(building => building.name === location),
				room: sublocation,
				description
			};
			if(isEdit) {
				eventForm._id = event._id;
				editEvent(eventForm);
				updateEvent(toBackend, event._id).then(
					res => { refreshEvents(); }, 
					err => { errorCallback(err); });
			} else {
				addEvent(toBackend).then(
					res => { refreshEvents(); }, 
					err => { errorCallback(err); });
			}
			onClose();
		}
	}


	return (
		<div className={formStyle.box}>
		<Paper className={formStyle.paper} >
			<form className='eventForm' action='' method='post' onSubmit={handleSubmit}>
			<Grid container spacing={3}>
				{onClose ? (
	        <IconButton aria-label="close" onClick={onClose}>
	          <CloseIcon />
	        </IconButton>
	      ) : null}

	 			<Grid item className={formStyle.row}>
					<CreateIcon/>
	        <TextField
						className={formStyle.longBox}
						id='eventTitle'
						variant='outlined'
						name='title'
						label='Title'
						value={title}
						onChange={event => setTitle(event.target.value)}
						autoComplete='off'
						required
						autofocus
	      	/>
				</Grid>


				<Grid item className={formStyle.row}>
					<CalendarTodayIcon/>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
	 					<DateTimePicker 
							className={formStyle.shortBox}
							name='startDate'
							value={startDate}
							onChange={setStartDate} 
							inputVariant='outlined'
							label='Start Date'
							disablePast
						/>
						<DateTimePicker 
							className={formStyle.shortBox}
							name='endDate'
							value={endDate}
							onChange={setEndDate} 
							inputVariant='outlined'
							label='End Date'
							disablePast
						/>
					</MuiPickersUtilsProvider>
				</Grid>


				<Grid item className={formStyle.row}>
					<AddLocationIcon/>
					<FormControl 
						className={formStyle.shortBox} 
						variant='outlined' 
						required
					>
						<InputLabel>Location</InputLabel>
						<Select
							id='eventLocation'
							name='location'
							value={location}
							onChange={event => setLocation(event.target.value)}
							label='Location *'
						>
							{buildings.map((building) => {
								return <MenuItem value={building.name}>{building.name} ({building.code})</MenuItem>;
							})}
						</Select>
					</FormControl>
					<TextField
						className={formStyle.shortBox}
						id='eventSublocation'
						name='sublocation'
						variant='outlined'
						label='Room'
						value={sublocation}
						onChange={event => setSublocation(event.target.value)}
					/>
				</Grid>


				<Grid item className={formStyle.row}>
					<DescriptionIcon/>
					<TextField
						className={formStyle.longBox}
						id="eventDescription"
						name='description'
						label='Description'
						multiline
						rows={4}
						variant='outlined'
						value={description}
						onChange={event => setDescription(event.target.value)}
					/>
				</Grid>


				<Grid item className={formStyle.row} justify='flex-end'>
					<Button 
						variant='contained' 
						color='secondary'
						type='submit'
					>
						Submit
					</Button>
				</Grid>
			</Grid>
			</form>
		</Paper>
    </div>
	);
}

export default EventFormPage;