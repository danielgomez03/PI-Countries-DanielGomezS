const { Activities, Country } = require('../db');

async function postActivity(req, res, next) {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    // Crear la actividad turística en la base de datos
    const activity = await Activities.create({
      name,
      difficulty,
      duration,
      season,
    });

    // Relacionar la actividad con los países indicados
    if (countries && countries.length > 0) {
      await activity.setCountries(countries);
    }

    res.status(201).json({ message: 'Activity created successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  postActivity,
};