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

- 코드 스플리팅 지원 <br>
  웹이 빠르게 동작하도록 하기 위해서 필요한 모듈만 원할 때 불러오게 하는 기능
- 최신 문법 적용
- 코드 난독화




# 3️⃣ Node.js & NPM

## Node.js

javascript 호스팅 환경

- javascript 를 읽고 실행할 수 있는 환경을 호스팅 환경이라고 함

<br>

호스팅 환경의 종류

- 웹 브라우저 (크롬, 사파리 등)
- Node.js

<br>

> Node.js 로 인해서 javascript를 브라우저 밖에서 실행할 수 있게 됨

<br>


example.js 스크립트 작성
```js
console.log('hi')
```
노드를 이용하여 스크립트 실행
```bash
$node example.js     
hi
```

<br>

## NPM

<br>

### NPM Node Package Manager

<br>

- javascript 로 만든 모듈을 라이브러리 또는 패키지라고 하는데
이를 관리해주는 프로그램을 NPM 이라 함.


<br>

### Node vs NPM


- node :  javascript 파일을 실행하는 환경
- NPM : javascript 로 만들어진 패키지를 관리하는 프로그램

<br>

### 프로젝트 시작

```bash
$npm init -y
```

<br>

- 위 명령어를 치고 나면 package.json에 프로젝트에 대한
정보가 담김

- npm 으로 패키지를 관리하지 않는다면 CDN 방식 사용 => 패키지 관리가 힘듦

<br>

### 패키지 설치

<br>
로컬 설치 <br>
로컬설치 경로는 해당 프로젝트 루트의 node_moduels

```bash
$npm i react
```
>패키지를 설치 후 정확한 버전 정보를 위해
package-lock.json 가 생성됨 <br>
package.json (version range 를 이용해 버전 명시) <br>
package-lock.json (정확한 버전 명시) 

<br>

전역 설치 <br>
전역 설치 경로는 /usr/local/lib/node_modules


```bash
$npm i react -g
```

<br>

### 전역 vs 로컬 설치

- 전역으로 설치하면 package.json 에 기록되지 않아 버전 관리가 용이하지 않고 패키지 재설치에 문제가 생김
- global 로 설치되기 때문에 프로젝트 별로 다른 버전을 사용하기 힘듦

<br>


### 의존성 종류

- dependencies
- devDependencies

-D 옵션을 이용해서 개발용으로 설치 가능 <br>
개발 옵션을 이용하면 build 했을 때 배포에서 제외 됨

<br>

### scripts

- 스크립트에 명령어를 축약해서 사용할 수 있는 기능이 있음

package.json
```json
"scripts": {
    "siwon" : "echo webpack study hahaha"
  },
```


```bash
$npm run siwon

> week1@1.0.0 siwon
> echo webpack study hahaha

webpack study hahaha
```

