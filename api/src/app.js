const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const axios = require('axios');

const { Country, Activities } = require('./db.js');
const API_URL = 'https://restcountries.com/v3.1/all';

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

axios.get(API_URL)
  .then((response) => {
    const countries = response.data;

    countries.forEach((countryData) => {
      const { cca3, name, flags, region, capital, subregion, area, population } = countryData;

      Country.create({
        id: cca3,
        name: name.common,
        image: flags.png,
        continent: region,
        capital: capital && capital.length > 0 ? capital[0] : null,
        subregion: subregion,
        area: area.toString(),
        population: population.toString(),
      })
        .then((country) => {
          console.log(`País guardado: ${country.name}`);
        })
        .catch((error) => {
          console.error('Error al guardar el país:', error);
        });
    });
  })
  .catch((error) => {
    console.error('Error al obtener los países desde la API:', error);
});


Country.findAll()
.then(countries => {
  console.log('Total de países guardados:', countries.length);
})
.catch(error => {
  console.error('Error al obtener la lista de países:', error);
});

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
