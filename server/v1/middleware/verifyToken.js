import jwt from 'jsonwebtoken'; 
import user from '../models/user';

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token)
    {return res.status(403).send({ status: 403, error: 'No token provided.' });}

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err)
      {return res.status(401).send({ status: 401, error: 'Invalid token!' });}
    const registered = user.registered(decoded.employeeId.email);
    if (!registered) {
      return res.status(403).send({
        status: 403,
        error: 'You cannot use an unregistered email for that!',
      });
    }
      req.authorId = decoded.employeeId.id;
    next();
  });

};

export default verifyToken;


