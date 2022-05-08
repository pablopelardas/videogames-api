const { Router } = require('express');
const { getGames } = require('../controllers/videogamesController');

const videogamesRouter = Router();
module.exports = videogamesRouter;

videogamesRouter.get('/', getGames);
