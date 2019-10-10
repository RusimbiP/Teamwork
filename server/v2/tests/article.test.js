import chai from 'chai';
import chaiHttp from 'chai-http';
import Helper from '../helpers/helper';
const { Tokenize } = Helper;
import app from '../app';
import {
   mockUser, newUser, invalidToken, userToken, unRegUser, mockArticle, unregisteredEmail
   } from '../db/mockData';


const { expect } = chai;
chai.use(chaiHttp);


describe('tests for comment and article endpoints', () => {
  describe(' POST ap1/v2/articles', () => {
    it('should successfully create a new article if valid details are provided', (done) => {
      chai
        .request(app)
        .post('/api/v2/articles')
        .set('x-access-token', `${userToken}`)
        .send(mockArticle)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body.message).to.be.equal('Article successfully created');
          expect(res.body).to.be.an('object');
          done(err);
        });
    });

    /** *Test Defaults */
    it('should set to defaults if title or subtitle is not provided', (done) => {
      chai
        .request(app)
        .post('/api/v2/articles')
        .set('x-access-token', `${userToken}`)
        .send(mockArticle)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body.message).to.be.equal('Article successfully created');
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys(
            'status',
            'message',
            'data',
          );
          expect(res.body.data).to.be.an('object');
          done(err);
        });
    });

    it('should not create an article if token is not provided', (done) => {
      chai
        .request(app)
        .post('/api/v2/articles')
        .set('x-access-token', '')
        .send(mockArticle)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.be.equal(401);
          expect(res.body.error).to.be.equal('No token provided.');
          expect(res.body).to.be.an('object');
          done(err);
        });
    });

    it('should not create an article if token is invalid', (done) => {
      chai
        .request(app)
        .post('/api/v2/articles')
        .set('x-access-token', `${invalidToken}`)
        .send(mockArticle)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.be.equal(401);
          expect(res.body.error).to.be.equal('Invalid token!');
          expect(res.body).to.be.an('object');
          done(err);
        });
    });

     it('should not create an article if the user is not registered', (done) => {
       chai
         .request(app)
         .post('/api/v2/articles')
         .set('x-access-token', `${unRegUser}`)
         .send(mockArticle)
         .end((err, res) => {
           expect(res).to.have.status(403);
           expect(res.body.status).to.be.equal(403);
           expect(res.body.error).to.be.equal('You need to be registered to perform this action');
           expect(res.body).to.be.an('object');
           done(err);
         });
     });
     
  describe(' PATCH ap1/v2/articles/:articleid', () => {
     it('should not update an article if it is non-existing', (done) => {
      chai
        .request(app)
        .patch('/api/v2/articles/100')
        .set('x-access-token', `${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.be.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys(
            'status',
            'error'
          );
          expect(res.body.error).to.be.equal('You have not created such article');
          done(err);
        });
    });


    it('should update an article all fields are provided', (done) => {
      chai
        .request(app)
        .patch('/api/v2/articles/1')
        .set('x-access-token', `${userToken}`)
        .send(mockArticle)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('object');
          expect(res.body).to.have.keys(
            'status',
            'data'
          );
          done(err);
        });
    });

    it('should maintain data of an article nothing is provided', (done) => {
      chai
        .request(app)
        .patch('/api/v2/articles/1')
        .set('x-access-token', `${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('object');
          expect(res.body).to.have.keys(
            'status',
            'data'
          );
          done(err);
        });
    });
  });
});
});
