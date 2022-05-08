const { Router } = require('express');
const videogamesRouter = require('./videogamesRouter');
const genresRouter = require('./genresRouter.js');
const videogameRouter = require('./videogameRouter');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogamesRouter);
router.use('/genres', genresRouter);
router.use('/videogame', videogameRouter);

module.exports = router;
