const { Activities, Country } = require('../db');

// async function postActivity(req, res, next) {
//   const { name, difficulty, duration, season, countries } = req.body;

//   try {
//     // Crear la actividad turística en la base de datos
//     const activity = await Activities.create({
//       name,
//       difficulty,
//       duration,
//       season,
//     });

//     // Relacionar la actividad con los países indicados
//     if (countries && countries.length > 0) {
//       await activity.setCountries(countries);
//     }

//     res.status(201).json({ message: 'Activity created successfully' });
//   } catch (error) {
//     next(error);
//   }
// }

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
      // Obtener los objetos de país correspondientes a los IDs recibidos
      const countryObjects = await Country.findAll({
        where: {
          id: countries,
        },
      });

      // Asociar los países a la actividad
      await activity.setCountries(countryObjects);
    }

    res.status(201).json({ message: 'Activity created successfully' });
  } catch (error) {
    next(error);
  }
}


async function getActivities(req, res, next) {
  try {
    const activities = await Activities.findAll();
    res.json(activities);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getActivities,
  postActivity,
};