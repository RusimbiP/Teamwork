import employee from '../models/user';
import Helper from '../helpers/helper';

const { Tokenize, comparePassword } = Helper;
/*
  +-+-+-+-+-+-+-+-+-+ +-+-+ +-+-+-+-+-+-+ +-+-+-+-+-+ +-+-+-+-+ +-+-+-+ +-+-+-+-+ +-+-+-+-+-+
* |P|r|o|t|e|c|t|e|d| |b|y| |A|n|d|e|l|a| |H|o|n|o|r| |C|o|d|e| |3|r|d| |E|P|I|C| |V|a|l|u|e| *
  +-+-+-+-+-+-+-+-+-+ +-+-+ +-+-+-+-+-+-+ +-+-+-+-+-+ +-+-+-+-+ +-+-+-+ +-+-+-+-+ +-+-+-+-+-+
*/

class service {
/** **************** Handles Registration **************** */
  static register(input) {
    const taken = employee.registered(input.email);
    const err = `${input.email} is already taken`;
    if (taken) {
      return { status: 409, error: err };
    }

    const new1 = employee.save(input);
    const token = Tokenize(new1.id);
    const mute = 'password';
    const newUser = Object.keys(new1).reduce((object, key) => {
      if (key !== mute) {
        object[key] = new1[key];
      }
      return object;
    }, {});
    const msg = 'User created successfully';
    return {
      status: 201,
      message: msg,
      data: {
        token, newUser },
    };
  }

  /** **************** Handles Login *********************** */
  static login(credentials) {
    const { email, password } = credentials;
    const user = employee.registered(email);
    if (!user) {
      const err = `${email} is not registered`;
      return { status: 404, error: err };
    }

    const hash = user.password;
    const truePass = Helper.comparePassword(hash, password);

    if (truePass === true) {
      const { id, email } = user;
      const token = Tokenize(user);
      const msg = 'User is successfully logged in';
      return {
        status: 200,
        message: msg,
        data: {
          token,
        },
      };
    }
    const err = 'Wrong email and password combination';
    return { status: 404, error: err };
  }
/** ******************* END **************************************** */
}
export default service;
