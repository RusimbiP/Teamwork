import { runQuery } from '../config/connection';
import { queries }  from '../db/queries';
import Helper  from '../helpers/helper'
const {  hashPassword, Tokenize } = Helper;
class service {
  static async create(input){
    const values = [
      input.firstname,
      input.lastname,
      input.email,
      hashPassword(input.password),
      input.gender,
      input.jobrole,
      input.department,
      input.address,
      'false'
    ];
  
  try {
    const { rows } = await runQuery(queries.createUser, values),
    token = Tokenize(rows[0].id, rows[0].email),
    msg = `User created successfully`;
    return { status: 201, message:msg, data:{token:token}}
    
  } catch(error) {
    if (error.routine === '_bt_check_unique') {
      const err = `This email is already taken`
      return { status: 409, error:err }
    }
  }
  }
}

export default service;