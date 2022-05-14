import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from '../../../../redux/actions/index.js';
import useFilters from '../../hooks/useFilters';
import useSorts from '../../hooks/useSorts.js';
import usePagination from '../../hooks/usePagination.js';
import { SEARCH_CONTROLS_DIV } from './StyledSearchControls.js';

const SearchControls = ({
	setGames,
	input,
	setInput,
	searchResults,
	setSearchResults,
	handleSearch,
	loading,
}) => {
	const { handleGenreSelection, handleSourceSelection, filteredGames } =
		useFilters();
	const { handleSortSelection, sortedGames, sort } = useSorts(filteredGames);

	const {
		nextHandler,
		prevHandler,
		pageButtons,
		page,
		paginatedGames,
		setPage,
	} = usePagination(sortedGames);
	const genres = useSelector((state) => state.genres);

	React.useEffect(() => {
		setGames(paginatedGames);
		console.log(sortedGames);
	}, [filteredGames, sortedGames, paginatedGames]);

	// React.useEffect(() => {
	// 	setGames(filteredGames);
	// }, [filteredGames]);

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
						<button disabled={loading} onClick={prevHandler}>
							Previous
						</button>
						{pageButtons}
						<button onClick={nextHandler}>Next</button>
					</div>
					<div className='sorts'>
						<button onClick={() => handleSortSelection(`RATING`)}>
							RATING{' '}
							{!!sort &&
								Object.keys(sort)?.includes(`RATING`) &&
								(sort.RATING ? `▲` : `▼`)}
						</button>
						<button onClick={() => handleSortSelection(`NAME`)}>
							NAME{' '}
							{!!sort &&
								Object.keys(sort)?.includes(`NAME`) &&
								(sort.NAME ? `▲` : `▼`)}
						</button>
						<button onClick={() => handleSortSelection()}>RESET</button>
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
