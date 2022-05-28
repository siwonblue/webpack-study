# CEOS 15기 프론트엔드 서브 스터디 - Webpack

![image](https://user-images.githubusercontent.com/6462456/170818388-b71e1cb0-07c4-4ab5-821a-f2e965567f3d.png)  
_1주차(5월 23일 ~ 5월 29일) : Webpack, Motivation, Node.js & NPM_

# Webpack?

> **Webpack** : _모듈 번들러(Module Bundler)_

그렇군요...!  
근데 사실 아직은 무슨 말인지 잘 모르겠어요..ㅠ  
그럼, 먼저 **모듈**과 **모듈 번들링**에 대해서 짚고 넘어가 볼까요?

## 모듈?

> **모듈(Module)** : 웹 애플리케이션을 구성하는 모든 자원

웹 애플리케이션을 제작하기 위해 필요한
HTML, CSS, Javascript, Images, Font 등
많은 파일들 하나하나가 모두 모듈입니다.  

꼭 **자바스크립트 모듈**에만 국한되는 것은 아니네요..ㅎㅎ..  

## 모듈 번들링?

> **모듈 번들링(Module Bundling)**  
: 웹 애플리케이션을 구성하는 몇십, 몇백 개의 자원들을  
**하나의 파일로 병합 및 압축**해주는 동작  

![](https://joshua1988.github.io/webpack-guide/assets/img/webpack-bundling.e79747a1.png)
_모듈 번들링을 통해 자원들을 하나의 파일로 합칠 수 있어요._

> (다시 한 번) **Webpack** : _모듈 번들러(Module Bundler)_

그렇군요.. 그러면 이제 살짝은  
Webpack이 뭔지에 대해서 이해가 갈 것도.. 같아요!!  

# Webpack이 필요한 이유

Webpack이 갑자기 어느 날 **>뚝딱<** 하고
하늘에서 떨어지진 않았을 텐데요,,  
물론 등장하게 된 배경이 있고 크게 세 가지로 요약할 수 있답니다.

## 1. 파일 단위의 자바스크립트 모듈 관리

```javascript
var a = 10;
console.log(a); // 10

function logText() {
  console.log(a); // 10
}
```

**자바스크립트의 변수 유효 범위**는 기본적으로 전역(Global)입니다.  
최대한 넓은 변수 범위를 갖기 때문에
어디에서도 접근하기가 편리하다는 장점이 있어요.  

**하지만...** 

```html
<!-- index.html -->
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->
    <script src="./app.js"></script>
    <script src="./main.js"></script>
    <script>
      getNum(); // 20
    </script>
  </body>
</html>
```

```javascript
// app.js
var num = 10;
function getNum() {
  console.log(num);
}
```

```javascript
// main.js
var num = 20;
function getNum() {
  console.log(num);
}
```

위와 같은 상황을 가정해 볼까요?  
`app.js`와 `main.js`가 있고, 이를 `index.html`에서
`script` 태그를 통해 불러와 사용하는 상황입니다.  
이런 경우 `index.html`에서 호출한 `getNum()`의 결과는
20이 출력되네요.  
그 이유는 `app.js`와 `main.js`가 `num`이라는 같은 변수 네임을
사용하기 때문이에요. (같은 변수 스코프 상에 존재)  

실제로 복잡한 애플리케이션을 개발하는 상황을 가정한다면,
이러한 특징이 갖는 문제와, 동시에 모듈화의 필요성에 대해서
어느 정도 와 닿을 수 있겠네요...    

> AMD

ㅇㅇ

> Common.js

ㅇㅇ

## 2. 웹 개발 작업 자동화 도구

프론트엔드에서 개발을 진행하면서 이뤄지는 과정에 대해서 상상해 본다면,
아래와 같은 작업들이 존재할 수 있어요.

1. Editor에서 코드를 수정하고 저장한 뒤 브라우저에서 새로 고침
2. 배포 시 HTML, CSS, JS 압축
3. 배포 시 이미지 압축
4. 배포 시 CSS 전처리기 변환
5. what else?

이러한 일들을 **자동화**해주는 도구들이 필요했습니다.  
그래서 Grunt와 Gulp 같은 도구들이 등장했습니다.

## 3. 웹 애플리케이션의 빠른 로딩 속도와 높은 성능

Awesome한 웹 사이트를 구현하는 것만큼 중요한 것은,
유저에게 사이트가 최대한 빨리 보여지도록 만드는 거에요.  
사이트 로딩 속도가 유저의 인내심(대략 5초)를 넘는 순간,
멋진 사이트를 만들기 위해 했던 모든 노력은 물거품이 되고 말 거에요...  

웹 사이트의 로딩 속도를 높이기 위한 가장 대표적인 노력들 중 하나는,
**브라우저에서 서버로 요청하는 파일 숫자를 줄이는 것**입니다.  
앞에서 살펴본 웹 태스크 매니저를 이용해 파일들을 압축하고 병합함으로써
절대적인 파일의 숫자를 줄이는 것이죠.  

또한, 초기에 유저에게 보여지는 화면에 존재하는 자원이 아니라면
필요에 의해, 나중에 보여질 때 **딱!!** 요청되게 할 수도 있겠네요.  
이는 **레이지 로딩(Lazy Loading)**과 연결되는 개념입니다.  

기억하세요. Webpack의 철학은  
**<기본적으로 필요한 자원은 미리 로딩하는 게 아니라
그 때 그 때 요청하자>** 입니다!!  

# Webpack을 통해 해결하고자 하는 문제

- 자바스크립트 변수 유효 범위
- 브라우저별 HTTP 요청 숫자의 제약
- 사용하지 않는 코드의 관리
- Dynamic Loading & Lazy Loading 미지원

앞에서 살펴 본 내용들을 통해 Webpack으로 해결하고자 하는 문제를  
위의 4가지 정도로 정리해봤습니다~!

