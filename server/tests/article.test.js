import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const data = {
  'title': 'This is a title',
  'subtitle': 'This subtitle',
  article: 'This is a body. As i am writing this, a new Javascript framwork is being rolled out',
};

describe('tests for all article endpoints', () => {
  let userToken;
  const unregistered = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjp7ImlkIjoyLCJmaXJzdE5hbWUiOiJSdXNpbWJpIiwibGFzdE5hbWUiOiJQYXRyaWNLIiwiZW1haWwiOiJuZXh0MUB0ZWFtd29yay5jb20iLCJwYXNzd29yZCI6IiQyYiQwOCRLSHFreUVRWU5DS29vcXdybTg2RndPYUpCVWhYbmwwS0x4Rlc1TEt6ZTc2RmpQdU4wb2U2aSIsImdlbmRlciI6Im1hbGUiLCJqb2Jyb2xlIjoia2tra2tra2tra2tra2tra2trayIsImRlcGFydG1lbnQiOiJua2tuIiwiYWRkcmVzcyI6IktHMzQ0U3QifSwiaWF0IjoxNTcwMDkzMjI1fQ.rKJyNatWtyruKkGQBBKTjZFe2wZgKmXVD8wvDotogn0';
  const invalid = 'eyJhbGciOiJIUz4230[74902350I1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJjbWMiLCJXJ0bWVudCI6Im5ra24iLCJhZGRyZXNzIjoiS0cgMzQ0IFN0In0sImlhdCI6MTU3MDA2MTMxMywiZXhwIjoxNTcwNjY2MTEzfQ.lxPt4KGiDAan3U8PVdOK7eLRnIntGylHNgI14Mls7QY';

  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'taken@teamwork.com',
        password: 'password',
      })
      .end((err, res) => {
        const { token } = res.body.data;
        userToken = token;
        done(err);
      });
  });

  describe(' POST ap1/v1/articles', () => {
    it('should succesfully create a new article if valid details are provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('x-access-token', `${userToken}`)
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body.message).to.be.equal('Article succesfully created');
          expect(res.body).to.be.an('object');
          done(err);
        });
    });

    /** *Test Defaults */
    it('should set to defaults if title or subtitle is not provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('x-access-token', `${userToken}`)
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body.message).to.be.equal('Article succesfully created');
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys(
            'status',
            'message',
            'data',
          );
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.keys(
            'id',
            'owner',
            'title',
            'subtitle',
            'article',
            'createdOn',
          );
          done(err);
        });
    });

    it('should not create an article if token is not provided', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('x-access-token', '')
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.status).to.be.equal(403);
          expect(res.body.error).to.be.equal('No token provided.');
          expect(res.body).to.be.an('object');
          done(err);
        });
    });

    it('should not create an article if token is invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('x-access-token', `${invalid}`)
        .send(data)
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
        .post('/api/v1/articles')
        .set('x-access-token', `${unregistered}`)
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.status).to.be.equal(403);
          expect(res.body.error).to.be.equal('You can only create an article with your registered email!');
          expect(res.body).to.be.an('object');
          done(err);
        });
    });

  });
});
