## Developer Tools

### Webpack Dev Server

- 웹팩의 빌드 대상 파일이 변경되었을때 코드를 저장하면 웹팩으로 빌드한 후 브라우저를 새로고침해주는 도구
- 브라우저 새로고침 시간 뿐만 아니라 웹팩 빌드 시간을 줄여줌

**특징**

웹팩 데브 서버로 빌드하는 경우 빌드한 결과물이 메모리에 저장되고 파일은 생성하지 않기 때문에 빌드한 결과물이 파일 탐색기에 보이지 않음

→ 개발할 때만 사용하다가 개발이 완료되면 명령어를 사용해 결과물을 파일로 생성해야 함

**프록시 설정**

프록시 쓰지 않은 경우 웹팩 데브 서버와 API 서버 통신 시 CORS 에러 발생

```jsx
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "domain.com",
        changeOrigin: true,
      },
    },
  },
};
```

프록시 서버를 사용하면 API 서버에서는 같은 도메인에서 온 요청으로 인식해 CORS 에러가 나지 않음

<br>

### Hot Module Replacement

- 브라우저를 새로고침하지 않아도 웹팩으로 빌드한 결과물이 웹 어플리케이션에 실시간으로 반영될 수 있게 도와주는 설정 (LiveReload)
- React, AngularJS, Vue.js 등 대부분의 프레임워크에서 HMR을 사용할 수 있는 로더 지원

```jsx
// webpack.config.js
module.exports = {
  devServer: {
    hot: true,
  },
};
```

<br>

### Source Map

- 배포용으로 빌드한 파일과 원본 파일을 연결
- 서버에 배포시 성능 최적화를 위해 웹 자원을 압축 → 에러가 나는 경우 소스 맵을 사용해 배포용 파일의 특정 부분이 원본 소스의 어느 부분인지 확인

```jsx
// webpack.config.js
module.exports = {
  devtool: "cheap-eval-source-map",
};
```

<br>

## Advanced

### 웹팩 실행 모드 - mode

```jsx
// webpack.config.js
module.exports = {
  mode: "none",
  entry: "",
  // ...
};
```

- none : 모드 설정 안함 - production 모드로 자동 설정
- development : 개발 모드 - 개발자들이 보기 편하게 로그나 결과물
- production : 배포 모드 - 성능 최적화를 위해 파일 압축 등 빌드 과정 추가

**실행 모드에 따라 다른 웹팩 설정**

개발할 때 사용할 웹팩 설정, 배포할 때 사용할 웹팩 설정 구분 필요

```jsx
// webpack.config.js
module.exports = (env) => {
  let entryPath =
    env.mode === "production" ? "./public/index.js" : "./src/index.js";

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

<br>

### Tree Shaking

- 사용되지 않는 코드를 제거하는 최적화 과정

1. ES6 모듈 포맷

```jsx
import { sum } from "../utilFile";
```

1. common.js로 컴파일되는 것 방지

```json
"presets": [
  [
    "@babel/preset-env",
    { "modules": false }
  ],
],
```

1. package.json에 sideEffects 속성

```json
{
  "name": "...",
  "sideEffects": false
}
```

1. webpack production mode

```jsx
module.exports = {
	mode: "production",
	...
}
```

<br>

### Webpack Merge

- 웹팩 설정 파일을 하나로 병합해주는 라이브러리
- 실행 모드에 따라 조건문으로 설정을 구분하는 것보다 파일을 나누는 것이 더 권장되기 때문에 머지 사용

- 공통 설정 파일

```jsx
// webpack.common.js
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin()],
};
```

entry, output, plugins과 같이 실행 모드에 관계없는 코드

- 개발용 설정 파일

```jsx
// webpack.dev.js
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: { contentBase: "./dist" },
});
```

개발자 도구나 웹팩 데브 서버 설정 추가

- 배포용 설정 파일

```jsx
// webpack.prod.js
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
});
```

배포하기 전 웹 리소스 최적화를 위한 설정
