import {
	CREATE_GAME,
	GET_GAMES_SUCCESS,
	SET_ERRORS,
	SET_LOADING,
	GET_GAMES_BY_GENRE,
	GET_GAME_DETAIL,
	GET_GENRES,
} from '../actions';

const initialState = {
	games: [],
	isLoading: false,
	gamesError: {},
	genres: [],
	gamesByGenre: [],
	gamesByName: [],
	gameDetail: {},
};

const gamesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				gamesError: {},
				isLoading: true,
			};
		case SET_ERRORS:
			return {
				...state,
				isLoading: false,
				gamesError: action.payload,
			};
		case GET_GAMES_SUCCESS:
			if (Array.isArray(action.payload[0])) {
				action.payload[0] = action.payload[0].map((vg) => ({
					...vg,
					genres: vg.genres.map((genre) => genre.name),
				}));

				return {
					...state,
					isLoading: false,
					games: action.payload,
				};
			} else return { ...state, isLoading: false, gamesByName: action.payload };
		case GET_GENRES:
			return {
				...state,
				genres: action.payload,
			};
		case GET_GAMES_BY_GENRE:
			let filteredGames = [];

			switch (action.payload.source) {
				case 'Api':
					filteredGames = state.games[1]?.filter((game) =>
						game.genres?.includes(action.payload.genre)
					);
					break;
				case 'Database':
					filteredGames = state.games[0]?.filter((game) =>
						game.genres?.includes(action.payload.genre)
					);
					break;
				case 'All':
					state.games &&
						(filteredGames = state?.games
							.flat(2)
							.filter((game) => game.genres?.includes(action.payload.genre)));
					break;
				default:
					return state;
			}
			return {
				...state,
				gamesByGenre: [...filteredGames],
			};
		case GET_GAME_DETAIL: {
			console.log(typeof action.payload.genres[0]);
			if (typeof action.payload.genres[0] === 'object') {
				action.payload.genres = action.payload.genres.map((g) => g.name);
			}
			return {
				...state,
				gameDetail: action.payload,
			};
		}
		case CREATE_GAME:
			let newState = state.games;
			console.log(action.payload.genres);
			action.payload.genres = action.payload.genres.map(
				(g) => state.genres.find((genre) => g === genre.id).name
			);
			newState[0].push(action.payload);
			return {
				...state,
				isLoading: false,
				games: newState,
			};
		default:
			return state;
	}
};

export default gamesReducer;
