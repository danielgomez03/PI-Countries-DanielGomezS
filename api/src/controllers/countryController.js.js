const { Country, Activities,  Op } = require('../db');
const Sequelize = require('sequelize');

async function getAllCountries(req, res, next) {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    next(error);
  }
}

async function getCountriesById(req, res, next) {
  try {
    const { id } = req.params;
    const idCountry = id.toUpperCase();
    const countryByID = await Country.findOne({
      where: { id: idCountry },
      include: Activities,
    });

    if (!countryByID) {
      return res.status(404).json({ error: 'Country not found' });
    }

    return res.json(countryByID);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// async function getCountriesByName(req, res, next) {
//   try {
//     const { name } = req.params;
//     const countryByName = await Country.findOne({
//       where: { name },
//       include: Activities,
//     });

//     if (!countryByName) {
//       return res.status(404).json({ error: 'Country not found' });
//     }

//     return res.json(countryByName);
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// }

async function getCountriesByName(req, res, next) {
  try {
    const { name } = req.params;

    const countryByName = await Country.findOne({
      where: Sequelize.where(
        Sequelize.fn('lower', Sequelize.col('name')),
        'ILIKE',
        '%' + name.toLowerCase() + '%'
      ),
      include: Activities,
    });

    if (!countryByName) {
      return res.status(404).json({ error: 'Country not found' });
    }

    return res.json(countryByName);
  } catch (error) {
    console.error(error); // Mostrar el error en la consola para fines de depuración
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getCountriesByName,
  getCountriesById,
  getAllCountries,
};