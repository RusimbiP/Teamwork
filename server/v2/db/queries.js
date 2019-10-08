import { pool } from '../config/connection';

export const queries = {
  createUser: `INSERT INTO users(firstname, lastname, email, password, gender, Jobrole, department, address, isAdmin)
  VALUES($1,$2,$3,$4,$5,$6,$7,$8, $9) returning *`
}

