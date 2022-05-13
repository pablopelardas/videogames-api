import React from 'react';
import { HOME_SECTION, HOME_GAME_CONTAINER } from './StyledHome';
import GameCards from './components/GameCards';
import SearchControls from './components/SearchControls';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGamesByGenre, getGenres } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const GAMES_PER_PAGE = 15;

const Home = () => {
	// Global State
	const dispatch = useDispatch();
	const gameList = useSelector((state) => state.games);
	const gamesByGenre = useSelector((state) => state.gamesByGenre);
	const gamesByName = useSelector((state) => state.gamesByName);
	const loading = useSelector((state) => state.isLoading);
	const gamesError = useSelector((state) => state.gamesError);
	const genres = useSelector((state) => state.genres);

	const navigate = useNavigate();

	// Local States
	const [page, setPage] = React.useState(0);
	const [games, setGames] = React.useState([]);
	const [currentGenre, setGenre] = React.useState('All');
	const [limit, setLimit] = React.useState(0);
	const [source, setSource] = React.useState('All');
	const [sort, setSort] = React.useState({ type: 'ALL', option: 'all' });
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

	// Filter & Sort handlers

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

	//Custom Hook / game,
	const applySort = {
		ALL: (array) => array,
		RATING: {
			ASC: (array) => array.sort((a, b) => a.rating - b.rating),
			DES: (array) => array.sort((a, b) => b.rating - a.rating),
		},
		NAME: {
			ASC: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
			DES: (array) => array.sort((a, b) => b.name.localeCompare(a.name)),
		},
	};

	React.useEffect(() => {
		if (!gameList.length) dispatch(getGames());
		if (!genres.length) dispatch(getGenres());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	// React.useEffect(() => {
	// 	let index = {
	// 		Api: 1,
	// 		Database: 0,
	// 	};
	// 	if (gameList.length && !searchResults) {
	// 		if (source !== 'All') {
	// 			if (currentGenre === 'All') {
	// 				setGames(
	// 					applySort([...gameList[index[source]]]).splice(
	// 						page * GAMES_PER_PAGE,
	// 						GAMES_PER_PAGE
	// 					)
	// 				);
	// 				setLimit(Math.ceil(gameList[index[source]].length / 15));
	// 			} else {
	// 				setGames(
	// 					applySort([...gamesByGenre]).splice(
	// 						page * GAMES_PER_PAGE,
	// 						GAMES_PER_PAGE
	// 					)
	// 				);
	// 				setLimit(Math.ceil(gamesByGenre.length / 15));
	// 			}
	// 		} else {
	// 			if (currentGenre === 'All') {
	// 				setGames(
	// 					applySort([...gameList].flat(2)).splice(
	// 						page * GAMES_PER_PAGE,
	// 						GAMES_PER_PAGE
	// 					)
	// 				);
	// 				setLimit(Math.ceil(gameList[1].length / 15));
	// 			} else {
	// 				setGames(
	// 					applySort([...gamesByGenre]).splice(
	// 						page * GAMES_PER_PAGE,
	// 						GAMES_PER_PAGE
	// 					)
	// 				);
	// 				setLimit(Math.ceil(gamesByGenre.length / 15));
	// 			}
	// 		}
	// 		let auxPages = [];
	// 		for (let i = 0; i < limit; i++) {
	// 			auxPages.push(
	// 				<button key={`Page ${i + 1}`} onClick={pageButtonHandler}>
	// 					{i + 1}
	// 				</button>
	// 			);
	// 		}
	// 		setPageButtons([...auxPages]);
	// 	}
	// }, [gameList, page, currentGenre, gamesByGenre, limit, sort, searchResults]); // eslint-disable-line react-hooks/exhaustive-deps

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
				<SearchControls
					gameList={gameList}
					setGames={setGames}
					input={input}
					setInput={setInput}
					searchResults={searchResults}
					setSearchResults={setSearchResults}
					handleSearch={handleSearch}
					prevHandler={prevHandler}
					nextHandler={nextHandler}
					pageButtons={pageButtons}
					handleSortSelection={handleSortSelection}
					page={page}
					setPage={setPage}
				/>
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
