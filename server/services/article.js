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

  static edit(id, input, authorId) {
    const oneArticle = article.retriveArticle(id);
    if (!oneArticle) {
      return {
        status: 404,
        error: 'Article not found. You can not edit a non-existent.',
      };
    }

    if (oneArticle.authorId !== authorId) {
      const err = 'Sorry, You cannot edit an article you do not own';
      return { status: 403, error: err };
    }
    const editedArticle = article.edit(id, input);
    return { status: 200, data: editedArticle };
  }
}
