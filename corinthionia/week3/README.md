# Developer Tools

## Webpack Dev Server

코드 변경 후 저장하면 웹팩 빌드 후 브라우저를 자동으로 새로고침 해 준다.

### 특징

```json
"scripts": {
  "dev": "webpack serve",
  "build": "webpack"
}
```

웹팩 데브 서버를 실행하여 빌드한 결과물은 메모리에 저장되고 따로 파일로 생성되지는 않는다. 따라서 개발 완료 후 명령어를 이용해 파일로 생성해야 한다.

<br/>

## Proxy 설정

실무에서 가장 흔히 사용되는 속성! **개발할 때 발생하는 CORS 관련 에러를 해결할 수 있다.**  
실제 브라우저에서는 `localhost:8080/api/login` 으로 요청했지만, 서버에서는 `domain.com` 에서의 요청으로 받아들여서 CORS 에러가 발생하지 않는다!

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'domain.com',
        changeOrigin: true,
      },
    },
  },
};
```

<br/>

## HMR (Hot Module Replacement)

브라우저를 새로고침 하지 않아도 웹팩으로 빌드한 결과물이 웹 어플리케이션에 반영되도록 도와주는 설정이다.

```javascript
module.exports = {
  devServer: {
    hot: true,
  },
};
```

<br/>

## Source Map

배포용으로 빌드한 파일과 원본 파일을 서로 연결시켜 주는 기능이다.  
서버에 배포 시 웹 자원을 압축하는데, 이 파일에서 에러가 난다면 소스맵을 이용하여 원본 소스 파일을 확인할 수 있다.

```javascript
// webpack.config.js
module.exports = {
  devtool: 'cheap-eval-source-map',
};
```

<br/>
<br/>

# Advanced

## Mode Config

### 웹핵 실행 모드 - **mode**

```javascript
module.exports = {
  mode: 'none',
  entry: '',
  // ...
};
```

- `none`: 설정 안 함
- `development`: 개발 모드
- `production`: 배포 모드 (default)

<br/>

### 실행 모드에 따라 웹팩 설정 달리 하기

웹팩으로 개발 시 보통 2가지 경우로 나누어 작업한다.

- 개발할 때 사용할 웹팩 설정
- 배포할 때 사용할 웹팩 설정

```javascript
// webpack.config.js
module.exports = (env) => {
  let entryPath =
    env.mode === 'production' ? './public/index.js' : './src/index.js';

  return {
    entry: entryPath,
    output: {},
    // ...
  };
};
```

```json
// package.json

{
  "build": "webpack",
  "development": "npm run build -- --env.mode=development",
  "production": "npm run build -- --env.mode=production"
}
```

함수에 있는 `env` 인자는 환경변수를 의미하고, 웹팩을 실행할 때 옵션으로 넘겨 줄 수 있다. 혹은 두 번째 방법 처럼 npm 커스텀 명령어로도 사용할 수 있다.

```shell
webpack --env.a=10
```

```json
{
  "build": "webpack --env.a=10"
}
```

<br/>

## Webpack Merge

여러 개의 웹팩 설정 파일을 하나로 병합해 준다. (보통 개발용과 배포용으로 나누어 설정하기 때문)  
앞서 있던 예시처럼 실행 모드에 따라 조건문으로 작성할 수도 있지만, 파일을 분리하는 방식을 권장한다.

<br/>

### 웹팩 설정 파일 구분 전략

파일 분리 전, 개발용과 배포용 설정 파일에서 공통으로 쓰이는 부분을 먼저 분리한다.

- webpack.common.js
- webpack.dev.js
- webpack.prod.js

**🍒 webpack.common.js**  
공통 설정 파일에는 `entry`, `output`, `plugins` 같이 실행 모드에 관계 없이 항상 들어가는 코드를 추가한다.

```javascript
// webpack.common.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin()],
};
```

<br/>

**🍒 webpack.dev.js**  
개발용 설정 파일에는 개발자 도구나 웹팩 데브 서버 설정을 추가한다. 또한 `webpack-merge` 라이브러리 설치 후 `webpack.common.js` 파일을 로딩하여 병합한다.

```javascript
// webpack.dev.js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: { contentBase: './dist' },
});
```

<br/>

**🍒 webpack.prod.js**  
배포 전 웹 리소스 최적화를 위한 설정을 추가한다.

```javascript
// webpack.prod.js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
});
```
