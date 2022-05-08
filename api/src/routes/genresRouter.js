const { Router } = require('express');
const { getGenres } = require('../controllers/genresController.js');

const genresRouter = Router();
module.exports = genresRouter;

genresRouter.get('/', getGenres);
