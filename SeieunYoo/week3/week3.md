## 3주차


---

### 웹팩 Dev 서버

 웹팩 데브 서버로 빌드한 결과물은 메모리에만 저장 

 => 파일 결과물에 직접적 조작 불가



#### CORS란 ??!!

참고 : https://evan-moon.github.io/2020/05/21/about-cors/

cross-origin-resource-sharing : 방어막..? 같은 존재

브라우저가 ```origin``` 필드에 출처를 담아 요청을 보냄 => 서버가 ```Access-Control-Allow-Origin``` 에 주소를 담아서 응답을 보냄 => 두 주소가 같은지 확인!

#### CORS 정책 위반을 해결 => dev 서버에서 프록시 설정

#### 프록시 설정이란 ??!!

```js
webpack.config.js

module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
```
 ``/api``로 시작하는 URL로 보내는 요청에 대해 브라우저는 ``'http://localhost:3000'`` 으로 요청을 프록싱 해주므로 cors 정책을 우회 (로컬에서만 가능..)

![image](https://user-images.githubusercontent.com/101736358/174466579-76bb432f-a7c5-4ca7-bc79-6616c65aa875.png)

#### HMR

새로고침을 하지 않아도 변경된 코드가 실시간 반영됨

```js
module.exports = {
  devServer: {
    hot: true
  }
}
```
```hot:true``` 속성으로 로딩없이 업데이트 가능

#### 소스맵

배포용 파일과 원본 파일을 연결

```js
// webpack.config.js
module.exports = {
  devtool: 'cheap-eval-source-map'
}
```
이외에도 여러가지 속성 추가 가능

---

### mode

```js
module.exports = {
  mode: 'none',
  entry: '',
  // ...
}
```

- ``none`` : 모드 설정 안함
- ``development`` : 개발 모드
- ``production`` : 배포 모드

웹팩의 실행 모드를 ``mode`` 속성을 통해서 정할 수 있음

### 웹팩의 설정

- **개발**할 때 사용할 웹팩 설정
- 개발이 끝나고 **배포**할 때 사용할 웹팩 설정

설정 파일이 1개인 경우(**개발 모드, 배포 모드**를 **모두** 설정하고 싶을 때 )

```js
// webpack.config.js
module.exports = (env) => {
  let entryPath = env.mode === 'production'
    ? './public/index.js'
    : './src/index.js';

  return {
    entry: entryPath,
    output: {},
    // ...
  }
}
```
```json
{
  "build": "webpack",
  "development": "npm run build -- --env.mode=development",
  "production": "npm run build -- --env.mode=production"
}
```
---
### merge

개발용 설정, 배포용 설정 파일을 **분리**하는 방법

1. 공통 부분 분리
- webpack.common.js
- webpack.dev.js
- webpack.prod.js

```js
// webpack.common.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ],
}
```
**common.js** 에는 entry, output, plugin 속성 같이 모드와 관계 x

```js
// webpack.dev.js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: { contentBase: './dist' }
});
```

**dev.js** 에는 개발자 도구나 웹팩 데브 서버와 같은 설정을 추가

```js
// webpack.prod.js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production'
});
```
**dev.js나 prod.js 모두 merge 라이브러리 설치, common.js 로딩 후 병합해줌**

