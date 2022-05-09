require('dotenv').config();
const axios = require('axios');
const { Videogame, Op } = require('../db.js');
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
				launch_date: vg.released,
				rating: vg.rating,
				platforms: vg.parent_platforms.map((plat) => {
					return plat.platform.name;
				}),
			}));
			vgs.forEach((vg) => videoGames.push(vg));
		})
		.catch((error) => console.log(error));
};

const fetchApiById = (id, page) => {
	return axios.get(page).then(({ data }) => {
		const vg = {
			id: data.id,
			name: data.name,
			description: data.description,
			launch_date: data.released,
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
				vgs.forEach((vg) => videoGames.push(vg));
			}

			await fetchApi(videoGames, nextPage);
			return videoGames.length
				? res.send(videoGames.slice(0, end))
				: res.status(404).send(`No se encontraron juegos con ese nombre`);
		} catch (error) {
			return next(error);
		}
	}
	try {
		nextPage = `https://api.rawg.io/api/games?key=${API_KEY}`;
		const vgs = await Videogame.findAll();
		vgs.forEach((vg) => videoGames.push(vg));
		for (let i = 0; i < 5; i++) {
			await fetchApi(videoGames, nextPage);
		}
		console.log(videoGames.length);
		return res.send(videoGames);
	} catch (error) {
		return next(error);
	}
};

const getGameById = async (req, res, next) => {
	const { id } = req.params;
	try {
		console.log(typeof id);
		if (validateUUID(id)) {
			const dbGame = await Videogame.findByPk(id);
			if (dbGame) {
				// get genres del juego
				console.log(dbGame);
				return res.send(dbGame);
			}
		} else {
			const apiGame = await fetchApiById(
				id,
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
	const { name, description, release_date, rating, platforms } = req.body;
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
		});
		console.log(`Juego creado!`);
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
