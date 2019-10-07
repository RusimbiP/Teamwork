import express from 'express';

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => res.send('Welcome to Teamwork'));

app.use((req, res, next) => {
  const error = new Error('Oh! snap! There is not such a page. Double check your url.');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: error.status || 500,
    error: error.message
  });
  next();
});

export default app;
