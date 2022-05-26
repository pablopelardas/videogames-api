import axios from 'axios';

export const SET_LOADING = 'SET_LOADING';
export const GET_GAMES_SUCCESS = 'GET_GAMES_SUCCESS';
export const SET_ERRORS = 'SET_ERRORS';
export const GET_GENRES = 'GET_GENRES';
export const GET_GAMES_BY_GENRE = 'GET_GAMES_BY_GENRE';
export const GET_GAME_DETAIL = 'GET_GAME_DETAIL';
export const CREATE_GAME = 'CREATE_GAME';
export const DELETE_GAME = 'DELETE_GAME';

const VIDEOGAMES = `/videogames`;
const GENRES = `/genres`;
const VIDEOGAME = `/videogame`;

export const getGames = (name) => async (dispatch) => {
	dispatch({ type: SET_LOADING });
	try {
		const response = await axios(`${VIDEOGAMES}${name ? '?name=' + name : ''}`);
		dispatch({ type: GET_GAMES_SUCCESS, payload: response.data });
	} catch (error) {
		dispatch({ type: SET_ERRORS, payload: error });
	}
};

export const getGenres = () => async (dispatch) => {
	try {
		const response = await axios(`${GENRES}`);
		dispatch({ type: GET_GENRES, payload: response.data });
	} catch (error) {
		console.log(error);
	}
};

export const getGamesByGenre =
	(genre, source = 'All') =>
	(dispatch) => {
		dispatch({ type: GET_GAMES_BY_GENRE, payload: { genre, source } });
	};

export const getGameDetail = (id) => async (dispatch) => {
	dispatch({ type: SET_LOADING });
	try {
		const response = await axios(`${VIDEOGAME}/${id}`);
		dispatch({ type: GET_GAME_DETAIL, payload: response.data });
	} catch (error) {
		dispatch({ type: SET_ERRORS, payload: error });
	}
};

export const createGame = (body) => async (dispatch) => {
	dispatch({ type: SET_LOADING });

	try {
		const response = await axios({
			method: 'post',
			url: VIDEOGAME,
			data: body,
		});
		dispatch({ type: CREATE_GAME, payload: response.data });
	} catch (error) {
		dispatch({ type: SET_ERRORS, payload: error });
	}
};

export const deleteGame = (id) => async (dispatch) => {
	dispatch({ type: SET_LOADING });
	try {
		const response = await axios({
			method: 'delete',
			url: `${VIDEOGAME}/${id}`,
		});
		dispatch({ type: DELETE_GAME, payload: id });
	} catch (error) {
		dispatch({ type: SET_ERRORS, payload: error });
	}
};

export const clearErrors = () => (dispatch) => {
	dispatch({ type: SET_ERRORS, payload: {} });
};
