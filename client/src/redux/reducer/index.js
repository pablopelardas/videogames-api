import {
	CREATE_GAME,
	GET_GAMES_SUCCESS,
	SET_ERRORS,
	SET_LOADING,
	GET_GAMES_BY_GENRE,
	GET_GAME_DETAIL,
	GET_GENRES,
	DELETE_GAME,
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
					gamesByGenre: action.payload.flat(2),
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
					if (action.payload.genre !== 'All') {
						filteredGames = state.games[1]?.filter((game) =>
							game.genres?.includes(action.payload.genre)
						);
					} else filteredGames = state.games[1];
					break;
				case 'Database':
					if (action.payload.genre !== 'All') {
						filteredGames = state.games[0]
							? state.games[0].filter((game) =>
									game.genres?.includes(action.payload.genre)
							  )
							: [];
					} else filteredGames = state.games[0];
					break;
				case 'All':
					if (action.payload.genre !== 'All') {
						state.games &&
							(filteredGames = state.games
								.flat(2)
								.filter((game) => game.genres?.includes(action.payload.genre)));
					} else if (state.games) filteredGames = state.games.flat(2);
					break;
				default:
					return state;
			}
			return {
				...state,
				gamesByGenre: [...filteredGames],
			};
		case GET_GAME_DETAIL: {
			if (typeof action.payload.genres[0] === 'object') {
				action.payload.genres = action.payload.genres.map((g) => g.name);
			}
			return {
				...state,
				isLoading: false,
				gameDetail: action.payload,
			};
		}
		case CREATE_GAME:
			let newState = state.games;
			action.payload.genres = action.payload.genres.map(
				(g) => state.genres.find((genre) => g === genre.id).name
			);
			newState[0].push(action.payload);
			return {
				...state,
				isLoading: false,
				games: newState,
				gamesByGenre: newState.flat(2),
			};
		case DELETE_GAME:
			let newGames = state.games[0].filter(
				(game) => game.id !== action.payload
			);
			return {
				...state,
				isLoading: false,
				games: [[...newGames], [...state.games[1]]],
				gamesByGenre: [...newGames, ...state.games[1]],
			};
		default:
			return state;
	}
};

export default gamesReducer;
