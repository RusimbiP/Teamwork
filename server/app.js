import express from 'express';
import userUrl from './routes/user';
import articleUrl from './routes/article';
require('dotenv').config();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/v1/auth', userUrl)
app.use('/api/v1/articles', articleUrl)
app.get('/', (req, res) => res.send('Welcome to Teamwork'));

export default app;