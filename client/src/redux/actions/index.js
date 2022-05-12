import axios from 'axios';

export const SET_LOADING = 'SET_LOADING';
export const GET_GAMES_SUCCESS = 'GET_GAMES_SUCCESS';
export const SET_ERRORS = 'GET_GAMES_FAILED';
export const GET_GENRES = 'GET_GENRES';
export const GET_GAMES_BY_GENRE = 'GET_GAMES_BY_GENRE';
export const GET_GAME_DETAIL = 'GET_GAME_DETAIL';
export const CREATE_GAME = 'CREATE_GAME';

const LOCALHOST_VIDEOGAMES = `http://localhost:3001/videogames`;
const LOCALHOST_GENRES = `http://localhost:3001/genres`;
const LOCALHOST_VIDEOGAME = `http://localhost:3001/videogame`;

export const getGames = (name) => async (dispatch) => {
	dispatch({ type: SET_LOADING });
	try {
		const response = await axios(
			`${LOCALHOST_VIDEOGAMES}${name ? '?name=' + name : ''}`
		);
		dispatch({ type: GET_GAMES_SUCCESS, payload: response.data });
	} catch (error) {
		dispatch({ type: SET_ERRORS, payload: error });
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

export const getGamesByGenre = (genre, source) => (dispatch) => {
	dispatch({ type: GET_GAMES_BY_GENRE, payload: { genre, source } });
};

export const getGameDetail = (id) => async (dispatch) => {
	try {
		const response = await axios(`${LOCALHOST_VIDEOGAME}/${id}`);
		dispatch({ type: GET_GAME_DETAIL, payload: response.data });
	} catch (error) {
		console.log(error);
	}
};

export const createGame = (body) => async (dispatch) => {
	dispatch({ type: SET_LOADING });

	try {
		console.log(body);
		const response = await axios({
			method: 'post',
			url: LOCALHOST_VIDEOGAME,
			data: body,
		});
		dispatch({ type: CREATE_GAME, payload: response.data });
	} catch (error) {
		console.log(error);
	}
};
