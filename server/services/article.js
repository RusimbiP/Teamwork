import article from '../models/article';
import comment from '../models/comment';

export default class service {
  static write(input, authorId) {
    const written = article.publish(input, authorId);
    return {
      status: 201,
      message: 'Article successfully created',
      data: written,
    };
  }

  static getOne(id) {
    const Article = article.retriveArticle(id);
    const comments = comment.getComments(id);

    if (!Article) {
      return { status: 404, error: 'Article not found' };
    }
    return {
      status: 200,
      data: { Article, comments },
    };
  }

  
}
