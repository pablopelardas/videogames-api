const { Router } = require('express');
const {
	getGameById,
	createGame,
} = require('../controllers/videogamesController.js');

const videogameRouter = Router();

module.exports = videogameRouter;

videogameRouter.get('/:id', getGameById);

videogameRouter.post('/', createGame);
