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

const createTables = async () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY UNIQUE,
      firstname TEXT NOT NULL,
      lastname TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      address TEXT NOT NULL,
      jobRole TEXT NOT NULL,
      gender  TEXT NOT NULL,
      department TEXT NOT NULL,
      isAdmin TEXT DEFAULT false,
      createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;


  const articlesTable = `
    CREATE TABLE IF NOT EXISTS articles(
      id SERIAL PRIMARY KEY UNIQUE,
      title TEXT NOT NULL,
      subTitle TEXT,
      article TEXT NOT NULL,
      authorId TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
      createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  const commentsTable = `
    CREATE TABLE IF NOT EXISTS comments(
      id SERIAL PRIMARY KEY UNIQUE,
      articleId INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
      articleTitle TEXT NOT NULL,
      article TEXT NOT NULL,
      comment TEXT NOT NULL,
      createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  await pool.query(usersTable);
  await pool.query(articlesTable);
  await pool.query(commentsTable);

};

createTables();
