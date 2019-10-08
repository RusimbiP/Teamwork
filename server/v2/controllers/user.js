/*
    +-+-+-+-+-+-+-+-+-+ +-+-+ +-+-+-+-+-+-+ +-+-+-+-+-+ +-+-+-+-+ +-+-+-+ +-+-+-+-+ +-+-+-+-+-+
  * |P|r|o|t|e|c|t|e|d| |b|y| |A|n|d|e|l|a| |H|o|n|o|r| |C|o|d|e| |3|r|d| |E|P|I|C| |V|a|l|u|e| *
    +-+-+-+-+-+-+-+-+-+ +-+-+ +-+-+-+-+-+-+ +-+-+-+-+-+ +-+-+-+-+ +-+-+-+ +-+-+-+-+ +-+-+-+-+-+
  */

 import service from '../services/user';

 export default class controller {
 /** **************** Controls Registration ****************** */
   static async create(req, res) {
     const response = await service.create(req.body);
     res.status(response.status).json(response);
   }
 /** *********************END ****************************** */
 }
 