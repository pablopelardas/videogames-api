import React from 'react';
import { Main } from './styled-components';
import GameCards from './components/GameCards';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from '../../redux/actions';

const Home = () => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getGames());
	}, []);

	return (
		<Main>
			<div className='searchbar'>
				<div className='search'>
					<input placeholder='Search game' />
					<button>Search</button>
				</div>
				<div>
					{/* Filtros y Sorts */}
					<select />
					<select />
				</div>
			</div>
			<GameCards />
		</Main>
	);
};

export default Home;
