import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let conn = conn = process.env.DATABASE_URL;

const pool = new Pool({ connectionString: conn });
pool.on('connect', () => {
  console.log('We connected to the database');
});



const seed = async () => {
  const dataSeeds = [
    'INSERT INTO users(firstname, lastname, email, password, gender, jobrole, department, address,  isAdmin) VALUES(\'John\', \'Doe\', \'taken@teamwork.com\',\'$2b$08$ByXvwUxxU47vy1tsKynZOecjXggYnsA4X9S3p2pWPKt1sRONu/P72\', \'Male\',\'Accountant\', \'Finance\', \'KG 232 Ave\', \'false\')',
    'INSERT INTO users(firstname, lastname, email, password, gender, jobrole, department, address,  isAdmin) VALUES(\'Rusimbi\', \'Patrick\', \'admin@teamwork.com\',\'$2b$08$ByXvwUxxU47vy1tsKynZOecjXggYnsA4X9S3p2pWPKt1sRONu/P72\', \'Male\',\'Administor\', \'IT\', \'KG 232 Ave\', \'true\')',
  ];

  for (const seeds of dataSeeds) {
    await pool.query(seeds);
  }
};
seed();
