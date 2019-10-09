import chai from 'chai';
import chaiHttp from 'chai-http';
import Helper from '../helpers/helper';
const { Tokenize } = Helper;
import app from '../app';
import { mockUser, mockArticle, unregisteredEmail } from '../db/mockData';

const { expect } = chai;
chai.use(chaiHttp);


describe('tests for comment and article endpoints', () => {
  let userToken;
  const invalid = 'eyJhbGciOiJIUz4230XBsb3llZUlkIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJjbWMiLCJXJ0bWVudCI6Im5ra24iLCJhZGRyZXNzIjoiS0cgMzQ0IFN0In0sImlhdCI6MTU3MDA2MTMxMywiZXhwIjoxNTcwNjY2MTEzfQ.lxPt4KGiDAan3U8PVdOK7eLRnIntGylHNgI14Mls7QY';
  const unregUser = Tokenize(unregisteredEmail);
    
  before((done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(mockUser)
      .end((err, res) => {
        console.log('loggggggggggggg');
        console.log(res.body);
        userToken  = res.body.data.token;
        done(err);
      });
  });

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
        .set('x-access-token', `${invalid}`)
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
