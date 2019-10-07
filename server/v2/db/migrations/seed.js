import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let conn;

if (process.env.NODE_ENV == 'test') {
  conn = process.env.DATABASE_URL_TEST;
} else {
  conn = process.env.DATABASE_URL;
}


const pool = new Pool({ connectionString: conn });
pool.on('connect', () => {
  console.log('We connected to the database');
});
const {
  firstname, lastname, email, password, gender, jobrole, deparment, address,
} = process.env;


const seed = async () => {
  const seedAdmin = `INSERT INTO users(firstname, lastname, email, password, gender, jobrole, department, address,  isAdmin) VALUES('${firstname}', '${lastname}', '${email}', '${password}', '${gender}','${jobrole}', '${deparment}', '${address}', 'true')`;
  await pool.query(seedAdmin);
}
seed();
