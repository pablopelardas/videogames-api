import React from 'react';
import { HOME_SECTION, HOME_GAME_CONTAINER } from './StyledHome';
import GameCards from './components/GameCards';
import SearchControls from './components/SearchControls';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenres } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	// Global State
	const dispatch = useDispatch();
	const gameList = useSelector((state) => state.games);
	const loading = useSelector((state) => state.isLoading);
	const gamesError = useSelector((state) => state.gamesError);
	const genres = useSelector((state) => state.genres);

	const navigate = useNavigate();

	// Local States
	const [games, setGames] = React.useState([]);

	const handleCardClick = (id) => {
		navigate(`/detail/${id}`);
	};

	React.useEffect(() => {
		if (!gameList.length) dispatch(getGames());
		if (!genres.length) dispatch(getGenres());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<HOME_SECTION>
			<HOME_GAME_CONTAINER>
				<SearchControls setGames={setGames} loading={loading} />
				{loading && <h1 className='loading'>Loading...</h1>}
				{!!Object.keys(gamesError).length && (
					<h1 className='loading'>{gamesError.message}</h1>
				)}
				{!Object.keys(gamesError).length && !loading && (
					<GameCards games={games} handleCardClick={handleCardClick} />
				)}
			</HOME_GAME_CONTAINER>
		</HOME_SECTION>
	);
};

export default Home;
