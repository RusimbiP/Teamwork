import { pool } from '../config/connection';

export const queries = {
  /**
   * User queries
   */
  createUser: `INSERT INTO users(firstname, lastname, email, password, gender, Jobrole, department, address, isAdmin)
              VALUES($1,$2,$3,$4,$5,$6,$7,$8, $9) returning *`,

  isRegistered:  'SELECT * FROM users WHERE email = $1',

  /**
   * Article queries
   */
  publish: `INSERT INTO articles(title, subtitle, article, authorId)
            VALUES($1, $2, $3, $4) returning *`
}

