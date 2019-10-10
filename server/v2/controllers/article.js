import service from '../services/article';

class controller {
  static async write(req, res){
    const response = await service.write(req.body, req.authorId);
    res.status(response.status).json(response);
  }

  static async edit(req, res){
    const response = await service.edit(req.body, req.params, req.authorId);
    res.status(response.status).json(response);
  }

}

export default controller;