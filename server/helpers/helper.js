import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },

  Tokenize(id) {
    const token = jwt.sign({
      employeeId: id
    },
      process.env.SECRET, { expiresIn: '7d' }
    );
    return token;
  },
  
  capitalizeFirstLetter(s){
    return s.charAt(0).toUpperCase() + s.slice(1)
  },
  
  lowerCase (s) {
       return s.toLowerCase()
  }
}

export default Helper;
