import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const conn = process.env.DATABASE_URL;

const pool = new Pool({ connectionString: conn });
pool.on('connect', () => {
  console.log('We connected to the database');
});
const {
  firstname, lastname, email, password, gender, jobrole, deparment, address,
} = process.env;


const seed = async () => {
  const dataSeeds = [
    `INSERT INTO users(firstname, lastname, email, password, gender, Jobrole, department, address, isAdmin) VALUES('John', 'Doe', 'taken@teamwork.com','${password}', 'Male','Accountant', 'Finance', 'KG 232 Ave', 'false')`,
    `INSERT INTO users(firstname, lastname, email, password, gender, jobrole, department, address,  isAdmin) VALUES('${firstname}', '${lastname}', '${email}', '${password}', '${gender}','${jobrole}', '${deparment}', '${address}', 'true')`,
  ];

  for (const seeds of dataSeeds) {
    await pool.query(seeds);
  }
};
seed();
