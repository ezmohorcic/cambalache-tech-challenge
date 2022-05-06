const express = require('express');
const cors = require ('cors')
const dotenv = require ('dotenv')
const passport = require('passport')
const cookieSession = require('cookie-session')

const allRoute = require('./routes/index')
const app = express();

dotenv.config()

app.use(cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60* 100 }));
app.use(passport.session());

app.use(cors({origin:"*"}));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api', allRoute)

// Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
