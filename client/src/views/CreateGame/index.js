import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createGame, getGenres } from '../../redux/actions';
import { CREATE_MAIN } from './StyledCreateGame';
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
					if (!input.name.length)
						setErrors({
							...errors,
							name: `Name field is required`,
						});
					return;
				case 'description':
					if (!input.description.length) {
						setErrors({
							...errors,
							description: `Description field is required`,
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
							rating: `Rating must be a number between 0 and 5 (Example: 3,45)`,
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
			<form>
				<label htmlFor='name'>Name: </label>
				<input
					type='text'
					id='name'
					name='name'
					value={input.name}
					onChange={handleInput}
					onBlur={(e) => handleValidations(e.target.name)}
					placeholder='Name...'
				/>
				{errors.name ? <span className='error'>{errors.name}</span> : null}
				<br />
				<label htmlFor='description'>Description: </label>
				<textarea
					name='description'
					id='description'
					value={input.description}
					onChange={handleInput}
					onBlur={(e) => handleValidations(e.target.name)}
					placeholder='Description...'
				/>
				{errors.description ? (
					<span className='error'>{errors.description}</span>
				) : null}
				<br />
				<label htmlFor='released_date'>Released on: </label>
				<input
					type='text'
					id='released_date'
					name='released_date'
					value={input.released_date}
					onChange={handleInput}
					onBlur={(e) => handleValidations(e.target.name)}
					placeholder='YYYY-MM-DD...'
				/>
				{errors.released_date ? (
					<span className='error'>{errors.released_date}</span>
				) : null}
				<br />
				<label htmlFor='rating'>Rating: </label>
				<input
					type='text'
					id='rating'
					name='rating'
					value={input.rating}
					onChange={handleInput}
					onBlur={(e) => handleValidations(e.target.name)}
					placeholder='1 ... 5'
				/>
				{errors.rating ? <span className='error'>{errors.rating}</span> : null}
				<br />
				<label htmlFor='background_image'>Game Image: </label>
				<input
					type='text'
					id='background_image'
					name='background_image'
					value={input.background_image}
					onChange={handleInput}
					onBlur={(e) => handleValidations(e.target.name)}
					placeholder='Image URL...'
				/>
				{errors.background_image ? (
					<span className='error'>{errors.background_image}</span>
				) : null}
				<br />
				<p>
					Platforms:{' '}
					{input.platforms.map((platform) => (
						<button
							key={`${platform}-key`}
							className='platform-button'
							onClick={(e) => deleteSelection(e, 'platforms')}
						>
							{platform}
						</button>
					))}
				</p>

				<select name='platforms' onChange={handleSelection}>
					<option disabled selected>
						Select platforms
					</option>
					{platformsList.map((platform) => (
						<option key={`${platform}-option`} value={platform}>
							{platform}
						</option>
					))}
				</select>
				{errors.platforms ? (
					<span className='error'>{errors.platforms}</span>
				) : null}
				<br />
				<p>
					Genres:{' '}
					{input.genres.map((genre) => (
						<button
							key={`${genre}-key`}
							className='platform-button'
							onClick={(e) => deleteSelection(e, 'genres')}
						>
							{genre}
						</button>
					))}
				</p>

				<select name='genres' onChange={handleSelection}>
					<option disabled selected>
						Select genres
					</option>
					{genres.map((genre) => (
						<option key={`${genre.name}-option`} value={genre.name}>
							{genre.name}
						</option>
					))}
				</select>
				{errors.genres ? <span className='error'>{errors.genres}</span> : null}

				<button type='submit' className='create-button' onClick={handleSubmit}>
					Create Game
				</button>
			</form>
		</CREATE_MAIN>
	);
};

export default CreateGame;
