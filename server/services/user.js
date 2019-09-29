import employee from '../models/user';
import Helper from '../helpers/helper';
const { Tokenize, comparePassword } = Helper;
 /*                                                                                         
  +-+-+-+-+-+-+-+-+-+ +-+-+ +-+-+-+-+-+-+ +-+-+-+-+-+ +-+-+-+-+ +-+-+-+ +-+-+-+-+ +-+-+-+-+-+
* |P|r|o|t|e|c|t|e|d| |b|y| |A|n|d|e|l|a| |H|o|n|o|r| |C|o|d|e| |3|r|d| |E|P|I|C| |V|a|l|u|e| *
  +-+-+-+-+-+-+-+-+-+ +-+-+ +-+-+-+-+-+-+ +-+-+-+-+-+ +-+-+-+-+ +-+-+-+ +-+-+-+-+ +-+-+-+-+-+                                                                                      
*/                                                

class service {
/****************** Handles Registration *****************/
  static register(input){
    const taken = employee.registered(input.email),
    err = `${input.email} is already taken`;
    if(taken){
      return { status:409, error:err }
    };
    
    const new1 = employee.save(input),
    token = Tokenize(new1.id),
    msg = `User created successfully`
    return{ status: 201, message:msg, token:token }
  }

/********************* END **************************************** */
}
export default service;