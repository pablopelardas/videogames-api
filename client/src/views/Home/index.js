import React from 'react';
import { Main } from './styled-components';
import GameCards from './components/GameCards';

const Home = () => {
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
