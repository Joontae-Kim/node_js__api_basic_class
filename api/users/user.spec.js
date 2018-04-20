const assert = require('assert')
const should = require('should')
const request = require('supertest')
const app = require('../../index')

describe('GET /users', function() {

  describe('성공', function() {
    it('배열을 반환.', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          // if (err) throw err
          // else console.log(res.body)
          res.body.should.be.instanceof(Array)
          res.body.forEach(user => {
            user.should.have.property('name')
          })
          done()
        })
    })
  })
  describe('실패', function() {
    it('limit이 정수 != res.status(400)', function(done) {
      request(app)
        .get('/users/?limit=a')
        .expect(400)
        .end(done)
    });
  })
});

describe('GET /users/:id', function() {
  describe('성공', function() {
    it('유저 객체를 반환.', (done) => {
      request(app)
        .get('/users/1')
        .end((err, res) => {
          res.body.should.be.instanceof(Object)
          res.body.should.have.property('id',1)
          done()
        })
    })
  })

  describe('실패', function() {
    it('id 가 정수가 아닌경우 400 응답.', (done) => {
      request(app)
        .get('/users/one')
        .expect(400)
        .end(done)
    })

    it('찾을 수 없는 id일 경우 404 응답.', (done) => {
      request(app)
        .get('/users/9')
        .expect(404)
        .end(done)
    })
  })
});

describe('DELETE /users/:id', function() {
  describe('유저 객체삭제 성공', function() {
    it('204 응답.', (done) => {
      request(app)
        .delete('/users/3')
        .expect(204)
        .end((err, res) => {
          res.body.should.have.not.property('id',3)
          done()
        })
    })
  })

  describe('실패', function() {
    it('id 가 정수가 아닌경우 400 응답.', (done) => {
      request(app)
        .delete('/users/one')
        .expect(400)
        .end(done)
    })

    it('찾을 수 없는 id일 경우 404 응답.', (done) => {
      request(app)
        .get('/users/9')
        .expect(404)
        .end(done)
    })
  })
});

describe('POST /users', function() {
  describe('유저 객체삭제 성공', function() {
    it('201 응답.', (done) => {
      request(app)
        .post('/users')
        .send({name: 'Daniel'})
        .expect(201)
        .end((err, res) => {
          console.log(res.body);
          res.body.should.have.property('name', 'Daniel')
          done()
        })
    })
  })

  describe('실패', function() {
    it('name이 없으면 400 응답', (done) => {
      request(app)
        .post('/users')
        .send({})
        .expect(400)
        .end(done)
    })

    it('name이 중복이면 409 응답', (done) => {
      request(app)
        .post('/users')
        .send({name: 'Alice'})
        .expect(409)
        .end(done)
    })
  })
});
