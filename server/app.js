import express from 'express';
require('dotenv').config();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => res.send('Welcome to Teamwork'));

export default app;