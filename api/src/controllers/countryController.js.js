const { Country, Activities } = require('../db');

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
    const countries = await Country.findAll({
      include: {
        model: Activities,
        attributes: ['name', 'difficulty', 'duration', 'season'], // Ajusta los atributos según tus necesidades
      },
      attributes: ['id', 'name', 'image', 'continent', 'capital', 'subregion', 'area', 'population'], // Ajusta los atributos según tus necesidades
    });

    res.json(countries);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCountriesById,
  getAllCountries,
};