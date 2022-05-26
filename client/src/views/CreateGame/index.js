import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createGame, getGenres } from '../../redux/actions';
import { CREATE_MAIN, CREATE_GAME_CONTAINER } from './StyledCreateGame';
import { useNavigate } from 'react-router-dom';

const platformsList = [
	'PC',
	'Xbox',
	'Playstation',
	'Nintendo',
	'iPhone',
	'Android',
	'Arcade',
];

const CreateGame = () => {
	const genres = useSelector((state) => state.genres);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [input, setInput] = React.useState({
		name: '',
		description: '',
		released_date: '',
		rating: '',
		background_image: '',
		platforms: [],
		genres: [],
	});
	const [errors, setErrors] = React.useState({});

	React.useEffect(() => {
		if (!genres.length) dispatch(getGenres());
	}, [genres, dispatch, errors]);

	const handleInput = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
		setErrors((errors) => {
			delete errors[e.target.name];
			return errors;
		});
	};

	const handleSelection = (e) => {
		if (input[e.target.name].includes(e.target.value)) return;
		setInput({
			...input,
			[e.target.name]: [...input[e.target.name], e.target.value],
		});
		setErrors((errors) => {
			delete errors[e.target.name];
			return errors;
		});
	};

	const deleteSelection = (e, source) => {
		setInput({
			...input,
			[source]: input[source].filter((x) => x !== e.target.innerText),
		});
	};

	const handleValidations = (field = null) => {
		let newErrors = {};
		if (field) {
			switch (field) {
				case 'name':
					if (!/^[\w-ñ.,'"`!¡?¿\s]+$/.test(input.name))
						setErrors({
							...errors,
							name: `Name field is required and it must be alphanumeric.`,
						});

					return;
				case 'description':
					if (!/^[\w-ñ.,'"`!¡?¿\s]+$/.test(input.description)) {
						setErrors({
							...errors,
							description: `Description field is required and it must be alphanumeric.`,
						});
					}
					return;
				case 'released_date':
					if (
						input.released_date.length &&
						!/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(
							input.released_date
						)
					) {
						setErrors({
							...errors,
							released_date: `Released date must have the correct format: YYYY-MM-DD`,
						});
					}
					return;
				case 'rating':
					if (
						input.rating.length &&
						(!/^[0-5]\.?[0-9]{0,2}$/.test(input.rating) ||
							Number(input.rating) < 0 ||
							Number(input.rating) > 5)
					) {
						setErrors({
							...errors,
							rating: `Rating must be a number between 0 and 5 (Example: 3.45)`,
						});
					}
					return;
				case 'background_image':
					if (
						input.background_image.length &&
						!/(https?:\/\/.*\.(?:png|jpg))/i.test(input.background_image)
					) {
						setErrors({
							...errors,
							background_image: `Background Image field must be a https URL`,
						});
					}
					return;
				case 'platforms':
					if (!input.platforms.length) {
						setErrors({
							...errors,
							platforms: `At least 1 platform is required`,
						});
					}
					return;
				case 'genres':
					if (!input.genres.length) {
						setErrors({
							...errors,
							genres: `At least 1 genre is required`,
						});
					}
					return;
				default:
					break;
			}
		}
		if (!input.name.length) newErrors.name = `Name field is required`;
		if (!input.description.length)
			newErrors.description = `Description field is required`;
		if (!input.platforms.length)
			newErrors.platforms = `At least 1 platform is required`;
		setErrors(newErrors);
		if (Object.keys(newErrors).length) return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.keys(errors).length || handleValidations())
			return alert('You must solve the errors before submitting a new game.');
		else {
			let data = {
				...input,
				genres: input.genres.map(
					(g) => genres.find((gen) => g === gen.name).id
				),
			};
			Object.keys(data).forEach((k) => !data[k] && delete data[k]);

			dispatch(createGame(data));
			navigate(`/home`);
		}
	};

	return (
		<CREATE_MAIN>
			<CREATE_GAME_CONTAINER>
				<form className='form'>
					<section className='form--top'>
						<div className='form--top-name'>
							<label className='form--label' htmlFor='name'>
								Name:
							</label>
							{errors.name ? (
								<span className='error'> {errors.name}</span>
							) : null}
							<input
								className={`form--input form--name ${
									errors.name && `withError`
								}`}
								type='text'
								id='name'
								name='name'
								value={input.name}
								onChange={handleInput}
								onBlur={(e) => handleValidations(e.target.name)}
								placeholder='Name...'
							/>
						</div>
						<div className='form--top-description'>
							<label className='form--label' htmlFor='description'>
								Description:{' '}
							</label>
							{errors.description ? (
								<span className='error'>{errors.description}</span>
							) : null}
							<textarea
								className={`form--input form--textarea ${
									errors.description && `withError`
								}`}
								name='description'
								id='description'
								value={input.description}
								onChange={handleInput}
								onBlur={(e) => handleValidations(e.target.name)}
								placeholder='Description...'
							/>
						</div>
						<div className='form--top-imgUrl'>
							<label className='form--label' htmlFor='background_image'>
								Game Image:{' '}
							</label>
							{errors.background_image ? (
								<span className='error'>{errors.background_image}</span>
							) : null}
							<input
								className={`form--input ${
									errors.background_image && `withError`
								}`}
								type='text'
								id='background_image'
								name='background_image'
								value={input.background_image}
								onChange={handleInput}
								onBlur={(e) => handleValidations(e.target.name)}
								placeholder='Image URL...'
							/>
						</div>
					</section>
					<section className='form--center'>
						<div className='form--center-row'>
							<div className='form--center-released_date'>
								<label className='form--label' htmlFor='released_date'>
									Released on:{' '}
								</label>
								{errors.released_date ? (
									<span className='error'>{errors.released_date}</span>
								) : null}
								<input
									className={`form--input ${
										errors.released_date && `withError`
									}`}
									type='text'
									id='released_date'
									name='released_date'
									value={input.released_date}
									onChange={handleInput}
									onBlur={(e) => handleValidations(e.target.name)}
									placeholder='YYYY-MM-DD...'
								/>
							</div>
							<div className='form--center-rating'>
								<label className='form--label' htmlFor='rating'>
									Rating:{' '}
								</label>
								{errors.rating ? (
									<span className='error'>{errors.rating}</span>
								) : null}
								<input
									className={`form--input ${errors.rating && `withError`}`}
									type='text'
									id='rating'
									name='rating'
									value={input.rating}
									onChange={handleInput}
									onBlur={(e) => handleValidations(e.target.name)}
									placeholder='1 ... 5'
								/>
							</div>
						</div>
						<div className='form--center-row'>
							<div className='form--center-platforms'>
								<p className='form--label'>Platforms:</p>
								{errors.platforms ? (
									<span className='error'>{errors.platforms}</span>
								) : null}
								<select
									className={`form--select ${errors.platforms && `withError`}`}
									name='platforms'
									onChange={handleSelection}
									defaultValue={'Select Platforms'}
								>
									<option disabled>Select Platforms</option>
									{platformsList.map((platform) => (
										<option key={`${platform}-option`} value={platform}>
											{platform}
										</option>
									))}
								</select>
								{input.platforms.length && (
									<div className='form--buttons-container'>
										{input.platforms.map((platform) => (
											<button
												key={`${platform}-key`}
												className='selected-button platform'
												onClick={(e) => deleteSelection(e, 'platforms')}
											>
												{platform}
											</button>
										))}
									</div>
								)}
							</div>
							<div className='form--center-genres'>
								<p className='form--label'>Genres:</p>

								<select
									className='form--select'
									name='genres'
									onChange={handleSelection}
									defaultValue={'Select Genres'}
								>
									<option disabled>Select Genres</option>
									{genres.map((genre) => (
										<option key={`${genre.name}-option`} value={genre.name}>
											{genre.name}
										</option>
									))}
								</select>
								{errors.genres ? (
									<span className='error'>{errors.genres}</span>
								) : null}
								{input.genres.length && (
									<div className='form--buttons-container'>
										{input.genres.map((genre) => (
											<button
												key={`${genre}-key`}
												className='selected-button genre'
												onClick={(e) => deleteSelection(e, 'genres')}
											>
												{genre}
											</button>
										))}
									</div>
								)}
							</div>
						</div>
					</section>

					<button
						type='submit'
						className='create-button'
						onClick={handleSubmit}
					>
						Create Game
					</button>
				</form>
			</CREATE_GAME_CONTAINER>
		</CREATE_MAIN>
	);
};

export default CreateGame;
