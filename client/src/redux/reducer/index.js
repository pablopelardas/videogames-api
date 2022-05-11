import {
	GET_GAMES,
	GET_GAMES_BY_GENRE,
	GET_GAME_DETAIL,
	GET_GENRES,
} from '../actions';

const initialState = {
	games: [],
	genres: [],
	gamesByGenre: [],
	gamesByName: [],
	gameDetail: {},
};

const gamesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_GAMES:
			if (Array.isArray(action.payload[0])) {
				action.payload[0] = action.payload[0].map((vg) => ({
					...vg,
					genres: vg.genres.map((genre) => genre.name),
				}));

				return {
					...state,
					games: action.payload,
				};
			} else return { ...state, gamesByName: action.payload };
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
		case GET_GAME_DETAIL: {
			return {
				...state,
				gameDetail: action.payload,
			};
		}
		default:
			return state;
	}
};

export default gamesReducer;
