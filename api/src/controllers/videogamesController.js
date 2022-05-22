require('dotenv').config();
const axios = require('axios');
const { Videogame, Op, Genre } = require('../db.js');
const { API_KEY } = process.env;

//Functions
const validateUUID = (id) => {
	const regex =
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
	return regex.test(id);
};

const fetchApi = (videoGames, nextPage) => {
	return axios
		.get(nextPage)
		.then(({ data }) => {
			nextPage = data.next;
			const vgs = data.results.map((vg) => ({
				id: vg.id,
				name: vg.name,
				released_date: vg.released,
				background_image: vg.background_image,
				genres: vg.genres?.map((genre) => genre.name),
				rating: vg.rating,
				platforms: vg.parent_platforms.map((plat) => {
					return plat.platform.name;
				}),
			}));
			vgs.forEach((vg) => videoGames.push(vg));
			return nextPage;
		})
		.catch((error) => console.log(error));
};

const fetchApiById = (page) => {
	return axios.get(page).then(({ data }) => {
		const vg = {
			id: data.id,
			name: data.name,
			description: data.description,
			released_date: data.released,
			background_image: data.background_image,
			genres: data.genres.map((genre) => genre.name),
			rating: data.rating,
			platforms: data.parent_platforms.map((plat) => {
				return plat.platform.name;
			}),
		};
		return vg;
	});
};

//Controllers

const getGames = async (req, res, next) => {
	const videoGames = [];
	let nextPage;
	const { name } = req.query;
	if (name) {
		try {
			nextPage = `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`;
			const vgs = await Videogame.findAll({
				where: {
					name: {
						[Op.iLike]: name,
					},
				},
			});
			let end = 15;
			if (vgs.length) {
				end -= vgs.length;
				// vgs.forEach((vg) => videoGames.push(vg));
				videoGames.push([...vgs]);
			}
			let apiVideoGames = [];
			await fetchApi(apiVideoGames, nextPage);
			videoGames.push([...apiVideoGames]);
			return videoGames.flat(2).length
				? res.send(videoGames.flat(2).slice(0, end))
				: res.status(404).send(`No games found with that name`);
		} catch (error) {
			return next(error);
		}
	}
	try {
		nextPage = `https://api.rawg.io/api/games?key=${API_KEY}`;
		const vgs = await Videogame.findAll({
			include: {
				model: Genre,
				attributes: ['name'],
				through: {
					attributes: [],
				},
			},
		});

		videoGames.push([...vgs]);
		let apiVideoGames = [];
		for (let i = 0; i < 5; i++) {
			nextPage = await fetchApi(apiVideoGames, nextPage);
		}
		videoGames.push([...apiVideoGames]);
		console.log(videoGames.length);
		return res.send(videoGames);
	} catch (error) {
		return next(error);
	}
};

const getGameById = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (validateUUID(id)) {
			// const dbGame = await Videogame.findByPk(id);
			const dbGame = await Videogame.findOne({
				where: {
					id: id,
				},
				include: {
					model: Genre,
					attributes: ['name'],
					through: {
						attributes: [],
					},
				},
			});
			if (dbGame) {
				return res.send(dbGame);
			}
		} else {
			const apiGame = await fetchApiById(
				`https://api.rawg.io/api/games/${id}?key=${API_KEY}`
			);
			if (apiGame) {
				return res.send(apiGame);
			}
		}
		return res.status(404).send(`No se encontro un juego con ese ID`);
	} catch (error) {
		next(error);
	}
};

const createGame = async (req, res, next) => {
	const {
		name,
		description,
		release_date,
		rating,
		platforms,
		genres,
		background_image,
	} = req.body;
	if (!name || !description || !platforms)
		return res
			.status(400)
			.send(
				`El videojuego requiere como mínimo un nombre, una descripción y sus plataformas para ser creado.`
			);
	try {
		const newVg = await Videogame.create({
			name,
			description,
			release_date,
			rating,
			platforms,
			background_image,
		});
		if (genres) {
			await newVg.setGenres(genres);
		}
		newVg.dataValues.genres = genres;

		console.log(`Juego creado!`);
		console.log(newVg);
		return res.status(201).send(newVg);
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	getGames,
	getGameById,
	createGame,
};
