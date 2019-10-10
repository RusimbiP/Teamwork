
 import service from '../services/user';

 export default class controller {
   static async createUser(req, res) {
     const response = await service.createUser(req.body);
     res.status(response.status).json(response);
   }

   static async loginUser(req, res) {
    const response = await service.loginUser(req.body);
    res.status(response.status).json(response);
  }
 }
 