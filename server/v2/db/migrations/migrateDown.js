import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let conn = conn = process.env.DATABASE_URL;

const pool = new Pool({ connectionString: conn });
pool.on('connect', () => {
  console.log('We connected to the database');
});

const dropTable = [
  'DROP TABLE IF EXISTS comments',
  'DROP TABLE IF EXISTS articles CASCADE',
  'DROP TABLE IF EXISTS users CASCADE',
];

const dropTables = async () => {
  for (const i of dropTable) {
    await pool.query(i);
  }
};

dropTables();
