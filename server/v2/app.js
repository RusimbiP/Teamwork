import express from 'express';
import userUrl from './routes/user';
import articleUrl from './routes/article';
import feedUrl from './routes/feed';


require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v2/auth', userUrl);
app.use('/api/v2/articles', articleUrl);
app.use('/api/v2', feedUrl);

app.get('/', (req, res) => res.send('Welcome to Teamwork'));

app.use((req, res) => { 
  res.status(404).send({
    error:'Oh! snap! There is not such a page. Double check your url.'
  });
 });



export default app;
