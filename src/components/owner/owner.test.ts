import {describe} from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {server} from "../../server";

chai.use(chaiHttp);
const should = chai.should();


describe('/GET owners', () => {
  it('get all owners', (done) => {
    chai.request(server)
      .get('/owners')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });
});
