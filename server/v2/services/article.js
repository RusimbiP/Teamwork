import { runQuery } from '../config/connection';
import { queries }  from '../db/queries';

class service {
  static async writeArticle(input, authorId){
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

  static async editArticle(input, articleId, authorId){
    const id = Object.values(articleId)[0];
    const articleid = Number(id);
    try {
      const { rows } = await runQuery(queries.getArticle, [articleid, authorId]);
    
      if(!rows[0]) {
        return { status:404, error: 'You have not created such article'}
      }

      const values = [
        input.title || rows[0].title,
        input.subtitle || rows[0].subtitle,
        input.article || rows[0].article,
        articleid,
        authorId
      ];

      const edit= await runQuery(queries.editArticle, values);
      const edited = edit.rows[0];
      return { status:200, data:edited }
      } catch(err) {
        return { 
          status:503, 
          error: 'service unavailable because it is under mantainance. Try again later'
        }
      }
  }


}

export default service;