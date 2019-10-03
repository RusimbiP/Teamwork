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
});
