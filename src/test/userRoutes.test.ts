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
  let productAddedToCart: number;

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

  it('should add a product to the user\'s cart', (done) => {
    request
      .post('/api/user/cart/add')
      .send({ productId: productAdded, quantity: 2 })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('productId').equal(productAdded);
        expect(res.body).to.have.property('quantity').equal(2);
        productAddedToCart = res.body.id;
        done();
      });
  });

  it('should update a product in the user\'s cart', (done) => {
    request
      .put('/api/user/cart/update/'+productAddedToCart)
      .send({ quantity: 3 })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('productId').to.equal(productAdded);
        expect(res.body).to.have.property('quantity').to.equal(3);
        done();
      });
  });

  it('should remove a product from the user\'s cart', (done) => {
    request
      .delete('/api/user/cart/delete/'+productAddedToCart)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
  });

  it('should view the user\'s cart', (done) => {
    request
      .get('/api/user/cart/view')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        //Check cart has 0 items
        chai.assert.lengthOf(res.body, 0);
        done();
      });
  });

  it('should get the total price of the user\'s cart', (done) => {
    request
      .get('/api/user/cart/totalPrice')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('totalPrice').to.equal(0);
        done();
      });
  });

  it('should get the list of available products', (done) => {
    request
      .get('/api/user/products')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        chai.assert.lengthOf(res.body, 1);
        chai.assert.isTrue(res.body.some((product: { id: number; }) => product.id == productAdded));
        done();
      });
  });
});