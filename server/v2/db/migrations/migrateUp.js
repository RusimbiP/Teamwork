import { pool } from '../../config/connection';

pool.on('connect', () => {
  console.log('upward migration. creating tables...');
});

const createTables = async () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY UNIQUE,
      firstname TEXT NOT NULL,
      lastname TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      address TEXT NOT NULL,
      jobrole TEXT NOT NULL,
      gender  TEXT NOT NULL,
      department TEXT NOT NULL,
      isAdmin TEXT DEFAULT false,
      createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;


  const articlesTable = `
    CREATE TABLE IF NOT EXISTS articles(
      articleId SERIAL PRIMARY KEY UNIQUE,
      title TEXT NOT NULL,
      subTitle TEXT,
      article TEXT NOT NULL,
      authorid TEXT NOT NULL,
      createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  const commentsTable = `
    CREATE TABLE IF NOT EXISTS comments(
      commentid SERIAL PRIMARY KEY UNIQUE,
      articleid INTEGER NOT NULL,
      articleTitle TEXT NOT NULL,
      article TEXT NOT NULL,
      comment TEXT NOT NULL,
      authorid TEXT NOT NULL,
      createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  await pool.query(usersTable);
  await pool.query(articlesTable);
  await pool.query(commentsTable);
  console.log('Done.')
};

createTables();
