# 1️⃣ 웹팩

### 모듈 module
- 특정 기능을 가진 프로그래밍 단위

<br>

### 모듈 표현 세 가지 방식

- AMD (deprecated)
- CommonJS
  ```js
  const moduleExample = require('module-library')
  ```
- ECMA6
  ```js
  import react from 'react';
  ```

<br>

### 모듈 번들러 module bundler

- 모듈을 모아주는 역할 (Bundling), 번들링 = 빌드 = 변환
- 묶어 만든 결과물을 알아보기 힘들게 만듦 (Uglyfy)
- 최신 문법 지원하도록 자동 변환 (Transpile) 

<br>



### 모듈 번들러의 종류
- webpack (복잡한 프로젝트)
- Browserify (Hashing 에 유리)
- Rollup (최소한 서드파티)
- Parcel (가벼운 프로젝트에 사용)

> webpack, parcel 을 주로 사용

<br>
<br>

# 2️⃣ 왜 쓰는가

- 웹 페이지가 복잡해지면서 모듈도 복잡해지고 모듈 번들러가 필요하게 됨

- 웹을 구성하는 모든 자원을 모듈로 취급<br>
HTML, CSS, Javascirpt, Image 등 여러 자원을 모두 모듈로 취급하기 때문에 모듈 번들러의 필요성이 더욱 부각 됨

<br>

- 코드 스플리팅 지원 <br>
  웹이 빠르게 동작하도록 하기 위해서 필요한 모듈만 원할 때 불러오게 하는 기능



# 3️⃣ Node.js & NPM

## Node.js

## NPM



