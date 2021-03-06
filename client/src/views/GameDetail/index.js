import React from 'react';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetail, deleteGame, getGames } from '../../redux/actions';
import unknown from '../../assets/unknown-cover.jpg';

import { DETAIL_MAIN, DETAIL_CONTAINER } from './StyledGameDetail';

const GameDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const game = useSelector((state) => state.gameDetail);
	const gamesError = useSelector((state) => state.gamesError);
	const loading = useSelector((state) => state.isLoading);

	const validateUUID = (id) => {
		const regex =
			/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
		return regex.test(id);
	};

	React.useEffect(() => {
		dispatch(getGameDetail(id));
	}, [dispatch, id]);

	return (
		<DETAIL_MAIN>
			<DETAIL_CONTAINER>
				{loading && <Loading />}
				{!!Object.keys(gamesError).length && <Error gamesError={gamesError} />}
				{!Object.keys(gamesError).length && !loading && (
					<>
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
								<img src={game.background_image || unknown} alt='game' />
							</div>
						</section>

						{validateUUID(id) && (
							<button
								className='delete-button'
								onClick={() => {
									dispatch(deleteGame(id));
									navigate('/home');
								}}
							>
								Delete game
							</button>
						)}
					</>
				)}
			</DETAIL_CONTAINER>
		</DETAIL_MAIN>
	);
};

export default GameDetail;
