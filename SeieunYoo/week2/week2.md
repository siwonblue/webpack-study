## 2주차


---
##### node_module 같이 큰 파일 있으면 .gitignore 속성 추가

### 웹팩 맛보기

#### 웹팩 설치
```bash
npm i webpack webpack-cli -D
```

#### lodash

https://velog.io/@katej927/Webpack-Bundle-%EC%82%AC%EC%9D%B4%EC%A6%88-%EC%A4%84%EC%9D%B4%EB%8A%94-lodash-import-%EB%B0%A9%EB%B2%95#-lodash-%EB%AF%B8%EC%82%AC%EC%9A%A9

=> 실습코드에 나와있는 `import _ from "lodash"` 를 사용하게 되면 번들 사이즈 굉장히 커짐.. 따라서 다르게 import 해보자!

```js
//import _ from "lodash"

필요한 파일만 불러옴

import 메소드명 from "lodash/메소드명"
```

### 웹팩 개념

### entry 

```bash
// webpack.config.js
module.exports = {
  entry: './src/index.js'
}
```
`entry` 속성은 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로

=> index.js 대상으로 웹팩이 빌드를 수행함

* index.js에는 어떤 파일이 들어가야 할까?

전체적인 파일의 구조가 들어가야함

ex)
```js
//index.js
import LoginView from './LoginView.js';
import HomeView from './HomeView.js';
import PostView from './PostView.js';

function initApp() {
  LoginView.init();
  HomeView.init();
  PostView.init();
}

initApp();
```
html을 SPA(싱글 페이지 어플리케이션) 라고 가정한다면 **index.js**에서 빌드하고 **로그인,홈화면,포스트 화면**을 전부 가져오게 됨!

SPA가 아닌 MPA(멀티 페이지 어플리케이션) 이라면 
entry 속성을 index.js가 아닌 객체 형태로 **각각의 파일.js** 옵션을 추가하기

### Output 

```js
// webpack.config.js
var path = require('path');

module.exports = {
  output: {
    filename: 'bundle.js'
    path: path.resolve(__dirname, './dist')
  }
}
```
**input** 과는 다르게 객체 형태로 가져와서 **path,filename** 속성 지정

path : 파일 이름, filename : 파일 경로 

### loader

자바스크립트 파일 이외에 **html,css,image,font** 변환을 도와주는 속성

```js
// webpack.config.js
module.exports = {
  module: {
    rules: []
  }
}
```

* module 에 rule 추가

가장 많이 사용할 것 같은 loader

* **css loader**
* **ta loader**
* **file loader**
* *Babel Loader*
* *Vue Loader*
* *Sass Loader*

```js
module: {
    rule: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
  ```
  test: 로더를 적용할 파일 유형 (일반적으로 정규 표현식 사용) 
  
  use: 해당 파일에 적용할 로더의 이름

  * 로더는 기본적으로 오른쪽 -> 왼쪽

  ### Plug-in

  `plugin`: 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성 -> 결과물의 형태를 바꿔줌

```js
 // webpack.config.js
module.exports = {
  plugins: []
}
```
자주 사용하는 플러그인

* split-chunks-plugin
* clean-webpack-plugin
* image-webpack-loader
* **webpack-bundle-analyzer-plugin** 
***저번 과제 때 번들 사이즈를 측정하려고 썼는데 ㅇㅎ***
---

### 정리

![image](https://user-images.githubusercontent.com/89721027/171884804-815b3ff5-c126-407e-b7fb-cf91240b97aa.png)

***entry를 통해서 진입하고 loader 통해서 css,img 파일들을 해석하면 번들링을 하고 output을 통해 나옴***

---

### Code Splitting

웹팩을 이용한 번들링 -> 파일을 하나로 통합시킨다는 건 좋지만 ***앱이 커지면 번들도 커짐***

**따.라.서** `code-splitting` 을 통해 필요한 것만 로드 가능

1. `React.lazy()`
2. `Suspense`

```js
import React, { lazy, Suspense } from 'react';

const NewPopup = lazy(() => import('./views/NewPopup'));

const loading = () => <p>Loading</p>;

const MainComponent = () => (
  <Suspense fallback={loading()}>
    <NewPopup />
  </Suspense>
)
```
`lazy`로 파일은 import 한 후 `Suspense`로 컴포넌트를 묶어줌

코드 스플리팅: https://medium.com/humanscape-tech/react%EC%97%90%EC%84%9C-%ED%95%B4%EB%B3%B4%EB%8A%94-%EC%BD%94%EB%93%9C-%EC%8A%A4%ED%94%8C%EB%A6%AC%ED%8C%85-code-splitting-56c9c7a1baa4


***처음에 파일 경로를 잘못 설정함^^.. 실행이 안된다~.~***