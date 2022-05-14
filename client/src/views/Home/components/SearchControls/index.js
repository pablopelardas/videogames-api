import React from 'react';
import { SEARCH_CONTROLS_DIV } from './StyledSearchControls.js';

const SearchControls = ({
	input,
	setInput,
	searchResults,
	setSearchResults,
	handleSearch,
	prevHandler,
	pageButtons,
	nextHandler,
	handleSortSelection,
	handleGenreSelection,
	handleSourceSelection,
	page,
	setPage,
	genres,
}) => {
	return (
		<SEARCH_CONTROLS_DIV>
			<div className='search'>
				<input
					placeholder='Search game'
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button onClick={handleSearch}>Search</button>
			</div>
			{searchResults ? (
				<>
					<button
						onClick={() => {
							setSearchResults(false);
							setPage(0);
						}}
					>
						Return to all games
					</button>
					<h1 className='searchbar--currentPage'>Page: {page + 1}</h1>
				</>
			) : (
				<>
					<div className='pages'>
						<button onClick={prevHandler}>Previous</button>
						{pageButtons}
						<button onClick={nextHandler}>Next</button>
					</div>
					<div className='sorts'>
						<select onChange={handleSortSelection} defaultValue='ORDER BY'>
							<option value='ORDER BY'>ORDER BY</option>
							<option value='RATING DES'>RATING (DES)</option>
							<option value='RATING ASC'>RATING (ASC)</option>
							<option value='NAME ASC'>{`NAME A--> Z`}</option>
							<option value='NAME DES'>{`NAME Z--> A`}</option>
						</select>
					</div>
					<div className='filters'>
						<select onChange={handleGenreSelection}>
							<option value='All'>All</option>
							{genres.map((genre) => (
								<option value={genre.name} key={genre.id}>
									{genre.name}
								</option>
							))}
						</select>
						<select defaultValue='Api' onChange={handleSourceSelection}>
							<option value='All'>All</option>
							<option value='Api'>Api</option>
							<option value='Database'>Database</option>
						</select>
					</div>
					<h1 className='searchbar--currentPage'>Page: {page + 1}</h1>
				</>
			)}
		</SEARCH_CONTROLS_DIV>
	);
};

export default SearchControls;
