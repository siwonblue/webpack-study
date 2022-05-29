# 1주차 스터디

## 1. Webpack

### 모듈이란

프로그래밍 관점에서 특정 기능을 가지는 작은 코드 단위

```jsx
function sum(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

const pi = 3.14;

export { sum, substract, pi };
```

1. 두 수의 합을 구하는 `sum`
2. 두 수의 차를 구하는 `substract`
3. 원주율 상수 `pi`

→ 비슷한 기능들을 하나의 의미있는 파일로 관리하는 것이 모듈!

<br>

### Webpack에서의 모듈

웹 어플리케이션을 구성하는 모든 자원을 의미

→ HTML, CSS, JavaScript, Image, Font 등의 파일 하나하나가 모두 모듈

<br>

### 모듈 번들링이란

웹 어플리케이션을 구성하는 수많은 자원들을 하나의 파일로 병합 및 압축해주는 동작

> 빌드 = 번들링 = 변환

<br>

## 2. Motivation

### Webpack의 등장 배경

**1. 파일 단위의 자바스크립트 모듈 관리**

```html
<!-- index.html -->
<html>
  <head>
    <script src="./src/hello.js"></script>
    <script src="./src/world.js"></script>
  </head>
  <body>
    <h1>WEBPACK</h1>
    <div id="root"></div>
    <script>
      document.querySelector("#root").innerHTML = word;
    </script>
  </body>
</html>
```

```jsx
/* src/hello.js */
var word = "hello";
```

```jsx
/* src/world.js */
var word = "world";
```

`hello.js`와 `world.js`에서 word 변수를 중복으로 선언했기 때문에 덮어쓰기 됨 (원하는 작동이 발생하지 않을 수 있음)

→ 파일 단위로 변수를 관리하고자하는 욕구

**2. 웹 개발 작업 자동화 도구**

- 프론트엔드 개발 업무를 할 때 텍스트 편집기에서 코드를 수정한 후 브라우저에서 새로고침 필요
- HTML, CSS, JavaScript 압축
- 이미지 압축
- CSS 전처리기 변환

→ 자동화 도구 필요

**3. 웹 어플리케이션의 빠른 로딩 속도와 높은 성능**

대부분의 사용자들은 5초 이내로 웹 사이트가 표시되지 않으면 집중력을 잃음

→ 로딩 속도를 높이기 위해 브러우저에서 서버로 요청하는 파일 숫자를 줄이기

<br>

### Webpack으로 해결하려는 문제

1. 자바스크립트 변수 유효 범위

   ES6의 Modules 문법과 웹팩의 모듈 번들링으로 해결

2. 브라우저별 HTTP 요청 숫자의 제약

   익스플로어 10은 최대 연결 횟수 8, 크롬은 최대 연결 횟수 6 등 TCP 스펙에 따라 브라우저에서 한 번에 서버로 보낼 수 있는 HTTP 요청 숫자가 제약

   → HTTP 요청 숫자를 줄여 웹 어플리케이션의 성능을 높이고 사용자가 사이트를 조작할 시간을 앞당겨줄 필요

3. 사용하지 않는 코드의 관리
4. Dynamic Loading & Lazy Loading 미지원

   `Require.js`와 같은 라이브러리를 쓰지 않으면 동적으로 모듈을 로딩할 수 없음

   → 웹팩의 Code Splitting 기능으로 원하는 모듈을 원하는 타이밍에 로딩!

<br>

## 3. Node.js와 NPM

### Node.js

브라우저 밖에서도 자바스크립트를 실행할 수 있는 환경

<br>

### NPM (Node Package Manager)

명령어로 자바스크립트 라이브러리를 설치하고 관리할 수 있는 패키지 매니저

전 세계의 자바스크립트 개발자들이 자바스크립트 라이브러리를 공개된 저장소에 올려놓고 npm 명령어로 편하게 다운받을 수 있음

> Node.js를 설치하면 NPM도 같이 설치됨!

**NPM 시작하기**

```bash
npm init -y
```

명령어가 실행되면 `package.json` 파일이 생성

```json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

> scripts, dependencies, devDependencies가 많이 사용되는 속성!

<br>

### NPM 설치 명령어

npm init으로 package.json 파일을 생성하고 나면 프로젝트에서 사용할 자바스크립트 라이브러리 설치

```bash
npm install jquery
npm i jquery
```

→ node_modules라는 폴더 내에 지역 설치가 완료

**NPM 전역 설치**

프로젝트에서 사용할 라이브러리가 아니라 시스템 레벨에서 사용할 자바스크립트 라이브러리를 설치할 때 사용

```bash
npm install gulp --global
npm install gulp -g
```

→ 명령어 실행창에서 설치된 라이브러리 명령어를 인식

```bash
# window
%USERPROFILE%\AppData\Roaming\npm\node_modules

# mac
/usr/local/lib/node_modules
```

전역 설치된 자바스크립트 라이브러리는 위 경로에 설치!

**NPM 지역 설치 옵션 2가지**

```bash
npm install webpack --save-prod
npm install webpack

npm install webpack --save-dev
npm install webpack -D
```

설치 옵션을 주지 않은 명령은(`npm install webpack` or `npm install webpack —-save-prod`) package.json의 dependencies에 등록

```json
// package.json
{
  "dependencies": {
    "webpack": "^5.72.1"
  }
}
```

설치 옵션을 dev로 준 명령은(`npm install webpack -D` or n`pm install webpack —-save-dev`) package.json의 dependencies에 등록

```json
// package.json
{
  "devDependencies": {
    "webpack": "^5.72.1"
  }
}
```

**개발용 라이브러리와 배포용 라이브러리 구분하기**

npm 지역 설치를 할 때 해당 라이브러리가 배포용(dependencies)인지 개발용(devDependencies)인지 구분 필요!

→ 개발용 라이브러리와 달리 배포용 라이브러리는 npm run build로 빌드하면 최종 어플리케이션 코드 안에 포함

<br>

### NPM 커스텀 명령어

사용자가 임의로 명령어의 이름과 동작을 정의해서 사용할 수 있음

```json
// package.json
{
  ...
  "scripts": {
    "hello": "echo hello"
  }
}
```

```bash
npm run hello
```

→ 콘솔에 hello가 출력

> `npm run [커스텀 명령어]` 형식으로 실행

**NPM 커스텀 명령어 사례**

웹팩, Node.js 등을 사용할 때 유용

```json
// package.json
{
	...
	"scripts": {
	  "dev": "node server.js",
	  "build": "webpack --mode=none",
	}
}
```

`node server.js`와 `webpack —-mode=none`을 대신해서 `npm run dev`와 `npm run build`를 입력하면 됨!

```json
// package.json
{
	...
	"scripts": {
	  "build": "webpack",
	  "deploy": "npm run build -- --mode production"
	}
}
```

다른 커스텀 명령어(`npm run build`)도 조합해서 사용 가능
