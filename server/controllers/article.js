import service from '../Services/article';

export default class controller {
  static write(req, res){
    const result = service.write(req.body, req.authorId)
    res.status(result.status).json(result)
  }
}

