import { GET_GAMES, GET_GAMES_BY_GENRE, GET_GENRES } from '../actions';

const initialState = {
	games: [],
	genres: [],
	gamesByGenre: [],
	gameDetail: {},
};

const gamesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_GAMES:
			return {
				...state,
				games: action.payload,
			};
		case GET_GENRES:
			return {
				...state,
				genres: action.payload,
			};
		case GET_GAMES_BY_GENRE:
			const filteredGames = state.games.filter((game) =>
				game.genres.includes(action.payload)
			);
			return {
				...state,
				gamesByGenre: [...filteredGames],
			};
		default:
			return state;
	}
};

export default gamesReducer;
