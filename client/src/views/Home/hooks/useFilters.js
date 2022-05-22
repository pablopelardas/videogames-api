import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGamesByGenre } from '../../../redux/actions';

const useFilters = () => {
	const dispatch = useDispatch();
	const gamesByGenre = useSelector((state) => state.gamesByGenre);
	const [source, setSource] = useState('All');
	const [currentGenre, setGenre] = useState('All');

	const handleReset = () => {
		setGenre((state) => {
			dispatch(getGamesByGenre('All', 'All'));
			return state;
		});
	};

	const handleGenreSelection = (e) => {
		setGenre((state) => {
			state = `${e.target.value}`;
			dispatch(getGamesByGenre(state, source));
			return state;
		});
	};

	const handleSourceSelection = (e) => {
		setSource((state) => {
			state = `${e.target.value}`;
			dispatch(getGamesByGenre(currentGenre, state));
			return state;
		});
	};

	return {
		handleGenreSelection,
		handleSourceSelection,
		handleReset,
		filteredGames: gamesByGenre,
	};
};

export default useFilters;
