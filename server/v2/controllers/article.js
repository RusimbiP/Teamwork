import service from '../services/article';

class controller {
  static async writeArticle(req, res){
    const response = await service.writeArticle(req.body, req.authorId);
    res.status(response.status).json(response);
  }

  static async editArticle(req, res){
    const response = await service.editArticle(req.body, req.params, req.authorId);
    res.status(response.status).json(response);
  }

  static async getFeed(req, res){
    const response = await service.getFeed();
    res.status(response.status).json(response);
  }

  static async deleteArticle(req, res){
    const response = await service.deleteArticle(req.params, req.authorId);
    res.status(response.status).json(response);
  }

  static async writeComment(req, res){
    const response = await service.writeComment(req.body, req.params, req.authorId);
    res.status(response.status).json(response);
  }

  static async getOneArticle(req, res){
    const response = await service.getOneArticle(req.params);
    res.status(response.status).json(response);
  }

}

export default controller;