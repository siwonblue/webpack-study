# 신선한 김치를 담구기 위한 노력

## NPM은 무엇인가?

가장 먼저 npm은 오픈소스 node.js 프로젝트를 배포하는 온라인 레포지토리입니다. 동시에 npm은 패키지의 설치와 버전 관리, 그리고 의존성 관리를 위한 CLI입니다. 전역으로 설치된 라이브러리는 RELPL을 지원하며 따라서 CLI에서 바로 사용할 수 있습니다. npm은 package.json 파일을 통해 자동적으로 모든 의존성을 설치하는 것을 도와줍니다. 이때 package.json에는 다음과 같은 버전 정보 형식을 포함할 수 있습니다.

```
{
  "dependencies": {
    "react": "^16.12.0"
  }
}
```

의존성의 버전 관리는 프로젝트를 최신 업데이트에 맞추어 업데이트 하는데 중요합니다. 엄격한 버전 제한은 프로젝트를 특정 상태로 가두어버릴 수도 있고, 반면 자유로운 제한은 의존성 간 충돌로 프로젝트에 오류를 초래할 수 있습니다. 따라서 유의적 버전을 통해 버전을 관리해야 합니다. 유의적 버전 관리는 다음의 기준으로 업데이트를 명시합니다.

``1(Major Version).2(Minor Version).3(Patch Version)``

  (1) Major Version: 기존 버전과 미호환
  (2) Minor Version: 기존 버전과 호환, 기능 추가
  (3) Patch Version: 기존 버전과 호환, 버그 수정
 
 또한, 특정 버전보다 높거나 낮은 경우 다음과 같이 명시합니다
 
```
>1.2.3
>=1.2.3
<1.2.3
<=1.2.3

```
특수하게 틸드(~)와 캐럿(^)을 범위를 명시할수도 있습니다.
```
~1.2.3
^1.2.3
```
틸드는 Patch Version의 업데이트까지만 반영합니다. (1.2.0 until 1.3.0 미만) 
캐럿은 Minor Version의 업데이트까지만 반영합니다. (1.0.0 until 2.0.0 미만)

## 웹팩은 무엇인가?

웹팩은 자바스크립트 어플리케이션을 위한 정적 모듈 번들러입니다. 웹팩은 (1) '의존성 그래프' 만들기, (2) '번들링'이라는 두가지 중요한 작업을 수행합니다. 하나의 파일이 다른 파일의 존재에 의존할 때 나타나는 관계를 의존성이라고 하는데요, 웹팩은 이미지, 폰트와 같은 코드가 아닌 자원들을 의존성으로 다룹니다. 웹팩은 작업이 시작되면 entry point에서 출발해서 각 파일에 필요한 모듈을 의존성 그래프로 그리고 모듈들을 묶어 브라우저에 의해 로드될 수 있는 소수의 번들로 완성합니다. 따라서 불필요한 모듈을 로드할 필요 없이 필요한 모듈만 제때 사용할 수 있습니다.

