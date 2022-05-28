## 1주차

---

### 웹팩이란?
프런트엔드 프레임워크에서 가장 많이 사용되는 모듈 번들러

### 모듈 번들러란?
html,css,js 등 웹페이지를 구성하는 자원들을 각각의 모듈로 보고 병합한 후 하나의 결과물로 만드는 도구

### 모듈이란?
프로그래밍 관점에서 특정 기능을 갖는 작은 코드 단위
#### -> 성격이 비슷한 함수들을 하나의 js 파일로 만들면 모듈이 됨!

### 웹팩 모듈이란?
웹 어플리케이션을 구성하는 모든 자원들(html,css,js..)

### 모듈 번들링이란?
웹 애플리케이션을 구성하는 몇십, 몇백개의 자원들을 하나의 파일로 병합 및 압축 (번들링 = 변환 = 빌드)


---
### 웹팩의 등장 배경

**1. 파일 단위의 자바스크립트 모듈 관리**

자바스크립트는 최대한 넓은 범위를 지원하므로 다른 파일에서 중복된 변수를 선언하면서 의도치 않은 값 할당

**2. 웹 개발 작업 자동화**

웹 서비스를 배포할 때 html,css,js,image 파일등을 압축하는 일들을 자동화 해주는 도구

**3. 웹 애플리케이션의 빠른 로딩 속도와 높은 성능**

사용자의 접근성을 높이기 위해 로딩 속도 높이고 있음
-> 파일을 압축하고 병합해서 서버로 요청하는 파일 개수 줄임

`Lazy loading` -> 그 때 그 때 필요한 파일들만 요청함

### 웹팩을 통해 해결하고자 하는 문제

**1. 자바스크립트 변수 유효범위 문제**

 ES6의 Modules 문법과 웹팩의 모듈 번들링으로 해결

**2. 브라우저별 HTTP 요청 숫자의 제약**

HTTP 요청 숫자를 줄이는 것 =  웹 애플리케이션의 성능을 높임 사이트를 조작하는 시간을 앞당김 -> 웹팩을 통해 파일을 압축 병합하면 파일의 숫자 줄어듬 

**3. Dynamic Loading & Lazy Loading 미지원**

웹팩의 `Code Splitting` 기능을 이용하여 원하는 모듈을 원하는 타이밍에 로딩

**4. 사용하지 않는 코드의 관리**

---

### Node.js

 자바스크립트를 브라우저 밖에서도 실행

`node app.js ` 입력하면 app.js가 그대로 실행됨

### NPM 

NPM(Node Package Manager)는 명령어로 자바스크립트 라이브러리를 설치하고 관리할 수 있는 패키지 매니저

npm 명령어로 쉽게 라이브러리 설치 가능!

### NPM 초기화

```bash 
npm init -y
```
위의 명령어를 실행하면 NPM 패키지 파일 `package.json` 파일이 생성
```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
### NPM 지역 설치
 
`init`를 통해 초기화를 하고 `package.json`을 생성하면 `npm install` 로 자바스크립트 라이브러리 설치 가능

```bash
npm install jquery --save-prod
or
npm i jquery
```
라이브러리 설치하면 `node_modules` 파일이 만들어지고 이 폴더 아래에 라이브러리 파일들이 만들어짐

### NPM 전역 설치

프로젝트가 아닌 시스템 레벨에서 사용할 자바스크립트 라이브러리 설치 

```bash
npm install gulp --global
or 
npm install gulp -g
```
전역 설치한 후 다음과 같은 경로에 만들어짐
```bash 
# window
%USERPROFILE%\AppData\Roaming\npm\node_modules

# mac
/usr/local/lib/node_modules
```

### NPM 지역 설치 명령어 옵션

```bash
npm install jquery --save-prod
npm install jquery --save-dev
//축약

npm i jquery
npm i jquery -D
```
1. `npm i jquery`

depedndencies에 등록됨
```json
// package.json
{
  "dependencies": {
    "jquery": "^3.4.1"
  }
}
```
2. `npm i jquery -D`

devDependencies에 등록됨

```json
// package.json
{
  "devDependencies": {
    "jquery": "^3.4.1"
  }
}
```
### 배포용(dependencies) 개발용(devDependencies)

NPM 지역 설치를 할 때에는 배포용 인지 개발용인지 구분

ex> `jquery` // 화면 로직과 관련되어있으므로 배포용으로 설치

```bash
npm i jquery
```
```json
// package.json
{
  "dependencies": {
    "jquery": "^3.4.1"
  }
}
```

배포용 라이브러리는 `npm run build` 를 통해 **최종 코드에 포함됨**

`-D` 옵션으로 개발용으로 설치하게 되면 **최종 코드에 포함되지 않음**

개발할 때만 사용하고 배포할 때는 빠져도 좋은 라이브러리(-D 옵션으로 설치하자)
- webpack : 빌드 도구

- eslint : 코드 문법 검사 도구

- imagemin : 이미지 압축 도구

### NPM 커스텀 명령어

`package.json` 파일에 `script` 속성에 다음을 추가하고

```json
 package.json
{
  ...
  "scripts": {
    "hello": "echo hi"
  }
}
```
아래 명령어를 실행하면 hi가 출력됨
```bash
npm run hello
```
**ex1) 커스텀 명령어 적용**

아래와 같이 script에 추가해주고

```json
"scripts": {
  "dev": "node server.js",
  "build": "webpack --mode=none",
}
```
`npm run dev` 또는 `num run build` 만 하면 바로 실행할 수 있쥬

**ex2) 커스텀 명령어 적용**

아래와 같이 script에 추가하고
```json
"scripts": {
  "build": "webpack",
  "deploy": "npm run build -- --mode production"
}
```
 `npm run deploy` 해주면 `build`로 `webpack` 를 실행한 후 `mode` 에 `production` 값을 넘겨준다.