import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';

const { expect } = chai;
const data = {
  "firstName": "cmc",
	"lastName": "PatricK",
	"email": "some@teamwork.com",
	"password": "password",
	"gender": "male",
	"jobRole": "kkkkkkkkkkkkkkkkkkk",
	"department": "nkkn",
	"address": "KG 344 St"
};
chai.use(chaiHttp);
describe('Tests for auth endpoints', ()=>{
  describe('POST api/v1/auth/signup', () => {
    it('Should successfully sign up a user and return a token', done =>{
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(data)
        .end((err, res) =>{
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body.status).to.be.equal(201);
          expect(res.body.message).to.be.equal("User created successfully");
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
    it('Should return an error if a user tries to sign up without an already existing email', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          "firstName": "cmc",
          "lastName": "PatricK",
          "email": "taken@teamwork.com",
          "password": "password",
          "gender": "male",
          "jobRole": "kkkkkkkkkkkkkkkkkkk",
          "department": "nkkn",
          "address": "KG 344 St"
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.be.equal(409);
          expect(res.body).to.have.keys('status', 'error',);
          expect(res.body.error).to.be.equal('taken@teamwork.com is already taken');
          done();
        });
    });
    it('Should return an error if a user tries to sign up without a firstName', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          "lastName": "PatricK",
          "email": "taken@teamwork.com",
          "password": "password",
          "gender": "male",
          "jobRole": "kkkkkkkkkkkkkkkkkkk",
          "department": "nkkn",
          "address": "KG 344 St"
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'errors',);
          expect(res.body.errors).to.have.keys('body',);
          expect(res.body.errors.body.firstName).to.be.equal("FirstName must be between 2 and 15 characters");
          expect(res.body.errors).to.be.a('object')
          done();
        });
    });
    it('Should return an error if a user tries to sign up with a firstName that contains digits', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          "firstName": "Pat11",
          "lastName": "Patrick",
          "email": "taken@teamwork.com",
          "password": "password",
          "gender": "male",
          "jobRole": "kkkkkkkkkkkkkkkkkkk",
          "department": "nkkn",
          "address": "KG 344 St"
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'errors',);
          expect(res.body.errors).to.have.keys('body',);
          expect(res.body.errors.body.firstName).to.be.equal('FirstName can only contain alphabets ex: John');
          expect(res.body.errors).to.be.a('object')
          done();
        });
    });
    it('Should return an error if a user tries to sign up without lastName', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          "firstName": "Patrick",
          "email": "taken@teamwork.com",
          "password": "password",
          "gender": "male",
          "jobRole": "kkkkkkkkkkkkkkkkkkk",
          "department": "nkkn",
          "address": "KG 344 St"
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'errors',);
          expect(res.body.errors).to.have.keys('body',);
          expect(res.body.errors.body.lastName).to.be.equal("LastName must be between 2 and 15 characters");
          done();
        });
    });
    it('Should return an error if a user tries to sign up with a lastName that contains digits', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          "firstName": "Patrick",
          "lastName": "1111",
          "email": "taken@teamwork.com",
          "password": "password",
          "gender": "male",
          "jobRole": "kkkkkkkkkkkkkkkkkkk",
          "department": "nkkn",
          "address": "KG 344 St"
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'errors',);
          expect(res.body.errors).to.have.keys('body',);
          expect(res.body.errors.body.lastName).to.be.equal('LastName can only contain alphabets ex: Doe');
          done();
        });
    });
    it('Should return an error if a user tries to sign up with an invalid email', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          "firstName": "Patrick",
          "lastName": "Apps",
          "email": "invalidteamwork.com",
          "password": "password",
          "gender": "male",
          "jobRole": "kkkkkkkkkkkkkkkkkkk",
          "department": "nkkn",
          "address": "KG 344 St"
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'errors',);
          expect(res.body.errors).to.have.keys('body',);
          expect(res.body.errors.body.email).to.be.equal('Provide a email address eg:some1@some.com');
          done();
        });
    });
    it('Should return an error if a user tries to sign up when password is less than 6 characters', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          "firstName": "Patrick",
          "lastName": "Apps",
          "email": "valid@teamwork.com",
          "password": "123",
          "gender": "male",
          "jobRole": "kkkkkkkkkkkkkkkkkkk",
          "department": "nkkn",
          "address": "KG 344 St"
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'errors',);
          expect(res.body.errors).to.have.keys('body',);
          expect(res.body.errors.body.password).to.be.equal('Password must contain at least 6 characters');
          done();
        });
    });
    it('Should return an error if a user tries to sign up when password is greater than 20 characters', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          "firstName": "Patrick",
          "lastName": "Apps",
          "email": "valid@teamwork.com",
          "password": "1232222222222222222222222222222222222222222222222222222",
          "gender": "male",
          "jobRole": "kkkkkkkkkkkkkkkkkkk",
          "department": "nkkn",
          "address": "KG 344 St"
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'errors',);
          expect(res.body.errors).to.have.keys('body',);
          expect(res.body.errors.body.password).to.be.equal('Password can be max 20 characters max');
          expect(res.body.errors).to.be.a('object')
          done();
        });
    });
    it('Should return an error if a user tries to sign up with a forged gender', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          "firstName": "Patrick",
          "lastName": "Apps",
          "email": "valid@teamwork.com",
          "password": "1234567",
          "gender": "new gender",
          "jobRole": "kkkkkkkkkkkkkkkkkkk",
          "department": "nkkn",
          "address": "KG 344 St"
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'errors',);
          expect(res.body.errors).to.have.keys('body',);
          expect(res.body.errors.body.gender).to.be.equal('gender must be either Male or Female. So, Which one are you?');
          expect(res.body.errors).to.be.a('object')
          done();
        });
    });
    it('Should return an error if a user tries to sign up without department and job role', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          "firstName": "Patrick",
          "lastName": "Apps",
          "email": "valid@teamwork.com",
          "password": "1234567",
          "gender": "male",
          "address": "KG 344 St"
        })
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.be.equal(422);
          expect(res.body).to.have.keys('status', 'errors',);
          expect(res.body.errors).to.have.keys('body',);
          expect(res.body.errors.body.department).to.be.equal('department must be between 4 and 50 characters');
          expect(res.body.errors.body.jobRole).to.be.equal('jobRole must be between 4 and 50 characters');
          expect(res.body.errors).to.be.a('object')
          done();
        });
    });
    
    /***********************************login tests*****************************************************/  
    it('Should successfully sign in a user and return a token', done =>{
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
        "email": "taken@teamwork.com",
        "password": "password",
        })
        .end((err, res) =>{
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.status).to.be.equal(200);
          expect(res.body.message).to.be.equal("User is successfully logged in");
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
    it('Should return an error user tries to login with incorrect email or password', done =>{
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
        "email": "taken@teamwork.com",
        "password": "kdnadfklk",
        })
        .end((err, res) =>{
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body.status).to.be.equal(401);
          expect(res.body.error).to.be.equal("Wrong email and password combination");
          done();
        });
    });
    it('Should return an error when user tries to login with an un registered email', done =>{
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
        "email": "notregistered@teamwork.com",
        "password": "nnnnnnn",
        })
        .end((err, res) =>{
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal("notregistered@teamwork.com is not registered");
          done();
        });
    });
  })
})