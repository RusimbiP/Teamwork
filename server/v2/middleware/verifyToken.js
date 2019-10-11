import jwt from 'jsonwebtoken'; 
import { runQuery } from '../config/connection';
import { queries } from '../db/queries';

class Auth{
  static async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token) {
      return res.status(401).send({ 
        status: 401,
        error: 'No token provided.'
       });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
 
      const { rows } = await runQuery(queries.isRegistered, [decoded.employeeId]);
      if(!rows[0]) {
        return res.status(401).send({
           status: 401, error: 'You need to be registered to perform this action' 
          });
      }
      req.authorId = rows[0].id;
      next();
    } catch(error) {
      return res.status(401).send({
        status:401,
        error: 'Invalid token!'
      });
    }
  }
}

export default Auth;


