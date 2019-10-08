import { pool } from '../../config/connection';

pool.on('connect', () => {
  console.log('seeding data...');
});
const {
  firstname, lastname, email, password, gender, jobrole, deparment, address,
} = process.env;


const seed = async () => {
  const seedAdmin = `INSERT INTO users(firstname, lastname, email, password, gender, jobrole, department, address,  isAdmin) VALUES('${firstname}', '${lastname}', '${email}', '${password}', '${gender}','${jobrole}', '${deparment}', '${address}', 'true')`;
  await pool.query(seedAdmin);
  console.log('Done.');
}
seed();
