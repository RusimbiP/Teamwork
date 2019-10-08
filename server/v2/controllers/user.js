
 import service from '../services/user';

 export default class controller {
 /** **************** Controls Registration ****************** */
   static async create(req, res) {
     const response = await service.create(req.body);
     res.status(response.status).json(response);
   }
   /** **************** Controls Login ********************* */
   static async login(req, res) {
    const response = await service.login(req.body);
    res.status(response.status).json(response);
  }
 /** *********************END ****************************** */
 }
 