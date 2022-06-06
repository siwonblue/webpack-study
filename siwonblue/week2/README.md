
# 📱시작하기

### 웹팩 설치

```bash
$npm i webpack webpack-cli -D
```

### 명령어 실행

package.json 스크립트에 build 명령어 이용해서 사용

```json
{
  "scripts" : {
    "build": "webpack"
  }  
}
```



### configuration

package.json 에 아래와 같이 하나씩 설정해도 됨
```json
{
  "scripts" : {
    "build": "webpack --mode=none --entry=src/index.js"
  }  
}
```

근데 생산성이 떨어지기 때문에 webpack.config.js 로 관리

- 프로젝트 루트폴더에 webpack.config.js 생성

```js
// webpack.config.js
// `webpack` command will pick up this config setup by default
let path = require('path')

module.exports = {
  mode : 'none',
  entry : './src/index.js',
  output : {
    filename : 'siwon.js',
    path : path.resolve(__dirname, 'distribution')
  }
}
```


### 동작 순서

webpack.config.js 파일 없어도 웹팩 실행하면 디폴트 값으로 적용되는 내용은
다음과 같음
- entry : src/index.js
- output : dist/main.js

웹팩을 실행하게 되면 output 으로 결과물이 나오게 되고 그 파일을 index.html 에 연결시키면 됨





# 📱개념

### 웹팩 주요 속성 네 가지

- entry
- output
- loader
- plugin

### entry

- 웹팩이 최초 진입하는 js 파일의 경로 지정
- 하나의 HTML 페이지에 하나의 entry point  
  SPA 는 하나, MPA 는 다수의 엔트리 포인트가 필요

```js
// webpack.config.js
module.exports = {
  entry: './src/index.js'
}
```


### output

- 웹팩이 실행되고 난 후 결과물이 나오는 경로
- 엔트리 이름, 해시 값 등 동적으로 설정 가능
```js
// webpack.config.js
module.exports = {
  output: {
    filename: 'bundle.js'
  }
}
```

### loader
- js가 아닌 다른 웹 자원을 해석할 수 있게 해주는 속성
- 로더를 통해서 다른 웹 자원을 모두 js로 변환
- 로더 설정을 해두지 않으면 js 파일에 다른 웹 자원이 있는 경우 오류 발생
  ex. js 파일에 css 모듈이 있는 경우 오류 발생

```js
// webpack.config.js
module.exports = {
  module: {
    rules: []
  }
}
```

- 아래처럼 loader 는 모듈 설치 후 직접 넣어 줘야 함
- module : {rules : []} 에 설정

```bash
$npm i css-loader ts-loader -D
```

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
      // ...
    ]
  }
}
```

로더 설정을 하지 않으면 css 파일을 처리할 수 없어서 다음과 같은 오류 발생
```bash
 npm run build      

> week2@1.0.0 build
> webpack

asset bundle.js 3.46 KiB [emitted] (name: main)
runtime modules 937 bytes 4 modules
cacheable modules 43 bytes
  ./index.js 20 bytes [built] [code generated]
  ./base.css 23 bytes [built] [code generated] [1 error]

ERROR in ./base.css 1:2
Module parse failed: Unexpected token (1:2)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> p {
|     color : blue;
| }
 @ ./index.js 1:0-20

webpack 5.73.0 compiled with 1 error in 40 ms

```




자주 사용하는 로더 종류
- **babel loader**
- Sass loader
- File loader
- Vue loader
- Ts loader
- **여러 개의 로더를 사용할 경우 오른쪽에서 왼쪽으로 적용**



### Plugin

- 결과물의 형태를 변경
- 로더와 차이점  
  로더는 파일을 해석하는 과정에 관여하지만 플러그인은 결과물에 관여

```js
// webpack.config.js
module.exports = {
  plugins: []
}
```
- 플러그인의 배열에는 생성자 함수로 생성한 객체 인스턴스만 추가 가능

```js
// webpack.config.js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.ProgressPlugin()
  ]
}
```

자주 사용하는 플러그인
- split-chunks-plugin
- clean-webpack-plugin
- image-webpack-loader
- webpack-bundle-analyzer-plugin


### code spliting
- plugin 기능을 이용해서 결과물을 여러 파일로 쪼갤 수 있음
- 원하는 자원을 필요할 때만 사용하기 위해 한 파일로 변환하지 않고 여러 개로 쪼개는 것임




# 📱요약

- webpack 은 모든 웹 자원 (css, images, ...) 을 js 로 바꿈
- 바꿔주는 실무자는 loader
- loader 설정 안 해두면 다른 자원을 js 로 못 바꿈
- 웹팩 빌드 과정에서 중요한 네 가지 포인트
    - entry  : 이 파일을 통해서 빌드 시작
    - output : 결과물을 이 곳으로
    - loader : js 외의 다른 웹 자원을 js 로 바꾸는 설정
    - plugin : 결과물을 어떻게 조작할지 결정 (ex. code spliting)

![](https://velog.velcdn.com/images/siwonblue/post/1a738444-7096-43d4-ada7-08fed34fb15f/image.png)




## 출처
https://joshua1988.github.io/webpack-guide/  
https://createapp.dev/webpack  
https://webpack.js.org/configuration/