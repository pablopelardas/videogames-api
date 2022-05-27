const { Router } = require('express');
const {
	getGameById,
	createGame,
	deleteGame,
	updateGame,
} = require('../controllers/videogamesController.js');

const videogameRouter = Router();

module.exports = videogameRouter;

videogameRouter.get('/:id', getGameById);

videogameRouter.post('/', createGame);

videogameRouter.delete('/:id', deleteGame);

videogameRouter.put('/:id', updateGame);
