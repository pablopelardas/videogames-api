import React from 'react';
import { Main } from './StyledHome';
import GameCards from './components/GameCards';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenres, getGamesByGenre } from '../../redux/actions';

const GAMES_PER_PAGE = 15;

const Home = () => {
	// Global State
	const dispatch = useDispatch();
	const gameList = useSelector((state) => state.games);
	const genres = useSelector((state) => state.genres);
	const gamesByGenre = useSelector((state) => state.gamesByGenre);

	// Local States
	const [page, setPage] = React.useState(0);
	const [games, setGames] = React.useState([]);
	const [currentGenre, setGenre] = React.useState('All');
	const [loading, setLoading] = React.useState(true);
	const [limit, setLimit] = React.useState(0);

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
			dispatch(getGamesByGenre(state));
			return state;
		});
		setPage(0);
	};

	React.useEffect(() => {
		if (!gameList.length) dispatch(getGames());
		if (!gameList.genres) dispatch(getGenres());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	React.useEffect(() => {
		if (gameList.length) {
			if (currentGenre === 'All') {
				setGames([...gameList].splice(page * GAMES_PER_PAGE, GAMES_PER_PAGE));
				setLimit(Math.ceil(gameList.length / 15));
				setLoading(false);
			} else {
				setGames(
					[...gamesByGenre].splice(page * GAMES_PER_PAGE, GAMES_PER_PAGE)
				);
				setLimit(Math.ceil(gamesByGenre.length / 15));
				if (games.length) setLoading(false);
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
	}, [gameList, page, currentGenre, gamesByGenre, limit]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Main>
			<div className='searchbar'>
				<div className='search'>
					<input placeholder='Search game' />
					<button>Search</button>
				</div>
				{!loading && (
					<div className='pages'>
						<button onClick={prevHandler}>Previous</button>
						{pageButtons}
						<button onClick={nextHandler}>Next</button>
					</div>
				)}
				<div>
					{/* Filtros y Sorts */}
					<select onChange={handleGenreSelection}>
						<option value='All'>All</option>
						{genres.map((genre) => (
							<option value={genre.name} key={genre.id}>
								{genre.name}
							</option>
						))}
					</select>
					<select />
				</div>
			</div>
			{!loading ? (
				<GameCards games={games} currentPage={page} />
			) : (
				<h1 className='loading'>Loading...</h1>
			)}
		</Main>
	);
};

export default Home;
