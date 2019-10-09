import { runQuery } from '../config/connection';
import { queries }  from '../db/queries';

class service {
  static async write(input, authorId){
    const values = [
      input.title.trim() || 'Untitled',
      input.subtitle.trim(),
      input.article,
      authorId
    ];
    
    try {
      const { rows } = await runQuery(queries.publish, values),
      newArticle = rows[0];
      return { 
        status: 201, 
        message: 'Article successfully created',
        data: { newArticle }
      }
    } catch(error) {
      return { 
        status:503, 
        error: 'service unavailable because it is under mantainance. Try again later'
      }
    }
  }

}

export default service;