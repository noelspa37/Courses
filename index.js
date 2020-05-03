'use strict';
require('dotenv').config();
const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const cors = require('cors');
const gqlMiddleware = require('express-graphql');
//lectura de archivo de forma asincrona
const { readFileSync } = require('fs');
const { join } = require('path');
// Configurar los resolvers
const resolvers = require('./lib/resolvers');

const app = express();
const port = process.env.port || 3000;
//Variable para deshabilitar GraphQL en production
const isDev = process.env.NODE_ENV.trimRight() !== 'production';

//lectura del esquema
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
);

// definiendo esquema
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors());

// definiendo end-point para express con middleware
app.use(
  '/api',
  gqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev,
  })
);

// definiendo listener
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`);
});

// //ejecutar el query hello
// graphql(schema, '{saludos}', resolvers).then((data) => {
//   console.log(data);
// });
