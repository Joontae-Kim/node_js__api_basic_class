# node.js REST API 강의 in 서울대

### 1. 노드JS의 기초
  - 브라우저 밖에서 자바스크립트 코드를 실행.
  - 크롬에서 사용하는 V8 엔진을 사용.
  - 이벤트 기반의 비동기 I/O 프레임웍크
    ![스크린샷 2018-04-19 오후 1.21.01](https://github.com/Joontae-Kim/node_js__api_basic_class/blob/master/assets/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202018-04-19%20%EC%98%A4%ED%9B%84%201.21.01.png)
        - 싱글 스레드 기반
        - 롱러닝 잡의 경우 워커에게 위임
        - 워커가 잡을 완료한 후 다시 이벤트 루프에게 전달
        - 이벤트 루프는 다시 클라에게 전달
    - [노드 개발자가 IO 작업을 시작하면 무슨일이 일어날까?](http://blog.jeonghwan.net/node/2017/01/27/node-io-deep.html)  - 김정환님 블로그
  - CommonJS를 구현한 모듈 시스템

  #### 1. 모듈 시스템
    - 브라우저에서는 윈도우 컨텍스트를 사용하거나, RequireJS 같
  은 의존성 로더를 사용함
      - 기본 모듈
      - 써드파티 모듈
      - 사용자 정의 모듈

  #### 2. 비동기 세계
    - NODE는 기본적으로 비동기 처리를 기본으로 동작함.
    - e.i)
      - readFileSync() - 동기 처리
        ```
          // test.txt
          테스트 파일입니다.
          // index.js
          const fs = require('fs')
          const file = fs.readFileSync('test.txt', {
           encoding: 'utf8'
          })
          console.log(file) // "테스트 파일입니다.
        ```
      - readFile() - 비동기 처리
         ```
          const fs = require('fs')
          const file = fs.readFile('test.txt', {
           encoding: 'utf8'
          }, (err, data) => console.log(file)) // "테스트 파일입니다."
         ```

  #### 3. Hello World 노드 버전

    ```
    onst http = require('http');

    const hostname = '127.0.0.1';
    const port = 3000;

    // 서버객체 생성
    const server = http.createServer((req, res) => {
      console.log('req.url ==> ', req.url);
      if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
      } else if (req.url === '/users') {
        const users = [
          {name: 'Alice'},
          {name: 'Beck'}
        ]
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(JSON.stringify(users));
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
      }
    });

    // 서버구동 상태
    // 역시 비동기 처리
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
    ```

  - 생성한 서버에 클라이언트 요청을 보내보자.
  `curl localhost:3000`

  - 클라이언트의 요청 형식을 보자.
    `curl localhost:3000/${path} -v`
    - 응답

    ```*   Trying ::1...
    * TCP_NODELAY set
    * Connection failed
    * connect to ::1 port 3000 failed: Connection refused
    *   Trying 127.0.0.1...
    * TCP_NODELAY set
    * Connected to localhost (127.0.0.1) port 3000 (#0)
    > GET /users HTTP/1.1
    > Host: localhost:3000
    > User-Agent: curl/7.55.1
    > Accept: */*
    >
    < HTTP/1.1 200 OK
    < Content-Type: text/plain
    < Date: Thu, 19 Apr 2018 05:18:51 GMT
    < Connection: keep-alive
    < Content-Length: 34
    <
    * Connection #0 to host localhost left intact
    ```

### 5. 익스프레스JS 기초
 #### 1.  어플리케이션
  -  익스프레스 인스턴스를 어플리케이션이라 한다.
 #### 2. 미들웨어
  - 에러 미들웨어
 #### 3. 라우팅
 #### 4. 응답 객체
  - 응답(Response)객체: 클라이언트 응답 정보를 담은 객체
  - http 모듈의 response 객체를 래핑한 것이다
  - `res.send, status, json 메소드를 주로 사용`
 #### 4. HTTP 요청
  - 모든 자원(서버에 있는 것들, =리소스)은 명사로 식별
    - GET /users
    - GET /users/{id}
 #### 5. HTTP 메소드
  - GET, POST, PUT, DELETE 등
    - GET: 자원을 조회
    - POST: 자원을 생성
    - PUT: 자원을 갱신
    - DELETE: 자원을 삭제
 #### 6. HTTP 상태코드
  ![스크린샷 2018-04-19 오후 3.12.49](https://github.com/Joontae-Kim/node_js__api_basic_class/blob/master/assets/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202018-04-19%20%EC%98%A4%ED%9B%84%203.12.49.png)
 #### 7. 첫 API 만들기
  - `npm init`으로 프로젝트 생성
  - 프로젝트의 버전과 작성자 그리고 의존성 라이브러리 등의 정보를 담은 `package.json` 생성
  - GET /users
  ```
  const express = require('express');
  const sys = require('util');
  const logger = require('morgan');
  const app = express();
  const users = [
    {name: 'Alice'},
    {name: 'Pelice'}
  ]; //todo

  app.use(logger('dev'))

  app.get('/', (req, res) => res.send('Hello World!'))
  app.get('/users', (req, res) => {
    res.json(users)
  })

  app.listen(3000, () => console.log('running'))
  ```

 #### 8. 테스트 주도 개발
  - 테스트 코드를 만들고, api 코드를 개발하는 방식이 생산성 측면에서 시간이 지날수록 훨씬 개선된다.
  - TDD로 개발하자!
  - TDD 관련 라이브러리 - `mocha, should, superTest`

 #### 9. [Mocha](https://mochajs.org/)
  - 테스트 코드를 돌려주는 테스트 러너
  - 테스트 꾸러미: 테스트 환경으로 모카에서는 describe()으로 구현
  - 테스트 케이스: 실제 테스트를 말하며 모카에서는 it()으로 구현

  #### 10. [should](https://shouldjs.github.io/)
   - 검증(assertion) 라이브러리

  #### 11. [supertest](https://github.com/visionmedia/supertest)
   - 단위 테스트: 함수의 기능 테스트
   - 통합 테스트: API의 기능 테스트
   - 슈퍼 테스트는 익스프레스 통합 테스트용 라이브러리다
      ```
      const assert = require('assert');
      const should = require('should');
      const request = require('supertest');

      const app = require('./index');

      describe('GET /users', function() {
        it('배열을 반환.', (done) => {
          request(app)
            .get('/users')
            .end((err, res) => {
              // if (err) throw err
              // console.log(res.body)
              res.body.should.be.instanceof(Array)
              res.body.forEach(user => {
                user.should.have.property('name')
              })
              done()
            });
        });
      });
      ```
  #### 12. 첫 API 테스트 만들기
  - API 스펙
    ![스크린샷 2018-04-19 오후 3.45.48](https://github.com/Joontae-Kim/node_js__api_basic_class/blob/master/assets/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202018-04-19%20%EC%98%A4%ED%9B%84%203.45.48.png)
  - 예제 코드
  ```
  app.get('/users', (req, res) => {
    let limit = parseInt(req.query.limit || 10, 10)
    return res.json(users.slice(0, limit))
  })
  ```
