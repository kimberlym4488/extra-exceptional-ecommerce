const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const helpers = require('./public/utils/helpers');
require('dotenv').config();

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers. If we wanted global context, utility class helpers we can them to the helpers file in utils on the client side.
const hbs = exphbs.create({ helpers });

// Tell Express.js on which template engine to use, I chose handlebars since we only have a couple pages to render.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Tell the app which static path to pull from
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});
