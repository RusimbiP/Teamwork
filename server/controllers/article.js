import service from '../services/article';

export default class controller {
  static write(req, res) {
    const result = service.write(req.body, req.authorId);
    res.status(result.status).json(result);
  }

  static getOne(req, res) {
    const result = service.getOne(req.params.articleId);
    res.status(result.status).json(result);
  }

  static edit(req, res) {
    const result = service.edit(req.params.articleId, req.body, req.authorId);
    res.status(result.status).json(result);
  }
}

