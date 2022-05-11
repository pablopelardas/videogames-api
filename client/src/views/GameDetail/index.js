import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetail } from '../../redux/actions';

import { Main_detail, Container_detail } from './StyledGameDetail';

const GameDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const game = useSelector((state) => state.gameDetail);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		dispatch(getGameDetail(id));
		setLoading(true);
	}, []);

	React.useEffect(() => {
		if (Object.keys(game).length) {
			if (game.id == id) {
				setLoading(false);
			}
		}
	}, [game]);

	return (
		<Main_detail>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<Container_detail>
					<h2>{game.name}</h2>
					<div className='img-container'>
						<img src={game.background_image} alt='game' />
					</div>
					<section className='game-details'>
						<p className='details--released-rating'>{game.released_date}</p>
						<p className='details--released-rating'>⭐{game.rating}</p>
						<h3>Description</h3>
						<p
							contentEditable='true'
							dangerouslySetInnerHTML={{ __html: game.description }}
						/>
						<p>
							<span>Genres: </span>
							{game.genres?.join(', ')}
						</p>
						<p>
							<span>Platforms: </span>
							{game.platforms?.join(', ')}
						</p>
					</section>
				</Container_detail>
			)}
		</Main_detail>
	);
};

export default GameDetail;
