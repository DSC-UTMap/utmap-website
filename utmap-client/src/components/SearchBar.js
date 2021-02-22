import React, {useState} from "react";
import {FormControl, OutlinedInput, InputAdornment, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

function SearchBar({filterEvents}) {
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearch = event => {
		setSearchTerm(event.target.value);
		filterEvents(event.target.value);
	};

	return (
		<FormControl>
			<OutlinedInput
				id='searchBar'
				variant='outlined'
				name='UTMapSearch'
				value={searchTerm}
				onChange={handleSearch}
				endAdornment={
					<InputAdornment position='end'>
						<IconButton type="submit" aria-label="search">
		        	<SearchIcon />
		      	</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	);
}

export default SearchBar;