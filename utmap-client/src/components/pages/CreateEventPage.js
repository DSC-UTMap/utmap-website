import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CreateIcon from '@material-ui/icons/Create';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import DescriptionIcon from '@material-ui/icons/Description';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({ //CSS styles on components
	box: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'gray',
	},
	paper: {
		width: '40rem',
		marginTop: theme.spacing(6),
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


function CreateEventPage() {
	const formStyle = useStyles(); 
	const [selectedDate, handleDateChange] = useState(new Date());
	const [location, setLocation] = useState('SC');
	let history = useHistory(); //For Router redirection

	const handleLocationChange = event => setLocation(event.target.value);
	//This is where the form will send to server
	const handleSubmit = event => {
		event.preventDefault(); //Stop the form from submitting
		history.push('/'); //Redirect to this page
	}
	return (
		<div className={formStyle.box}>
		<Paper className={formStyle.paper} >
			<form className='eventForm' action='' method='post' onSubmit={handleSubmit}>
			<Grid container spacing={3}>

	 			<Grid item className={formStyle.row}>
					<CreateIcon/>
	        <TextField
						className={formStyle.longBox}
						id='eventTitle'
						variant='outlined'
						name='title'
						label='Title'
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
							value={selectedDate}
							onChange={handleDateChange} 
							inputVariant='outlined'
							label='Start Date'
							disablePast
						/>
						<DateTimePicker 
							className={formStyle.shortBox}
							name='endDate'
							value={selectedDate}
							onChange={handleDateChange} 
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
							onChange={handleLocationChange}
							label='Location *'
						>
							<MenuItem value='SC'>Student Center</MenuItem>
							<MenuItem value='DV'>Davis (DV)</MenuItem>
							<MenuItem value='IB'>Instructional Building (IB)</MenuItem>
							<MenuItem value='DH'>Deerfield Hall (DH)</MenuItem>
							<MenuItem value='MN'>Maanjiwe Nendamowinan (MN)</MenuItem>
						</Select>
					</FormControl>
					<TextField
						className={formStyle.shortBox}
						id='eventSublocation'
						name='sublocation'
						variant='outlined'
						label='Room'
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
					/>
				</Grid>


				<Grid item className={formStyle.row} justify='flex-end'>
					<Button 
						variant='contained' 
						color='primary'
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

export default CreateEventPage;