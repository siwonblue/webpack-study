# 🔎 WebPack 스터디 Week1+Week2

## WebPack?

Webpack이란 웹브라우저에서 웹페이지를 프로그래밍적으로 제어하는 js를 더 잘 따르기 위한 기술. 

</br>

![image](https://user-images.githubusercontent.com/89721027/171870962-5cd84b3d-158d-414e-a685-32233a995ce7.png)

- bundle은 묶는다는 뜻. → 여러 개의 파일을 묶어주는 도구가 Bundler. 
- `WebPack`, `Parcel`과 같은 도구들이 여기에 속함. 
- Webpack을 이용하면 js 파일에 css와 같은 파일을 몰아넣고 분리가 가능. 

</br>

### 🧐 WebPack 없이 웹사이트를 만든다면? 

변수 이름 충돌시 서로의 변수를 덮어쓰게 됨^^,,!! 

</br>

index.html

![image](https://user-images.githubusercontent.com/89721027/171871894-9af3a87d-2967-4511-8dc9-d71cd2730a7b.png)


</br>

결과화면
![image](https://user-images.githubusercontent.com/89721027/171871944-bf44f4ff-5fbe-4258-aba6-a85190df58aa.png)


- index.html에서 나중에 선언된 world.js의 word가 hello.js의 word를 덮어씀. 


***여러 개발자들이 협업 하는 와중에 같은 이름의 변수를 다 덮어쓰게 된다면,,,,?*** → ~~***대환장 파티…..***~~

</br>
</br>

### ✔️ 모듈

***우리가 맨날 사용하는 import, export가 바로 모듈이었군요…***

</br>


index.html
![image](https://user-images.githubusercontent.com/89721027/171873711-27631269-3315-40cb-b5df-2cac07c30f0c.png)

- 위와 같이 모듈을 사용하면 정확하게 변수 사용 가능. 

</br>

➕ 모듈을 사용하게 되면 하나의 디렉토리 안에 있는 파일 이름은 그 디렉토리 안에서만 유효한 것과 같이 선언된 파일 내부에서만 접근 가능. 

→그러나 WebPack에서 지칭하는 모듈은 웹 애플리케이션을 구성하는 모든 자원을 의미. 


</br>
</br>

### ✔️ WebPack이 필요한 이유?

>WebPack의 효과 **리팩토링!** </br>
맨날 *리팩토링 리팩토링* 하는데 리팩토링이 무엇인지 한 번 짚고 넘어가면… </br>
구동되는 방법은 그대로 유지하되, 내부의 코드를 더 효율적으로 바꾸는 행위! 라고 합니다.. 

</br>

1. 파일 단위의 js 모듈 관리의 필요성

- js 변수 유효범위는 전역 → *~~프로그램 크기가 작을 때는 접근할 때 편리하겠지..~~* </br>
  그치만 ... **프로그램 크기가 커지면 의도치 않은 값을 할당하게 됨**

</br>

2. 웹 개발 작업 자동화 도구

- HTML, CSS, JS 압축

- 이미지 압축

- CSS 전처리기 변환

    과 같은 업무를 자동화
    
</br>

3. 웹 애플리케이션의 빠른 로딩 속도와 높은 성능 

- **사용자 경험 개선**(3초의 법칙,,,? *~~제로초가 별 상관 없다고 하긴 했는데 ^^…~~*)을 위해 웹팩은 자원을 미리 로딩하는 것이 아니라 필요할 때 요청. 

</br>
</br>


### 🧐 WebPack으로 해결하려는 문제?

1. js 변수 유효범위

- [ES6의 Modules 문법](https://babeljs.io/docs/en/learn#modules)(위에서 언급한 import, export,,)과 웹팩 모듈 번들링으로 해결

</br>

2. 브라우저 별 HTTP 요청 숫자의 제약

|브라우저|최대 연결 횟수|
|:---:|:---:|
|익스플로러7|2|
|익스플로러8-9|6|
|익스플로러10, 11|8, 13|
|크롬|6|
|사파리|6|
|파이어폭스|6|
|오페라|6|
|안드로이드, iOS|6|



- HTTP 요청 숫자를 줄이는 것이 웹 애플리케이션의 성능을 높이고 사이트 조작 시간을 줄일 수 있음.

  → 웹팩을 이용해 여러 개의 파일을 하나로 합치면 HTTP 요청 제약을 피할 수 있음. 
 
 </br>

3. 사용하지 않는 코드의 관리

</br>

4. Dynamic Loading & Lazy Loading 미지원

- 웹팩의 `Code Splitting` 기능을 이용해서 모듈을 원하는 타이밍에 로딩 가능.  

</br>
</br>

### ✔️ Node.js와 NPM

> 웹팩을 이용하기 위해서는 `Node.js`와 `NPM`이 있어야 함. 

</br>

#### Node.js

- Node.js는 브라우저 밖에서도 js를 실행할 수 있는 환경을 의미. 
- 이전까지 js는 브라우저에서만 실행이 가능했었음. 

</br>

#### NPM

- NPM은 명령어로 js 라이브러리를 설치하고 관리할 수 있는 패키지 매니저. </br>
    → 다른 개발자들이 올려놓은 라이브러리를 npm으로 다운 받아 쓸 수 있음. 

</br>

이것까지 너무 자세히 다루면 2주차 리드미가 너무 길어질 것 같아 *(정말입니다 쓰기 귀찮아서 그런거 아니라구요,,, 흑흑흑)* 아주 설명이 잘 되어있는 웹팩 핸드북 링크를 걸어 드리겠습니다. 

[Node.js와 NPM 자세히 알아보기](https://joshua1988.github.io/webpack-guide/build/node-npm.html)


</br>
</br>

---

## WebPack 찍먹,,,,,, 😋

### ⚙️ 개발 환경 만들기

```jsx
npm i webpack webpack-cli -D
```

- webpack 설치.

</br>

package.json
```js

"devDependencies": {
"webpack": "^5.73.0",
"webpack-cli": "^4.9.2"
},
```
- 위와 같이 `package.json`에 `webpack`과 `webpack-cli`가 추가 됨. 

  ➕ `node_modules`에도 `webpack`과 `webpack-cli`폴더가 생성되었을 것. 

</br>

### ⚙️ 웹 페이지 자원구성

> WebPack으로 본격적인 작업을 하기 위해서는 index.html 파일의 안의 js를 별도의 js파일로 분리해주어야 함! </br>
> *(index.html과 index.js가 이래서 따로 있는 거였군뇨,,,, )* 

우리가 만드는 애플리케이션의 **entry 파일**은 `index.js`가 될 것. 

index.html

```jsx
<html>
  <head>
   <script src="./hello.js"></script>
   <script src="./world.js"></script>
  </head>
  <body>
      <h1>Hello, Webpack</h1>
      <div id="root"></div>
     <script type="module">
         import hello_word from "./hello.js";
         import world_word from './world.js';
         document.querySelector('#root').innerHTML=hello_word+" "+world_word;
     </script>
  </body>
</html>
```

</br>

결과화면

![image](https://user-images.githubusercontent.com/89721027/171881003-15770397-0282-4069-83b0-2ca618707a9c.png)

- `index.html` 실행시킨 뒤 네트워크 탭 확인해보면 여러 파일에 접근하고 있는 것 확인 가능.. 

</br>

index.js

```jsx
import hello_word from "./hello.js";
import world_word from './world.js';
document.querySelector('#root').innerHTML=hello_word+" "+world_word;
```

- `index.html`에서 js 코드 `index.js`로 분리. 

</br>
</br>


### ⚙️ 웹팩 빌드

```js
npx webpack --entry ./src/index.js --output-path ./public/
```

- `webpack.config.js`에 output filename을 `index_bundle.js`로 설정해줘서 위에서는 파일이름은 생략. 

- **index.js파일과 index.js이 사용하고 있는 파일을 모두 하나로 만들어 `index_bundle.js`에 넣어! 라는 명령!!**

</br>

index.html

```jsx
<html>
  <head>
  </head>
  <body>
      <h1>Hello, Webpack</h1>
      <div id="root"></div>
      <script src="./public/index_bundle.js"></script>
  </body>
</html>
```

</br>

***그 다음 index.html 파일을 실행하면 ,,,,,!!!!!***

결과화면

![image](https://user-images.githubusercontent.com/89721027/171881648-89892e26-9be5-42b5-9196-f415d6a2f52e.png)


- 원래는 hello.js와 world.js를 다 로드 했었는데 지금은 ***`index_bundle.js`만*** 다운로드,,,🥺

  → 사용자와 서버 모두에게 이득
  

</br>
</br>

---

## 웹팩의 4가지 속성

> 1. entry
> 2. output
> 3. loader
> 4. plugin

</br>

### 🔧 Entry

- `entry`는 웹팩에서 웹 자원을 변환하기 위해 필요한 js 파일 경로. 

</br>


webpack.config.js

```jsx
module.exports = {
  mode: 'none',
  entry: './src/index.js'
}
```

- webpack.config.js에 `entry`를 이미 `index.js`로 설정해놓은 것 확인~~~~

- `entry` 즉, `index.js`에는 **웹 애플리케이션의 전반적인 구조와 내용**이 담겨있어야 함. 

</br>

index.js

```jsx
import _ from 'lodash';
import hello_word from "../hello.js";
import world_word from '../world.js';
document.querySelector('#root').innerHTML=hello_word+" "+world_word;
```

![image](https://user-images.githubusercontent.com/89721027/171882643-e62a60f7-f4c7-4c99-89b8-98c6a22e8ce1.png)


- hello.js와 world.js가 모두 `index.js`에서 사용

  → **웹팩 실행시 hello.js와 world.js까지 해석하여 파일을 빌드.**

> 이렇게 모듈 간 의존 관계가 생기는 구조를 [Dependency Graph](https://webpack.js.org/concepts/dependency-graph/)라고 함. 

</br>
</br>


### 🔧 Output

- `output`은 웹팩을 실행하고 난 결과물을 의미

</br>


webpack.config.js

```jsx
module.exports = {
  output: {
    filename: 'index_bundle.js',
    path: path.resolve(__dirname, 'public')
  }
};
```
- webpack.config.js에 `output`을 이미 `index_bundle.js`로 설정해놓은 것 확인~~~~~ 
- 위에서 `filename`은 웹팩으로 빌드한 파일. 
- `path`는 파일 경로를 의미. 

</br>

***파일 경로와 파일 이름을 확인해보세여,,,***

![image](https://user-images.githubusercontent.com/89721027/171883408-ef985642-f28a-422a-a657-6d79cb3cd371.png)

</br>
</br>


### 🔧 Loader

- Loader는 웹팩이 웹 애플리케이션을 해석할 때 **js 파일이 아닌 html, css, images, font 등을 변환**할 수 있도록 도와주는 속성. 

  ➕ Loader를 사용하지 않으면 js가 아닌 css와 같은 파일을 해석하지 못하는 오류 발생,,
  
  
</br>


#### css Loader 적용

```jsx
npm i css-loader -D
```
- css 로더 설치. 

</br>


webpack.config.js

```jsx
module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  }
```

- 로더는 설정시 `module`이라는 이름 사용. 

- `test`는 로더를 적용할 파일 유형(보통 정규식으로 표현). 

- `use`는 해당 파일에 적용할 로더 이름. 

</br>

#### 로더 적용 순서 

- 로더는 기본적으로 ***오른쪽→ 왼쪽*** 순으로 적용

</br>

webpack.config.js

```jsx
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ['css-loader', 'sass-loader']
    }
  ]
}
```

- `Sass 로더`로 scss **파일을 css 파일로 변환한 다음** 웹팩에서 css을 인식할 수 있게 `css 로더`를 적용하겠다는 뜻. 

</br>
</br>

### 🔧 Plugin

- `plugin`은 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성

</br>

webpack.config.js

```
module.exports = {
  plugins: []
}
```

- plugin 은 webpack.config.js에 위와 같이 선언. 

</br>
</br>


### 정리❗️

![image](https://user-images.githubusercontent.com/89721027/171884804-815b3ff5-c126-407e-b7fb-cf91240b97aa.png)


</br>
</br>


## Code Splitting

> 과연 번들링을 사용하는게 무조건 좋다!! 라고 말할 수 있을까요???????????????

![image](https://user-images.githubusercontent.com/89721027/171885060-81ec97e0-d14a-4eff-b0a2-b574ddbcbc48.png)


네 아닙니다 

</br>

왜냐하면 애플리케이션의 규모가 커질수록 번들의 크기도 같이 커지게 되기 때문,,,,,

→ 당장 필요하지 않은 컴포넌트까지 불러오면서 파일 크기가 커지게 도고 로딩시간도 길어지게 됨,,,

→ 이걸 해결해줄 수 있는 것이 [Code Splitting](https://ko.reactjs.org/docs/code-splitting.html)

***즉, 번들을 나눠서 필요하지 않은 코드를 불러오지 않고 앱의 초기화 로딩에 필요한 비용을 줄이자는 것,,,!***

</br>
</br>


### Webpack Dev Server
> `webpack-dev-server`는 라이브 리로드 기능을 제공하는 개발용 서버. </br>
webpack-dev-server는 실제 번들링된 파일을 생성하지 않고 번들링된 결과를 **메모리에 저장**하기 때문에 **빌드 속도가 빠름.** </br>
따라서 매번 빌드를 실행하기 보다는 webpack-dev-server를 사용하는 것이 좋음. 

</br>

```jsx
npm install --save-dev webpack-dev-server
```
- `webpack-dev-server` 설치

</br>

package.json

```jsx
"scripts": {
    "dev": "webpack serve"
  },
```
- package.json에 **커스텀 명령어** 추가. 

</br>


index.js

```js
var div = document.querySelector('.container');
div.innerText = 'Webpack loaded!!';
```

</br>

webpack.config.js

```
plugins: [
    new HtmlWebpackPlugin({
      // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
      template: 'index.html',
    }),
  ],
```
- webpack.config.js에 플러그인 추가. 

- 위에서 설정한 커스텀 명령어 `npm run dev를 입력해서 webpack dev server를 실행하고 `localhost:9000`에 접속하여 결과 확인. 

</br>

결과화면

![image](https://user-images.githubusercontent.com/89721027/171890950-2db4c725-7efe-4f67-acc7-aaa727b827b3.png)

