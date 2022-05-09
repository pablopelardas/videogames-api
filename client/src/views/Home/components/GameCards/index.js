import React from 'react';
import { CardsContainer } from './StyledGameCards';
import GameCard from '../../../../components/GameCard';
import { useSelector } from 'react-redux';

const GameCards = () => {
	const gameList = useSelector((state) => state.games);
	const pagina = gameList.splice(0, 15);

	if (gameList.length) {
		return (
			<CardsContainer>
				{pagina?.map((game) => (
					<GameCard
						key={game.id}
						id={game.id}
						name={game.name}
						rating={game.rating}
						background_image={game.background_image}
						genres={game.genres}
					/>
				))}
			</CardsContainer>
		);
	} else {
		return (
			<CardsContainer>
				<h1>Loading...</h1>
			</CardsContainer>
		);
	}
};

export default GameCards;
