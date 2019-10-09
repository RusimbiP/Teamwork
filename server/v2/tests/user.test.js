import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';

import { mockUser, newUser } from '../db/mockData';


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
          'lastname': 'PatricK',
          'email': 'taken@teamwork.com',
          'password': 'password',
          'gender': 'male',
          'jobRole': 'kkkkkkkkkkkkkkkkkkk',
          'department': 'nkkn',
          'address': 'KG 344 St'
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
          'lastname': 'Patrick',
          'email': 'taken@teamwork.com',
          'password': 'password',
          'gender': 'male',
          'jobRole': 'kkkkkkkkkkkkkkkkkkk',
          'department': 'nkkn',
          'address': 'KG 344 St'
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
          'firstname': 'Patrick',
          'email': 'taken@teamwork.com',
          'password': 'password',
          'gender': 'male',
          'jobRole': 'kkkkkkkkkkkkkkkkkkk',
          'department': 'nkkn',
          'address': 'KG 344 St'
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
          'firstname': 'Patrick',
          'lastname': '1111',
          'email': 'taken@teamwork.com',
          'password': 'password',
          'gender': 'male',
          'jobRole': 'kkkkkkkkkkkkkkkkkkk',
          'department': 'nkkn',
          'address': 'KG 344 St'
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
          'firstname': 'Patrick',
          'lastname': 'Apps',
          'email': 'invalidteamwork.com',
          'password': 'password',
          'gender': 'male',
          'jobRole': 'kkkkkkkkkkkkkkkkkkk',
          'department': 'nkkn',
          'address': 'KG 344 St'
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
          'firstname': 'Patrick',
          'lastname': 'Apps',
          'email': 'valid@teamwork.com',
          'password': '1234567',
          'gender': 'new gender',
          'jobRole': 'kkkkkkkkkkkkkkkkkkk',
          'department': 'nkkn',
          'address': 'KG 344 St'
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
          'firstname': 'Patrick',
          'lastname': 'Apps',
          'email': 'valid@teamwork.com',
          'password': '1234567',
          'gender': 'male',
          'address': 'KG 344 St'
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
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal('Wrong email and password combination');
          done();
        });
    });
  });
  })
});
