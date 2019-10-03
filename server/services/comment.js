import comment from '../models/comment';
import article from '../models/article';

export default class service {
  static writeComment(input, articleId, authorId) {
    const theArticle = article.retriveArticle(articleId);
    if (!theArticle) {
      const err = 'Article not found. You can not comment on it';
      return { status: 404, error: err };
    }
    const { title } = theArticle;
    const { subtitle } = theArticle;
    const articleBody = theArticle.article;
    const written = comment.write(input, Number(articleId), authorId, title, subtitle, articleBody);
    const msg = 'Comment successfully created';
    return { status: 201, message: msg, data: written };
  }
}