![image](https://user-images.githubusercontent.com/75231844/170634212-ebb65cdd-4896-4a33-9725-a2b4c1a0fa5f.png)

위의 이미지를 보신적이 있나요? 아이고 머리야! 이럴 경우, multiply.js 보다 sum.js보다 먼저 삽입하거나 index.js를 두 js보다 먼저 삽입하면 오류가 발생합니다. 간단한 예제이지만, 웹 앱의 복잡도가 올라가면서 수많은 의존성의 순서를 결정하는 것조차 버거운 일이 될 수 있습니다. 또한 자바스크립트의 전역 변수 관리도 문제가 됩니다. 

### 모듈에 관하여

과거의 웹 개발자들은 이 문제를 해결하기 위해 각 코드를 함수로 묶어서 관리하는 방식을 사용했습니다. let의 등장 이전에 var는 함수 스코프를 가지고 있었기 때문입니다. 이후 필요한 함수와 변수를 return값으로 반환됩니다. 그러나, 특정한 파일에서 함수를 불러올 수 없고 의존성 관리를 개발자가 직접 해야한다는 점에서 한계가 있었습니다.

![image](https://user-images.githubusercontent.com/75231844/170656809-a5ed00d2-a7eb-450c-b680-b0c0844eebb5.png)

이러한 문제를 극복하고 서버사이드 JS 개발에서 활용하기 위해 CommonJS를 대표적으로 모듈의 개념이 발생했습니다. 모듈은 require, exports 두 구문으로 관리됩니다. 우선, require 안에는 모듈의 아이디, 즉 node.js 에서 node_modules의 경로가 인자로 들어갑니다. exports는 인자로 받은 요소를 public 요소로 반환합니다. 따라서 원하는 모듈을 원하는 코드에 삽입할 수 있고, 모듈은 필요한 순서대로 앱에 통합되므로 의존성 관리가 편리합니다. 

*현재 node.js의 모듈은 CommonJS와 다른 구조를 가지고 있습니다.

다만 CommonJS의 개념은 비동기 환경을 전제하고 있으므로 브라우저에서는 부적합합니다. 따라서 비동기적인 모듈 로드를 위해 AMD(Asynchronous Module Definition)가 나타났습니다. AMD 로더는 모듈의 의존성 그래프를 그린 다음 의존성이 있는 모듈을 동기적으로 로드하면서 서로 의존하지 않는 모듈은 동시에 로드합니다. 따라서 모듈을 작은 단위로 세분화해도 로드 시간이 길지 않고, 의존성 관리가 완전히 통합되었습니다.

ES2015에서 두 모듈의 개념은 하나로 합쳐졌습니다. 정적 analyzer가 import, export 구문을 분석하며 의존성 트리를 그린 뒤 런타임에서 최적의 로딩 전략을 고르도록 합니다. 따라서 비동기적인 로딩이 가능하다면 사용할 수 있습니다. 다만, ES2015의 import는 정적 선언이므로 빌드시 모든 모듈을 로드해야 합니다. 이러한 문제는 ES2020에서 동적 import가 추가되면서 개선되었습니다. [관련 링크](https://dmitripavlutin.com/ecmascript-modules-dynamic-import/#:~:text=To%20load%20dynamically%20a%20module,components%20of%20the%20imported%20module.)

## 어떻게 한거야?

![image](https://user-images.githubusercontent.com/75231844/170657009-0e1fbcbc-d467-42fe-a20d-fd98c995f887.png)

나아가 웹팩은 필요한 모듈만을 올바른 스코프 내에서 사용하며 더 개선된 접근방법을 사용합니다. 웹팩의 동적 import는 ES2020 이전부터 지원되어 왔습니다. [관련 링크](https://medium.com/front-end-weekly/webpack-and-dynamic-imports-doing-it-right-72549ff49234) 그렇다면 어떤 식으로 웹팩은 이런 마법을 부리는 걸까요?

```
var multiply = require('./multiply');
var sum = require('./sum');
var totalMultiply = multiply(5, 3);
var totalSum = sum(5, 3);
```

위의 코드를 multiply.js라는 임의의 자바스크립트 파일이라고 해볼까요. 이는 웹팩이 자바스크립트 모듈을 합쳐놓은 bundle.js에 들어가면 다음과 같이 변하게 됩니다.

```
function (module, exports, __webpack_require__) {
    var multiply = __webpack_require__(1);
    var sum = __webpack_require__(2);
    var totalMultiply = multiply(5, 3);
    var totalSum = sum(5, 3);
    },
```

웹팩은 이런 식으로 각 파일을 하나의 함수로 만들어 이를 bundle.js 내 리스트로 관리하고 있습니다. 필요한 모듈이 발생하면 해당 모듈을 ``__webpack_require_(index);`` 함수를 통해 해당 모듈의 인덱스를 호출해 로드하고 있네요. 추가로, 모듈 캐싱을 통해 호출에 앞서 이미 호출된 적이 있는지 확인하는 작업도 하고 있습니다. 웹팩의 알뜰살뜰함에 시어머니도 놀라실 것 같아요, 에구머니나!

이뿐만 아니라 모듈은 다수의 분리된 파일을 하나의 파일로 처리한다는 장점을 가지고 있습니다. 앞서 bundle.js는 자바스크립트 모듈들을 하나의 파일로 묶어서 관리하고 있지요. 또는 다양한 설정을 통해 번들링되는 방식을 조절할 수도 있습니다. 예를 들어 작은 이미지를 inlined image로 인코딩해 bundle.js에 묶어서 배포하거나 코드를 난독화 할수도 있습니다. 앞으로 배울 웹팩이 기대가 되네요.

*dynamic loading에는 더 많은 이야기들이 있는 것 같지만...다음에 할래요

### 출처
https://blog.ag-grid.com/webpack-tutorial-understanding-how-it-works/#introduction-to-webpack
https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html
https://auth0.com/blog/javascript-module-systems-showdown/
