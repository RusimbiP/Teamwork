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

    const theAuthor = await runQuery(queries.getAuthor, [authorId]);
    const author = theAuthor.rows[0];

    const { rows } = await runQuery(queries.getArticle, [articleid]);

    if(!rows[0]) {
      return { 
        status:404, 
        error: 'article not found'}
    }

    if(rows[0].authorid != authorId){
      return { 
        status:401, 
        error: 'You can not edit an article you do not own'}
    }

    const { title, subtitle, article } = input;
      if(!title && !subtitle && !article){
        return { status:304 }
      }

    try {
      const values = [
        input.title || rows[0].title,
        input.subtitle || rows[0].subtitle,
        input.article || rows[0].article,
        articleid,
        authorId
      ];

      const edit= await runQuery(queries.editArticle, values);
      const edited = edit.rows[0];
      return { status:200, data:{edited, theAuthor}}
      } catch(err) {
        return { 
          status:503, 
          error: 'service unavailable because it is under mantainance. Try again later'
        }
      }
  }

  static async getFeed() {
    try {
      const  { rows }  = await runQuery(queries.getFeed);
      return { status:200, data: rows  }
    } catch(error) {
      return { 
        status:503, 
        error: 'service unavailable because it is under mantainance. Try again later'
      }
    }
  }

  static async deleteArticle(articleId, authorId){
    const id = Object.values(articleId)[0];
    const articleid = Number(id);
    const { rows } = await runQuery(queries.getArticle, [articleid]);

    if(!rows[0]) {
      return { 
        status:404, 
        error: 'article not found'}
    }

    if(rows[0].authorid != authorId){
      return { 
        status:401, 
        error: 'You can not delete an article you do not own'}
    }
    try {
      const { rows } = await runQuery(queries.deleteArticle, [articleid, authorId]);
      return { status:204 }
    } catch(error) {
      return { 
        status:503, 
        error: 'service unavailable because it is under mantainance. Try again later'
      }
    }
  }

  static async writeComment(input, articleId, authorId){
    const id = Object.values(articleId)[0];
    const articleid = Number(id);
   
    const article = await runQuery(queries.getArticle, [articleid]);
    if(!article.rows[0]) {
      return { 
        status:404, 
        error: 'article not found'}
    }
    
    const theAuthor = await runQuery(queries.getAuthor, [authorId]);
    const author = theAuthor.rows[0];

    const values = [
      articleid,
      article.rows[0].title,
      article.rows[0].article,
      input.comment,
      authorId
    ];
    
    try {
      const { rows } = await runQuery(queries.comment, values);
      const newComment = rows[0];
      return { 
        status: 201, 
        message: 'Comment succesfully created!',
        data: { newComment, author}
      }
    } catch(error) {
      return { 
        status:503, 
        error: 'service unavailable because it is under mantainance. Try again later'
      }
    }
  }

  static async getOneArticle( articleId){
    const id = Object.values(articleId)[0];
    const articleid = Number(id);
     try {
      const { rows } = await runQuery(queries.getArticle, [articleid]);
  
      if(!rows[0]) {
        return { 
          status:404, 
          error: 'article not found'}
      }
       const allComments = await runQuery(queries.getComments, [articleid]);
       const comments = allComments.rows[0];

       const { commentid, authorid, comment } =comments;
       const article = rows[0];
       const authorId = article.authorid;
       const theAuthor = await runQuery(queries.getAuthor, [authorId]);
       const author = theAuthor.rows[0];
      
       return { 
         status: 200, 
         data: {
            article,
             author, 
             comments:[{
               commentId:commentid, 
               authorID:authorid,
               comment:comment
              }
            ]
            }
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