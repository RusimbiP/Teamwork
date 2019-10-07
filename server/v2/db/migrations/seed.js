import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const conn = process.env.DATABASE_URL;

const pool = new Pool({ connectionString: conn });
pool.on('connect', () => {
  console.log('We connected to the database');
});

const adminFirstname = process.env.firstname;
const adminLastname = process.env.lastname;
const adminEmail = process.env.email;
const pass = process.env.pass;
const adminGender = process.env.gender;
const adminJobrole = process.env.jobrole;
const adminDepartment = process.env.department;
const adminAddress = process.env.address;

const seed = async () => {
  const dataSeeds = [
    `INSERT INTO users(firstname, lastname, email, password, gender, Jobrole, department, address, isAdmin) VALUES('John', 'Doe', 'taken@teamwork.com',${pass}, 'Male','Accountant', 'Finance', 'KG 232 Ave', 'false')`,
    `INSERT INTO users(firstname, lastname, email, password, gender, jobrole, department, address,  isAdmin) VALUES(${adminFirstname}, ${adminLastname}, ${adminEmail}, ${pass}, ${adminGender},${adminJobrole}, ${adminDepartment}, ${adminAddress}, 'true')`,
  ];

  for (const seeds of dataSeeds) {
    await pool.query(seeds);
  }
};
seed();
