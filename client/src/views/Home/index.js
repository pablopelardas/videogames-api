import React from 'react';
import { HOME_SECTION, HOME_GAME_CONTAINER } from './StyledHome';
import GameCards from './components/GameCards';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenres, getGamesByGenre } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const GAMES_PER_PAGE = 15;

const Home = () => {
	// Global State
	const dispatch = useDispatch();
	const gameList = useSelector((state) => state.games);
	const genres = useSelector((state) => state.genres);
	const gamesByGenre = useSelector((state) => state.gamesByGenre);
	const gamesByName = useSelector((state) => state.gamesByName);
	const loading = useSelector((state) => state.isLoading);
	const gamesError = useSelector((state) => state.gamesError);

	const navigate = useNavigate();

	// Local States
	const [page, setPage] = React.useState(0);
	const [games, setGames] = React.useState([]);
	const [currentGenre, setGenre] = React.useState('All');
	const [limit, setLimit] = React.useState(0);
	const [source, setSource] = React.useState('All');
	const [sort, setSort] = React.useState({ type: 'ORDER BY', option: 'all' });
	const [input, setInput] = React.useState('');
	const [searchResults, setSearchResults] = React.useState(false);

	const [pageButtons, setPageButtons] = React.useState([]);

	//Paginacion

	const nextHandler = () => {
		return page < limit - 1 ? setPage(page + 1) : null;
	};

	const prevHandler = () => {
		return page > 0 ? setPage(page - 1) : null;
	};

	const pageButtonHandler = (e) => {
		const targetPage = parseInt(e.target.innerText) - 1;
		setPage(targetPage);
	};

	const handleGenreSelection = (e) => {
		setGenre((state) => {
			state = `${e.target.value}`;
			dispatch(getGamesByGenre(state, source));
			return state;
		});
		setPage(0);
	};
	const handleSourceSelection = (e) => {
		setSource((state) => {
			state = `${e.target.value}`;
			dispatch(getGamesByGenre(currentGenre, state));
			return state;
		});
		setPage(0);
	};
	const handleSortSelection = (e) => {
		setSort((state) => {
			let [type, option] = e.target.value.split(' ');
			state = { type, option };
			console.log(state);
			return state;
		});
	};
	const handleSearch = (e) => {
		dispatch(getGames(input));
		setSearchResults(true);
	};

	const handleCardClick = (id) => {
		navigate(`/detail/${id}`);
	};

	const applySort = (array) => {
		switch (sort.type) {
			case `ORDER BY`:
				return array;
			case `RATING`:
				if (sort.option === 'DES')
					return array.sort((a, b) => b.rating - a.rating);
				if (sort.option === 'ASC')
					return array.sort((a, b) => a.rating - b.rating);
				break;
			case `NAME`:
				if (sort.option === 'ASC')
					return array.sort((a, b) => a.name.localeCompare(b.name));
				if (sort.option === 'DES')
					return array.sort((a, b) => b.name.localeCompare(a.name));
				break;
			default:
				return array;
		}
	};

	React.useEffect(() => {
		if (!gameList.length) dispatch(getGames());
		if (!genres.length) dispatch(getGenres());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	React.useEffect(() => {
		let index = {
			Api: 1,
			Database: 0,
		};
		if (gameList.length && !searchResults) {
			// if (currentGenre === 'All'){
			// }

			if (source !== 'All') {
				if (currentGenre === 'All') {
					setGames(
						applySort([...gameList[index[source]]]).splice(
							page * GAMES_PER_PAGE,
							GAMES_PER_PAGE
						)
					);
					setLimit(Math.ceil(gameList[index[source]].length / 15));
				} else {
					setGames(
						applySort([...gamesByGenre]).splice(
							page * GAMES_PER_PAGE,
							GAMES_PER_PAGE
						)
					);
					setLimit(Math.ceil(gamesByGenre.length / 15));
				}
			} else {
				if (currentGenre === 'All') {
					setGames(
						applySort([...gameList].flat(2)).splice(
							page * GAMES_PER_PAGE,
							GAMES_PER_PAGE
						)
					);
					setLimit(Math.ceil(gameList[1].length / 15));
				} else {
					setGames(
						applySort([...gamesByGenre]).splice(
							page * GAMES_PER_PAGE,
							GAMES_PER_PAGE
						)
					);
					setLimit(Math.ceil(gamesByGenre.length / 15));
				}
			}
			let auxPages = [];
			for (let i = 0; i < limit; i++) {
				auxPages.push(
					<button key={`Page ${i + 1}`} onClick={pageButtonHandler}>
						{i + 1}
					</button>
				);
			}
			setPageButtons([...auxPages]);
		}
	}, [gameList, page, currentGenre, gamesByGenre, limit, sort, searchResults]); // eslint-disable-line react-hooks/exhaustive-deps
	React.useEffect(() => {
		if (gamesByName.length) {
			console.log(gamesByName);
			setGames([...gamesByName]);
		}
	}, [gamesByName]);

	if (loading) {
		return (
			<HOME_SECTION>
				<HOME_GAME_CONTAINER>
					<h1 className='loading'>Loading...</h1>
				</HOME_GAME_CONTAINER>
			</HOME_SECTION>
		);
	}

	return (
		<HOME_SECTION>
			<HOME_GAME_CONTAINER>
				{gamesError && !!Object.keys(gamesError).length && (
					<div className='error'>Error</div>
				)}
				<div className='searchbar'>
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
				</div>
				<GameCards
					games={games}
					currentPage={page}
					handleCardClick={handleCardClick}
				/>
			</HOME_GAME_CONTAINER>
		</HOME_SECTION>
	);
};

export default Home;
