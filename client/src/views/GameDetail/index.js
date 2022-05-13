import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetail } from '../../redux/actions';

import { DETAIL_MAIN, DETAIL_CONTAINER } from './StyledGameDetail';

const GameDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const game = useSelector((state) => state.gameDetail);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		dispatch(getGameDetail(id));
		setLoading(true);
	}, [dispatch, id]);

	React.useEffect(() => {
		if (Object.keys(game).length) {
			if (game.id.toString() === id) {
				setLoading(false);
			}
		}
	}, [game]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<DETAIL_MAIN>
			{loading ? (
				<DETAIL_CONTAINER>
					<h1 className='loading'>Loading...</h1>
				</DETAIL_CONTAINER>
			) : (
				<DETAIL_CONTAINER>
					<h2>{game.name}</h2>
					<p className='details--released-rating'>{game.released_date}</p>
					<p className='details--released-rating'>⭐{game.rating}</p>
					<section className='game-details'>
						<div className='game-details--info-container'>
							<h3>Description</h3>
							<p dangerouslySetInnerHTML={{ __html: game.description }} />
							<p>
								<span>Genres: </span>
								{game.genres?.join(', ')}
							</p>
							<p>
								<span>Platforms: </span>
								{game.platforms?.join(', ')}
							</p>
						</div>
						<div className='game-details--img-container'>
							<img src={game.background_image} alt='game' />
						</div>
					</section>
				</DETAIL_CONTAINER>
			)}
		</DETAIL_MAIN>
	);
};

export default GameDetail;
