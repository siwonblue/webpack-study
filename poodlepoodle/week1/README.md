# CEOS 15기 프론트엔드 서브 스터디 - Webpack

![image](https://user-images.githubusercontent.com/6462456/170818388-b71e1cb0-07c4-4ab5-821a-f2e965567f3d.png)  
_1주차(5월 23일 ~ 5월 29일) : Webpack, Motivation, Node.js & NPM_

# Webpack?

> **Webpack** : _모듈 번들러(Module Bundler)_

![image](https://user-images.githubusercontent.com/6462456/170855036-0e4a064d-13fb-46c5-9a6b-9142557715c1.png)

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

![image](https://user-images.githubusercontent.com/6462456/170855060-8c199be2-03db-4fbc-8184-b3b8d8aa06e1.png)

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

![image](https://user-images.githubusercontent.com/6462456/170855124-36bfdaeb-56dd-44fa-a2a8-656d401bee7d.png)

실제로 복잡한 애플리케이션을 개발하는 상황을 가정한다면,
이러한 특징이 갖는 문제와, 동시에 모듈화의 필요성에 대해서
어느 정도 와 닿을 수 있겠네요...  

> AMD, Common.js, 그리고...

**AMD**나 **Common.js**, 그리고 원래 스터디 내용에 포함하려 했었지만..  
그냥 이 블로그 자체가 잘 정리되어 있어서 한 번 다들 읽어 보시면
좋을 것 같아 링크를 함께 남깁니다!!  

(참고 링크 : https://ingg.dev/webpack/)

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

![image](https://user-images.githubusercontent.com/6462456/170855146-2f407c18-96cf-4d2c-9a9a-a9f43ad3ce2e.png)

사이트 로딩 속도가 유저의 인내심(대략 5초)를 넘는 순간,
멋진 사이트를 만들기 위해 했던 모든 노력은 물거품이 되고 말 거에요...  

웹 사이트의 로딩 속도를 높이기 위한 가장 대표적인 노력들 중 하나는,
**브라우저에서 서버로 요청하는 파일 숫자를 줄이는 것**입니다.  
앞에서 살펴본 웹 태스크 매니저를 이용해 파일들을 압축하고 병합함으로써
절대적인 파일의 숫자를 줄이는 것이죠.  

또한, 초기에 유저에게 보여지는 화면에 존재하는 자원이 아니라면
필요에 의해, 나중에 보여질 때 **딱!!** 요청되게 할 수도 있겠네요.  
이는 **레이지 로딩(Lazy Loading)** 과 연결되는 개념입니다.  

기억하세요. Webpack의 철학은  
**<기본적으로 필요한 자원은 미리 로딩하는 게 아니라
그 때 그 때 요청하자>** 입니다!!  

# Webpack을 통해 해결하고자 하는 문제

1. 자바스크립트 변수 유효 범위
2. 브라우저별 HTTP 요청 숫자의 제약
3. 사용하지 않는 코드의 관리
4. Dynamic Loading & Lazy Loading 미지원

앞에서 살펴 본 내용들을 통해 Webpack으로 해결하고자 하는 문제를  
위의 4가지 정도로 정리해봤습니다~!

## 1. 자바스크립트 변수 유효 범위 문제

> ES6의 **Modules** 문법과 Webpack의 **모듈 번들링**으로 해결해요.  
> (참고 링크 : https://babeljs.io/docs/en/learn#modules)

```javascript
// math.js
export function sum(x, y) {
    return x + y;
}
export var pi = 3.141593;
```

```javascript
// app.js
import * as math from "math";
console.log("2π = " + math.sum(math.pi, math.pi));
```

ES6의 Modules 문법을 이용하는 경우는, `import` 키워드와
`export` 키워드를 이용해 독립적인 변수 스코프를 구성할 수 있어요.  
위와 같은 상황에서는 `math.js`에서 import한
`sum()`과 `pi`는 다른 파일의 동일한 이름의 변수와 구별될 수 있죠 ~_~  

## 2. 브라우저별 HTTP 요청 숫자의 제약

![image](https://user-images.githubusercontent.com/6462456/170854448-d601bb27-1b77-438f-b002-b0189ca27543.png)  
_최신 브라우저 별 최대 HTTP 요청 횟수_

최신 브라우저들은 위와 같이 한 번에 서버로 보낼 수 있는
HTTP 요청 숫자를 제한하고 있어요.
이 경우 **한 번에 서버에 보낸다**는 개념은 하나의 똑같은 도메인을
동시에 요청한다고 이해할 수 있어요.  
_(찾아보니 HTTP 1에 적용되는 사항이며, 이를 피하기 위해
여러 개의 도메인을 두어 다량의 요청을 처리할 수 있도록 하는
**도메인 샤딩**이라는 방법 또한 존재한다고 하네요.
HTTP 2의 달라진 구조에서는
동시 요청의 제한이 없으며 도메인 샤딩 또한 지양하는 것을 추천한다고 합니다.)_  

Webpack을 이용한다면 여러 개의 파일을 하나로 합칠 수 있으므로
위와 같이 브라우저 별 HTTP 요청 숫자 제약이 주어지더라도
이를 피할 수 있겠네요...! 그렇죠?  

## 3. Dynamic Loading & Lazy Loading 미지원

Webpack 이전에는 `Require.js`와 같은 라이브러리를 쓰지 않는다면,
동적으로 원하는 순간에 모듈을 로딩하는 것이 불가능했어요.
그러나 Webpack의 `Code Splitting` 기능을 이용한다면
원하는 모듈을 원하는 타이밍에 로딩할 수 있습니다!!
_WOW!_

```javascript
/* Before */
import { add } from './math';

console.log(add(16, 26));
```

```javascript
/* After */
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

공식 React Documentation에서 제안하는 앱에 코드 분할을 도입하는
가장 좋은 방법은 동적 `import()` 문법을 사용하는 방법입니다!
Webpack이 이 구문을 만나게 되면 앱의 코드를 분할합니다.
`Create React App`이나 `Next.js` 를 사용한 경우
이미 Webpack이 구성이 되어 있기 때문에 즉시 사용할 수 있다네요~~ 데단헤..  
자세한 내용은 아래 참고 링크 ㄱ ㄱ  

(참고 링크 : https://webpack.js.org/guides/code-splitting/)

> 왜 위에서 짚은 4가지 중 **사용하지 않는 코드의 관리**에 대해서는 그냥 넘어가나요?

![image](https://user-images.githubusercontent.com/6462456/170855181-fec33b02-bc6a-48eb-9559-c6b186bdb91a.png)

제가 아직 공부중이라서 잘 몰라서 그렇습니다~! 같이 알아가 볼까요??  

# Node.js와 NPM?

공사중

# 위에서 언급했던 제가 방문했던 링크들..!

- https://babeljs.io/docs/en/learn#modules
- https://medium.com/@syalot005006/브라우저-http-최대-연결수-알아보기-3f7aa1453bc2  
- https://webpack.js.org/guides/code-splitting/
- https://ingg.dev/webpack/
