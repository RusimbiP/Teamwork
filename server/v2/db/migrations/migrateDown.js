import { pool } from '../../config/connection';

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
