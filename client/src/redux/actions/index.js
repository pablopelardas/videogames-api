import axios from 'axios';

export const GET_GAMES = 'GET_GAMES';

export const getGames = (name) => async (dispatch) => {
	try {
		const response = await axios(
			`http://localhost:3001/videogames${name ? '?name=' + name : ''}`
		);
		dispatch({ type: GET_GAMES, payload: response.data });
	} catch (error) {
		console.log(error);
	}
};
