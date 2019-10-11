import { pool } from '../config/connection';

export const queries = {
  /**
   * User queries
   */
  createUser: `INSERT INTO users(firstname, lastname, email, password, gender, Jobrole, department, address, isAdmin)
              VALUES($1,$2,$3,$4,$5,$6,$7,$8, $9) returning *`,

  isRegistered:  'SELECT * FROM users WHERE email = $1',
  getAuthor: 'SELECT * FROM users WHERE id = $1',

  /**
   * Article queries
   */
  publish: `INSERT INTO articles(title, subtitle, article, authorid)
            VALUES($1, $2, $3, $4) returning *`,
  
  getArticleWithAuthor: `SELECT * FROM articles WHERE articleid=$1 AND authorid = $2`,

  getArticle: `SELECT * FROM articles WHERE articleid=$1`,
  
  editArticle: `UPDATE articles SET title=$1,subtitle=$2,article=$3 WHERE articleid=$4 AND authorid = $5 returning *`,
  
  getFeed: `SELECT * FROM articles ORDER BY createdon DESC`,

  deleteArticle: `DELETE FROM articles WHERE articleid=$1 AND authorid = $2 returning *`,

  /***
   * comment queries
   */
  comment: `INSERT INTO comments(articleid, articletitle, article, comment, authorid) VALUES($1, $2, $3, $4, $5) returning *`
}

