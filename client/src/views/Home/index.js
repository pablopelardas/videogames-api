import React from 'react';
import { Main_home } from './StyledHome';
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

	const navigate = useNavigate();

	// Local States
	const [page, setPage] = React.useState(0);
	const [games, setGames] = React.useState([]);
	const [currentGenre, setGenre] = React.useState('All');
	const [loading, setLoading] = React.useState(true);
	const [limit, setLimit] = React.useState(0);
	const [source, setSource] = React.useState('Api');
	const [sort, setSort] = React.useState({ type: 'ORDER BY', option: 'all' });
	const [input, setInput] = React.useState('');

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
		setLoading(true);
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
		if (!gameList.genres) dispatch(getGenres());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	React.useEffect(() => {
		if (gameList.length) {
			switch (source) {
				case 'Api':
					if (currentGenre === 'All') {
						setGames(
							applySort([...gameList[1]]).splice(
								page * GAMES_PER_PAGE,
								GAMES_PER_PAGE
							)
						);
						setLimit(Math.ceil(gameList[1].length / 15));
						setLoading(false);
					} else {
						setGames(
							applySort([...gamesByGenre]).splice(
								page * GAMES_PER_PAGE,
								GAMES_PER_PAGE
							)
						);
						setLimit(Math.ceil(gamesByGenre.length / 15));
						if (games.length) setLoading(false);
					}
					break;
				case 'Database':
					if (currentGenre === 'All') {
						setGames(
							applySort([...gameList[0]]).splice(
								page * GAMES_PER_PAGE,
								GAMES_PER_PAGE
							)
						);
						setLimit(Math.ceil(gameList[0].length / 15));
						setLoading(false);
					} else {
						setGames(
							applySort([...gamesByGenre]).splice(
								page * GAMES_PER_PAGE,
								GAMES_PER_PAGE
							)
						);
						setLimit(Math.ceil(gamesByGenre.length / 15));
						if (games.length) setLoading(false);
					}
					break;
				default: {
					if (currentGenre === 'All') {
						setGames(
							applySort([...gameList].flat(2)).splice(
								page * GAMES_PER_PAGE,
								GAMES_PER_PAGE
							)
						);
						setLimit(Math.ceil(gameList[1].length / 15));
						setLoading(false);
					} else {
						setGames(
							applySort([...gamesByGenre]).splice(
								page * GAMES_PER_PAGE,
								GAMES_PER_PAGE
							)
						);
						setLimit(Math.ceil(gamesByGenre.length / 15));
						if (games.length) setLoading(false);
					}
					break;
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
	}, [gameList, page, currentGenre, gamesByGenre, limit, sort]); // eslint-disable-line react-hooks/exhaustive-deps
	React.useEffect(() => {
		if (gamesByName.length) {
			console.log(gamesByName);
			setGames([...gamesByName]);
			setLoading(false);
		}
	}, [gamesByName]);

	return (
		<Main_home>
			<div className='searchbar'>
				<div className='search'>
					<input
						placeholder='Search game'
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button onClick={handleSearch}>Search</button>
				</div>
				{!loading && (
					<div className='pages'>
						<button onClick={prevHandler}>Previous</button>
						{pageButtons}
						<button onClick={nextHandler}>Next</button>
					</div>
				)}
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
			</div>
			{!loading ? (
				<GameCards
					games={games}
					currentPage={page}
					handleCardClick={handleCardClick}
				/>
			) : (
				<h1 className='loading'>Loading...</h1>
			)}
		</Main_home>
	);
};

export default Home;
