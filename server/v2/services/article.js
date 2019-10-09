import { runQuery } from '../config/connection';
import { queries }  from '../db/queries';

class service {
  static async write(input, authorId){
    const values = [
      input.title,
      input.subtitle,
      input.article,
      authorId
    ];
    
    try {
      const { rows } = await runQuery(queries.publish, values)
      return { 
        status: 201, 
        message: 'ok' }
    } catch(error) {
      return { status:500, error}
    }
  }

}

export default service;