import * as chai from 'chai';
import supertest from 'supertest';
import app from '../app';
import { sequelize } from '../config/database';

const expect = chai.expect;
const request = supertest(app);

describe('API Endpoints', () => {
  // Re-create the test database
  before(async () => {
    await sequelize.sync({ force: true });
  });

  // Final cleanup by closing the connection
  after(() => {
    return sequelize.close();
  });

  let productAdded: number;

  it('should add a product as an admin', (done) => {
    request
      .post('/api/admin/products/add')
      .send({ name: 'Product A', description: 'Great', price: 10 })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        productAdded = res.body.id;
        done();
      });
  });

  it('should update a product as an admin', (done) => {
    const origName = 'Product A';
    const updatedDesc = 'Average';
    const updatedPrice = 8.5;
    request
      .put('/api/admin/products/update/'+productAdded)
      .send({ name: origName, description: updatedDesc, price: updatedPrice})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id').equal(productAdded);
        expect(res.body).to.have.property('name').equal(origName);
        expect(res.body).to.have.property('description').equal(updatedDesc);
        expect(res.body).to.have.property('price').equal(updatedPrice);
        done();
      });
  });

  it('should view the list of products as an admin', (done) => {
    request
      .get('/api/admin/products')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        chai.assert.lengthOf(res.body, 1);
        chai.assert.isTrue(res.body.some((product: { id: number; }) => product.id == productAdded));
        done();
      });
  });

  it('should remove a product as an admin', (done) => {
    request
      .delete('/api/admin/products/delete/'+productAdded)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
  });

});
