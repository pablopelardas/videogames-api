require('dotenv').config();
const axios = require('axios');
const { Genre, Op } = require('../db.js');
const { API_KEY } = process.env;

//`https://api.rawg.io/api/genres?key=${API_KEY}`

//Functions

const fetchGenres = (page) => {
	return axios.get(page).then(({ data }) => {
		const results = data.results.map((genre) => ({
			id: genre.id,
			name: genre.name,
		}));
		return results;
	});
};

//Controllers

const getGenres = async (req, res, next) => {
	let genres = [];
	let page = `https://api.rawg.io/api/genres?key=${API_KEY}`;
	try {
		genres = await fetchGenres(page);
		console.log(`Genres `);
		const promises = genres.map((genre) =>
			Genre.findOrCreate({
				where: { name: genre.name },
				defaults: {
					id: genre.id,
				},
			})
		);
		await Promise.all(promises);
		console.log('Genres creados');
		return res.send(genres);
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	getGenres,
};
