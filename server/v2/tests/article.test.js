import chai from 'chai';
import chaiHttp from 'chai-http';
import Helper from '../helpers/helper';
const { Tokenize } = Helper;
import app from '../app';
import { mockUser, newUser, invalidToken, mockArticle, unregisteredEmail } from '../db/mockData';


const { expect } = chai;
chai.use(chaiHttp);


describe('tests for comment and article endpoints', () => {
  let userToken = Tokenize(mockUser.email);
  
  const unregUser = Tokenize(unregisteredEmail);

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
         .set('x-access-token', `${unregUser }`)
         .send(mockArticle)
         .end((err, res) => {
           expect(res).to.have.status(403);
           expect(res.body.status).to.be.equal(403);
           expect(res.body.error).to.be.equal('You need to be registered to perform this action');
           expect(res.body).to.be.an('object');
           done(err);
         });
     });
  });
});
