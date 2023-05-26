const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriesController = require('../controllers/countryController.js');
const ActivitiesController = require('../controllers/activityController.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/countries', countriesController.getAllCountries)
router.get('/countries/:id', countriesController.getCountriesById)
router.post('/activities', ActivitiesController.postActivity);

module.exports = router;
