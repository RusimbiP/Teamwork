import { pool } from '../config/connection'
import articleUrl from '../routes/article';

pool.on('connect', () => {
  console.log('Creating test data...');
});
const { password } = process.env;


const seed = async () => {
  const userTestAccount = `INSERT INTO users(firstname, lastname, email, password, gender, Jobrole, department, address, isAdmin) VALUES('John', 'Doe', 'taken@teamwork.com','${password}', 'Male','Accountant', 'Finance', 'KG 232 Ave', 'false')`,
  
  await pool.query(userTestAccount);

  console.log('Done.');
}
seed();