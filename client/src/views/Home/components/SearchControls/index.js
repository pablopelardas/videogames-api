import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGames, clearErrors } from '../../../../redux/actions';
import useFilters from '../../hooks/useFilters';
import useSorts from '../../hooks/useSorts.js';
import usePagination from '../../hooks/usePagination.js';
import { SEARCH_CONTROLS_DIV } from './StyledSearchControls.js';

const SearchControls = ({ setGames, loading }) => {
	const dispatch = useDispatch();
	const gamesByName = useSelector((state) => state.gamesByName);
	const gamesError = useSelector((state) => state.gamesError);
	const genres = useSelector((state) => state.genres);
	const [searchResults, setSearchResults] = React.useState(false);
	const [input, setInput] = React.useState('');

	const {
		handleGenreSelection,
		handleSourceSelection,
		handleReset,
		filteredGames,
	} = useFilters();
	const { handleSortSelection, sortedGames, sort } = useSorts(filteredGames);
	const {
		nextHandler,
		prevHandler,
		pageButtons,
		paginatedGames,
		setPage,
		limit,
	} = usePagination(sortedGames);

	React.useEffect(() => {
		dispatch(clearErrors());
		handleReset();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(() => {
		setGames(paginatedGames);
	}, [filteredGames, sortedGames, paginatedGames]); // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(() => {
		if (gamesByName.length) {
			setGames([...gamesByName]);
		}
	}, [gamesByName]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleSearch = (e) => {
		if (input === '') return;
		dispatch(getGames(input));
		setSearchResults(true);
	};

	const validateSort = (type, isClass = false) => {
		if (isClass) {
			return !!sort && Object.keys(sort)?.includes(type);
		} else
			return (
				!!sort && Object.keys(sort)?.includes(type) && (sort[type] ? `▲` : `▼`)
			);
	};

	return !!Object.keys(gamesError).length ? (
		<SEARCH_CONTROLS_DIV>
			<button
				className='return-button'
				disabled={loading}
				onClick={() => {
					setSearchResults(false);
					setInput('');
					dispatch(clearErrors());
					handleReset();
					setPage(0);
				}}
			>
				Return to all games
			</button>
		</SEARCH_CONTROLS_DIV>
	) : (
		<SEARCH_CONTROLS_DIV>
			<div className='search'>
				<input
					className='search--bar'
					placeholder='Search game'
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button
					className='search--button'
					disabled={loading}
					onClick={handleSearch}
				>
					Search
				</button>
			</div>
			{searchResults ? (
				<button
					className='return-button'
					disabled={loading}
					onClick={() => {
						setSearchResults(false);
						setInput('');
						dispatch(clearErrors());
						handleReset();
						setPage(0);
					}}
				>
					Return to all games
				</button>
			) : (
				<>
					<div className='sorts'>
						<button
							className={`sorts--button ${
								validateSort(`RATING`, true) && 'selected'
							}`}
							onClick={() => handleSortSelection(`RATING`)}
						>
							RATING {validateSort(`RATING`)}
						</button>
						<button
							className={`sorts--button ${
								validateSort(`NAME`, true) && 'selected'
							}`}
							onClick={() => handleSortSelection(`NAME`)}
						>
							NAME {validateSort(`NAME`)}
						</button>
						<button
							className='sorts--button'
							onClick={() => handleSortSelection()}
						>
							RESET
						</button>
					</div>
					<div className='filters'>
						<select
							className='filters--select'
							disabled={loading}
							onChange={(e) => {
								setPage(0);
								handleGenreSelection(e);
							}}
						>
							<option value='All'>All</option>
							{genres.map((genre) => (
								<option value={genre.name} key={genre.id}>
									{genre.name}
								</option>
							))}
						</select>
						<select
							className='filters--select'
							disabled={loading}
							defaultValue='All'
							onChange={handleSourceSelection}
						>
							<option value='All'>All</option>
							<option value='Api'>Api</option>
							<option value='Database'>Database</option>
						</select>
					</div>
					<div className='pages'>
						<button
							hidden={limit <= 1}
							className='pages--prev-button'
							disabled={loading}
							onClick={prevHandler}
						>
							Previous
						</button>
						{limit > 0 && pageButtons}
						<button
							hidden={limit <= 1}
							className='pages--next-button'
							disabled={loading}
							onClick={nextHandler}
						>
							Next
						</button>
					</div>
				</>
			)}
		</SEARCH_CONTROLS_DIV>
	);
};

export default SearchControls;
