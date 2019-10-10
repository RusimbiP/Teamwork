import { pool } from '../config/connection'
import articleUrl from '../routes/article';

pool.on('connect', () => {
  console.log('Creating test data...');
});
const { password } = process.env;


const seed = async () => {
  const userTestAccount = `INSERT INTO users(firstname, lastname, email, password, gender, Jobrole, department, address, isAdmin) VALUES('John', 'Doe', 'taken@teamwork.com','${password}', 'Male','Accountant', 'Finance', 'KG 232 Ave', 'false')`,
  testArticle = `INSERT INTO articles(title, subtitle, article, authorId) VALUES('title', 'subtitle', 'article', '1') returning *`
  
  await pool.query(userTestAccount);
  await pool.query( articleTestAccount);

  console.log('Done.');
}
seed();