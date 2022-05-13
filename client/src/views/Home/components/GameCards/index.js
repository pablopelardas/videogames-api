import React from 'react';
import { CardsContainer } from './StyledGameCards';
import GameCard from '../GameCard';

const GameCards = ({ games, handleCardClick }) => {
	return (
		<CardsContainer>
			{games?.map((game) => (
				<GameCard
					key={game.id}
					id={game.id}
					name={game.name}
					rating={game.rating}
					background_image={game.background_image}
					genres={game.genres}
					handleCardClick={handleCardClick}
				/>
			))}
		</CardsContainer>
	);
};

export default GameCards;
