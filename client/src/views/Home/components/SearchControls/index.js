import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from '../../../../redux/actions/index.js';
import useFilters from '../../hooks/useFilters';
import { SEARCH_CONTROLS_DIV } from './StyledSearchControls.js';

const SearchControls = ({
	gameList,
	setGames,
	input,
	setInput,
	searchResults,
	setSearchResults,
	handleSearch,
	prevHandler,
	pageButtons,
	nextHandler,
	handleSortSelection,
	page,
	setPage,
}) => {
	const { handleGenreSelection, handleSourceSelection, filteredGames } =
		useFilters();

	const genres = useSelector((state) => state.genres);

	React.useEffect(() => {
		setGames(filteredGames);
	}, [filteredGames]);

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
				<button
					onClick={() => {
						setSearchResults(false);
						setPage(0);
					}}
				>
					Return to all games
				</button>
			) : (
				<>
					<div className='pages'>
						<button onClick={prevHandler}>Previous</button>
						{pageButtons}
						<button onClick={nextHandler}>Next</button>
					</div>
					<div className='sorts'>
						<select onChange={handleSortSelection} defaultValue='ALL'>
							<option value='ALL'>ALL</option>
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
						<select defaultValue='All' onChange={handleSourceSelection}>
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
