import { runQuery } from '../config/connection';
import { queries }  from '../db/queries';
import Helper  from '../helpers/helper'

const {  hashPassword, Tokenize, comparePassword } = Helper;
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
    return { status:400, error }
  }
  }

  static async login(credentials){
    const values = [
      credentials.email,
    ]
    try{
      const { rows } = await runQuery(queries.isRegistered, values);
      if (!rows[0]) {
        return { status:400, error: 'Wrong email and password combination'}
      }
      if(!comparePassword(rows[0].password, credentials.password)){
        return { status:400, error: 'Wrong email and password combination'}
      }
      const token = Tokenize(rows[0].email);
      return{ 
        status:200,
        message: 'User is successfully logged in',
        data:{
          token:token
        }
      }
    } catch(error){
      return { status:400, error }
    }
  }
}

export default service;