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
			action.payload[0] = action.payload[0].map((vg) => ({
				...vg,
				genres: vg.genres.map((genre) => genre.name),
			}));

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
			let filteredGames = [];
			console.log(state.games);

			switch (action.payload.source) {
				case 'Api':
					filteredGames = state?.games[1].filter((game) =>
						game.genres.includes(action.payload.genre)
					);
					break;
				case 'Database':
					filteredGames = state?.games[0].filter((game) =>
						game.genres.includes(action.payload.genre)
					);
					break;
				case 'All':
					state.games &&
						(filteredGames = state?.games
							.flat(2)
							.filter((game) => game.genres.includes(action.payload.genre)));
					break;
				default:
					return state;
			}
			return {
				...state,
				gamesByGenre: [...filteredGames],
			};
		default:
			return state;
	}
};

export default gamesReducer;
