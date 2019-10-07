import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);
const should = chai.should();
const {expect} = chai;

describe('Test index.js', () => {
  describe('Test welcome route', () => {
    it('it should send a welcoming word', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
  });

  it('should return error when route is not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/notfound')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.be.equal('Oh! snap! There is not such a page. Double check your url.');
        done(err);
      });
  });
});
