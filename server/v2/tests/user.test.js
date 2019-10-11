import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';

import { mockUser, newUser } from '../db/mockData';
import { unregisteredEmail } from '../db/mockData';
const { 
  firstname, lastname, email, password, gender, department, jobrole, address
} = newUser;

const { expect } = chai;

chai.use(chaiHttp);
describe('Tests for auth endpoints', () => {
  describe('POST api/v2/auth/signup', () => {
     it('Should successfully sign up a user and return a token', (done) => {
       chai
         .request(app)
         .post('/api/v2/auth/signup')
         .send(newUser)
         .end((err, res) => {
           expect(res).to.have.status(201);
           expect(res.body).to.be.a('object');
           expect(res.body.status).to.be.equal(201);
           expect(res.body.message).to.be.equal('User created successfully');
           expect(res.body.data.token).to.be.a('string');
           done();
         });
     });
     it('Should return an error if a user tries to sign up without an already existing email', (done) => {
       chai
         .request(app)
         .post('/api/v2/auth/signup')
         .send(mockUser)
         .end((err, res) => {
           expect(res).to.have.status(409);
           expect(res.body.status).to.be.equal(409);
           expect(res.body).to.have.keys('status', 'error');
           expect(res.body.error).to.be.equal('This email is already taken');
           done();
         });
     });
    it('Should return an error if a user tries to sign up without a firstname', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send({
          lastname,
          email,
          password,
          gender,
          jobrole,
          department,
          address
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.keys('status', 'errors');
          expect(res.body.errors).to.have.keys('body');
          expect(res.body.errors.body.firstname).to.be.equal('firstname is missing');
          expect(res.body.errors).to.be.a('object');
          done();
        });
    });
    it('Should return an error if a user tries to sign up with a firstname that contains digits', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send({
          'firstname': 'Pat11',
          lastname,
          email,
          password,
          gender,
          jobrole,
          department,
          address
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.keys('status', 'errors');
          expect(res.body.errors).to.have.keys('body');
          expect(res.body.errors.body.firstname).to.be.equal('firstname can only contain alphabets ex: John');
          expect(res.body.errors).to.be.a('object');
          done();
        });
    });
    it('Should return an error if a user tries to sign up without lastname', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send({
          firstname,
          email,
          password,
          gender,
          jobrole,
          department,
          address
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.keys('status', 'errors');
          expect(res.body.errors).to.have.keys('body');
          expect(res.body.errors.body.lastname).to.be.equal('lastname is missing');
          done();
        });
    });
    it('Should return an error if a user tries to sign up with a lastname that contains digits', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send({
          firstname,
          'lastname': '1111',
          email,
          password,
          gender,
          jobrole,
          department,
          address
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.keys('status', 'errors');
          expect(res.body.errors).to.have.keys('body');
          expect(res.body.errors.body.lastname).to.be.equal('lastname can only contain alphabets ex: Doe');
          done();
        });
    });
    it('Should return an error if a user tries to sign up with an invalid email', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send({
          firstname,
          lastname,
          'email': 'invalidteamwork.com',
          password,
          gender,
          jobrole,
          department,
          address
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.keys('status', 'errors');
          expect(res.body.errors).to.have.keys('body');
          expect(res.body.errors.body.email).to.be.equal('Not a valid email address like for example:some1@some.com');
          done();
        });
    });
    
    it('Should return an error if a user tries to sign up with a forged gender', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send({
          firstname,
          lastname,
          email,
          password,
          'gender': 'new gender',
          jobrole,
          department,
          address
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.keys('status', 'errors');
          expect(res.body.errors).to.have.keys('body');
          expect(res.body.errors.body.gender).to.be.equal('gender must be alphabets and can either be Male or Female');
          expect(res.body.errors).to.be.a('object');
          done();
        });
    });
    it('Should return an error if a user tries to sign up without department', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send({
          firstname,
          lastname,
          email,
          password,
          gender,
          jobrole,
          address
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.keys('status', 'errors');
          expect(res.body.errors).to.have.keys('body');
          expect(res.body.errors.body.department).to.be.equal('department is missing');
          expect(res.body.errors).to.be.a('object');
          done();
        });
    });
  })
  describe('POST api/v2/auth/signin', () => {
    it('Should successfully sign in a user and return a token', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.message).to.be.equal('User is successfully logged in');
          expect(res.body.data.token).to.be.a('string');
          done();
        });
    });
    it('Should return an error user tries to login with incorrect email or password', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send({
          'email': 'mmll@teamwork.com',
          'password': 'kdnadfklk',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body.status).to.be.equal(401);
          expect(res.body.error).to.be.equal('Wrong email and password combination');
          done();
        });
    });
  });
});
