const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const cookkieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookkieParser());

// import all routes here.
const userRoutes = require('./routes/userRoute');

// define all routes here
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

module.exports = app;
