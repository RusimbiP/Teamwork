import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export let pool;
if(process.env.NODE_ENV == 'test'){  
 pool = new Pool({
     connectionString: process.env.DATABASE_URL_TEST
    });
}else{
   pool = new Pool({
    connectionString: process.env.DATABASE_URL
   }); 
} 


export const runQuery = async (queries, params = []) => {
  const outcome = await pool.query(queries, params);
  return outcome;
};
