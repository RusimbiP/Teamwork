  /**
                                   .-"""-.
                                / .===. \
                                \/ 6 6 \/
                                ( \___/ )
    _________________________ooo__\_____/______________________________
  /                                                                   \
  | This project is Protected by Andela Honor code; third EPIC value |
  \_______________________________________ooo_________________________/
                                  |  |  |
                                  |_ | _|
                                  |  |  |
                                  |__|__|
                                  /-'Y'-\
                                (__/ \__)
  */
import express from 'express';
import userUrl from './routes/user';
require('dotenv').config();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/v1/auth', userUrl)
app.get('/', (req, res) => res.send('Welcome to Teamwork'));

export default app;