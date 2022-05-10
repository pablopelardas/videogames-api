import React from 'react';
import { CardsContainer, Section } from './StyledGameCards';
import GameCard from '../GameCard';

const GameCards = ({ games, currentPage }) => {
	return (
		<Section>
			<h1>Page: {currentPage + 1}</h1>
			<CardsContainer>
				{games?.map((game) => (
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
		</Section>
	);
};

export default GameCards;
