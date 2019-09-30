import Helper from '../helpers/helper';
class employee {
  constructor() {
    this.employees = [
      {
        "id": 1,
        "firstName": "cmc",
        "lastName": "PatricK",
        "email": "taken@teamwork.com",
        "password": "$2b$08$ByXvwUxxU47vy1tsKynZOecjXggYnsA4X9S3p2pWPKt1sRONu/P72",
        "gender": "male",
        "jobRole": "kkkkkkkkkkkkkkkkkkk",
        "department": "nkkn",
        "address": "KG 344 St" 
      }
         
    ];
  }
/********Creating a new user************ */
  save(input) {
    const newEmployee = {
      id: this.employees.length +1,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: Helper.hashPassword(input.password),
      gender:input.gender,
      jobrole:input.jobRole,
      department:input.department,
      address:input.address
    };
    this.employees.push(newEmployee);
    return newEmployee;
  }
/*********Finding one registered user*********** */
  registered(email) {
    return this.employees.find(e => e.email === email);
  }

}
export default new employee();
