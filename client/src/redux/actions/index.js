import axios from 'axios';

export const GET_GAMES = 'GET_GAMES';
export const GET_GENRES = 'GET_GENRES';
export const GET_GAMES_BY_GENRE = 'GET_GAMES_BY_GENRE';

const LOCALHOST_VIDEOGAMES = `http://localhost:3001/videogames`;
const LOCALHOST_GENRES = `http://localhost:3001/genres`;

export const getGames = (name) => async (dispatch) => {
	try {
		const response = await axios(
			`${LOCALHOST_VIDEOGAMES}${name ? '?name=' + name : ''}`
		);
		dispatch({ type: GET_GAMES, payload: response.data });
	} catch (error) {
		console.log(error);
	}
};

export const getGenres = () => async (dispatch) => {
	try {
		const response = await axios(`${LOCALHOST_GENRES}`);
		dispatch({ type: GET_GENRES, payload: response.data });
	} catch (error) {
		console.log(error);
	}
};

export const getGamesByGenre = (genre) => (dispatch) => {
	dispatch({ type: GET_GAMES_BY_GENRE, payload: genre });
};
