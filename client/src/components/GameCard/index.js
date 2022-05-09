import React from 'react';
import styled from 'styled-components';
import { Card } from './StyledGameCard';

import unknown from './assets/question-mark.png';

const GameCard = () => {
	return (
		<Card>
			<h2>Juego de prueba este es un juego de prueba</h2>
			<img width='250px' height='150px' src={unknown} alt='game' />
			<p>⭐rating</p>
			<p>
				<span>Genres:</span> genres genre
			</p>
		</Card>
	);
};

/* <p>
					<span>Release Date:</span> fecha
				</p> */
/* <p> Descripcion no va en card
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis
					vehicula mi, a facilisis tellus. Duis in mauris est. Fusce leo nisl,
					aliquet in velit non, luctus dignissim justo. Sed sodales sollicitudin
					purus congue egestas. Sed feugiat dolor ligula, et sagittis lectus
					laoreet in. Morbi fringilla, lorem non sodales aliquam, enim tortor
					sollicitudin libero, ac accumsan enim enim id justo. Donec iaculis ut
					tellus ullamcorper scelerisque. Etiam vestibulum viverra mauris vel
					ornare
				</p> */
/* <p> Platform tampoco
					<span>Platforms:</span> platforms
				</p> */

export default GameCard;
