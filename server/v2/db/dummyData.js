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
  console.log('Creating test data...');
});
const { password } = process.env;


const seed = async () => {
  const userTestAccount = `INSERT INTO users(firstname, lastname, email, password, gender, Jobrole, department, address, isAdmin) VALUES('John', 'Doe', 'taken@teamwork.com','${password}', 'Male','Accountant', 'Finance', 'KG 232 Ave', 'false')`;
  await pool.query(userTestAccount);
  console.log('Done.');
}
seed();