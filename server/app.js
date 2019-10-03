import express from 'express';
import userUrl from './routes/user';
import articleUrl from './routes/article';
import commentUrl from './routes/comment';

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/auth', userUrl);
app.use('/api/v1/articles', articleUrl);
app.use('/api/v1/articles/', commentUrl);
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
    message: error.message
  });
  next();
});

export default app;
