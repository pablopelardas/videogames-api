import React from 'react';
import { Card } from './StyledGameCard';

import unknown from './assets/unknown-cover.jpg';

const GameCard = ({
	name,
	id,
	rating,
	genres,
	background_image,
	handleCardClick,
}) => {
	return (
		<Card onClick={() => handleCardClick(id)}>
			<h2>{name}</h2>
			<img
				className='card--game-img'
				src={background_image || unknown}
				alt='game'
			/>
			<p>{rating ? `⭐${rating}` : null}</p>
			<p>
				<span>Genres:</span> {genres?.join(', ')}
			</p>
		</Card>
	);
};

export default GameCard;
