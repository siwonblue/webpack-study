## 웹팩 맛보기

```json
"scripts": {
  "build": "webpack --mode=none"
}
```

커스텀 명령어로 `webpack --mode=none`을 선언해주면 `npm run build`로 빌드 가능

```jsx
var path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

```json
"scripts": {
  "build": "webpack"
}
```

`webpack.config.js`에 옵션을 설정해주면 더 간단하게 build 선언 가능!

<br>

## Concepts

웹팩의 주요 속성 4가지

### entry

웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로

- `entry` 속성에 지정된 파일에는 웹 애플리케이션의 전반적인 구조와 내용이 담겨져 있어야 함
- 웹팩이 `entry`로 지정된 파일을 가지고 웹 애플리케이션에서 사용되는 모듈들 간의 관계를 이해하고 분석 (의존관계의 파일들까지 해석)

```jsx
entry: {
  login: './src/LoginView.js',
  main: './src/MainView.js'
}
```

여러 개의 `entry`도 가능 (MPA에 적합)

### output

웹팩을 돌리고 난 결과물의 파일 경로 (객체 형식으로 지정해야 함)

```jsx
var path = require("path");

module.exports = {
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
};
```

일반적으로 `filename`, `path` 정의

> `path.resolve()`는 인자로 넘어온 경로들을 조합하여 유효한 파일 경로를 만들어주는 Nodejs API

`filename` 의 속성은 대괄호를 사용해서 엔트리 이름, 모듈 아이디, 해시 값 등을 넣을 수 있음

```jsx
module.exports = {
  output: {
    filename: "[name].bundle.js",
  },
};
```

### loader

웹팩이 웹 애플리케이션을 해석할 때 자바스크립트 파일이 아닌 웹 자원(HTML, css, image, 폰트 등)을 변환할 수 있도록 도와줌

- `loader`를 추가하지 않으면 해당 파일들을 해석하기 위한 loader를 추가하라는 오류 발생

**css Loader**

npm 명령어로 css-loader 설치 후 정의 가능

```jsx
module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
    ],
  },
};
```

- `test` : 로더를 적용할 파일 유형 (정규식)
- `use` : 해당 파일에 적용할 로더의 이름

Sass Loader, TS Loader, Babel Loader, File Loader 등이 자주 사용

**Loader 적용 순서**

오른쪽에서 왼쪽!

```jsx
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    },
  ];
}
```

Sass 로더로 전처리(scss 파일을 css 파일로 변환) → 웹팩에서 css 파일을 인식 → css 파일이 웹 애플리케이션에 인라인 스타일 태그로 추가

### plugin

웹팩의 기본적인 동작에 추가적인 기능을 제공 (해당 결과물의 형태를 바꾸는 역할)

```jsx
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()],
};
```
