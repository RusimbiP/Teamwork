import service from '../services/comment';

export default class controller {
  static comment(req, res) {
    const result = service.writeComment(req.body, req.params.articleId, req.authorId);
    res.status(result.status).json(result);
  }
}
