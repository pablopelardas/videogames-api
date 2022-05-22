import React from 'react';
import { CardsContainer } from './StyledGameCards';
import GameCard from '../GameCard';
import emptyGames from '../../assets/empty-games.gif';

const GameCards = ({ games, handleCardClick }) => {
	return (
		<CardsContainer>
			{!games.length && (
				<div className='empty-container'>
					<h2 className='empty--message'>
						There are no games matching that filter
					</h2>
					<img
						className='empty--img'
						src={emptyGames}
						alt='There are no games matching that filter'
					></img>
				</div>
			)}
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
