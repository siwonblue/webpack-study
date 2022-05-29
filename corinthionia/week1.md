인프런 [캡틴판교 - 프론트엔드 개발자를 위한 웹팩](https://www.inflearn.com/course/%ED%94%84%EB%9F%B0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%9B%B9%ED%8C%A9/) 강의를 듣고 정리한 내용입니다.

---

## 0. Webpack

### 웹팩이란?

프론트엔드 프레임워크에서 가장 많이 사용되는 모듈 번들러

### 모듈

프로그래밍 관점에서 특정 기능을 가지는 작은 코드 단위

### 웹팩에서의 모듈

웹팩에서의 모듈은 자바스크립트 모듈에만 국한되지 않고 웹 어플리케이션을 구성하는 모든 자월을 의미한다. 어플리케이션 제작에 필요한 모든 파일들이 각각 모듈에 해당한다.

### 모듈 번들링

웹 어플리케이션을 구성하는 여러 자원들을 하나의 파일로 병합 및 압축해 주는 동작
빌드, 번들링, 변환은 모두 같은 의미이다.

### 웹팩의 등장 배경

**1) 파일 단위의 자바스크립트 모듈 관리의 필요성**
변수를 중복 선언하거나 의도치 않은 값을 할당하는 문제가 발생할 수 있기 때문

**2) 웹 개발 작업 자동화 도구 (Web Task Manager)**
웹 서버에 배포할 때 <HTML, CSS, JS 압축 / 이미지 압축 / CSS 전처리기 변환> 등의 일을 자동화해 주는 도구의 필요성 증가 ➡️ `Grunt`, `Gulp` 등장

**3) 웹 어플리케이션의 빠른 로딩 속도와 높은 성능**
웹 사이트의 로딩 속도를 높이기 위해 처음에는 웹 태스크 매니저 또는 Lazy Loading을 활용했다. 웹팩은 필요할 때에 해당 자원을 요청하자는 철학을 가지고 있다.

### 웹팩으로 해결하려는 문제

**1) 자바스크립트 변수 유효 범위 문제**
ES6의 Modules 문법과 웹팩의 모듈 번들링으로 해결한다.

**2) 브라우저별 HTTP 요청 숫자의 제약**
브라우저에서 서버로 보낼 수 있는 HTTP 요청 수가 제한되어 있기 때문에 요청 숫자를 줄이는 것이 성능 향상 면에서나 사용자 측에서나 중요한 문제로 떠올랐다.
➡️ 웹팩을 이용하여 여러 개의 파일을 하나로 합치면 브라우저별 HTTP 요청 횟수 제약을 피할 수 있다.

**3) 사용하지 않는 코드의 관리**

**4) Dynamic Loading & Lazy Loading 미지원**
웹팩의 `Code Splitting` 기능을 이용해 원하는 모듈을 원하는 타이밍에 로딩할 수 있다.

---

## 1. Node.js와 NPM

### Node.js와 npm 소개

Node.js: JavaScript 실행 환경
npm: 자바스크립트 라이브러리를 관리해 주는 도구

### npm 초기화 명령어 - init

```bash
npm init -y
```

위 명령어를 실행하면 `package.json` 파일이 생성되고 기본값을 바로 넣어 줌

### npm 설치 명령어 - install

```bash
npm install jquery
```

`node_modules` 폴더가 생성되고, 그 안에 `jquery` 폴더도 만들어짐

### npm을 사용하는 이유와 장점1

라이브러리를 코드 중간에 삽입하는 경우, 어떤 라이브러리가 설치되어 있는지 알기 위해서는 모든 `<script>` 태그를 찾아봐야 한다는 불편함이 있다.

➡️ `package.json`을 사용하면 라이브러리와 버전을 관리하기 쉽다.

### npm의 장점2

라이브러리 페이지를 찾아가서 cdn을 불러오는 것보다 `npm install`로 설치하는 게 훨씬 편리하다.

---

## 2. NPM(Node Package Manager)

### npm 지역 설치 명령어와 제거 명령어 - uninstall

```bash
npm install gulp
```

위 명령어를 실행해 보면 `node_modules` 폴더에 수많은 폴더가 생기는데, 이는 `gulp`라는 라이브러리가 다른 많은 라이브러리들을 사용하여 함께 설치되었기 때문이다.

```bash
npm uninstall gulp
```

위 명령어를 실행하면 `gulp`와 함께 설치되었던 라이브러리들도 모두 제거된다.

### npm 전역 설치 명령어 - install --global

```bash
npm install gulp --global
```

전역 설치하는 경우 `node_modules` 폴더에 추가되지 않는다.

### 전역으로 설치된 라이브러리 경로 확인

mac os 기준

```
/usr/local/lib/node_modules
```

### 지역 설치와 전역 설치 비교 정리

**1) 지역 설치**

```bash
npm install jquery
npm install jquery --save-prod
```

`--save-prod`는 기본값이기 때문에 위 두 명령어는 결과가 같다.
또한 `install` 대신`i`를 사용해도 된다.

**2) 전역 설치**
시스템 레벨에서 사용할 자바스크립트 라이브러리를 설치할 때 사용한다.

```bash
npm install gulp --global
npm install gulp -g
```

명령어 실행 창에 해당 라이브러리 이름을 입력하면 명령어를 인식한다.

### 지역 설치 명령어 옵션 - --save-dev(-D)

npm 지역 설치에 자주 사용되는 옵션 두 가지

```bash
npm install jquery --save-prod
npm install jquery --save-dev

npm i jquery
npm i jquery -D
```

### dependencies와 devDependencies의 차이점

dependencies는 `npm i jquery jquery-ui`와 같이 실행되었을 때,
devDependencies는 `npm i vue -D`와 같이 실행했을 때 추가된다.

구분해서 설치하는 이유는, dependency는 어플리케이션의 로직과 연관 있는 라이브러리들이 추가되고, devDependency는 `webpack`, `js-compression`, `sass` 등과 같은 개발 보조 라이브러리들이 설치된다.

### 개발용 라이브러리와 배포용 라이브러리 구분하기

npm 지역 설치 시 해당 라이브러리가 배포용인지, 개발용인지 구분해야 한다.
배포용 라이브러리는 `npm run build` 실행 시 최종 어플리케이션 코드 안에 포함이 되지만, `-D`로 옵션을 주어 설치한 라이브러리는 빌드 후 배포할 때 어플리케이션 코드에서 빠지게 된다.

개발할 때에만 사용하고 배포할 때에는 빠져도 좋은 라이브러리들

- `webpack` 빌드 도구
- `eslint` 코드 문법 검사 도구
- `imagemin` 이미지 압축 도구
