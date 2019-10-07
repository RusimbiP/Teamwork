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
  console.log('downward migration. droping tables...');
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
  console.log('Done.')
};

dropTables();
