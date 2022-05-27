맛있는 김치를 담구기 위한 노력

웹팩은 무엇인가?

웹팩은 자바스크립트 어플리케이션을 위한 정적 모듈 번들러입니다. 웹팩은 (1) '의존성 그래프' 만들기, (2) '번들링'이라는 두가지 중요한 작업을 수행합니다. 하나의 파일이 다른 파일의 존재에 의존할 때 나타나는 관계를 의존성이라고 하는데요, 웹팩은 이미지, 폰트와 같은 코드가 아닌 자원들을 의존성으로 다룹니다. 웹팩은 작업이 시작되면 entry point에서 출발해서 각 파일에 필요한 모듈을 의존성 그래프로 그리고 모듈들을 묶어 브라우저에 의해 로드될 수 있는 소수의 번들로 완성합니다. 따라서 불필요한 모듈을 로드할 필요 없이 필요한 모듈만 제때 사용할 수 있습니다. 음, 더이상 총각김치와 배추김치를 섞어먹을 필요가 없는 것이죠, 완벽해.

![image](https://user-images.githubusercontent.com/75231844/170634212-ebb65cdd-4896-4a33-9725-a2b4c1a0fa5f.png)

위의 이미지를 보신적이 있나요? 아이고 머리야! 이럴 경우, multiply.js 보다 sum.js보다 먼저 삽입하거나 index.js를 두 js보다 먼저 삽입하면 오류가 발생합니다. 간단한 예제이지만, 웹 앱의 복잡도가 올라가면서 수많은 의존성의 순서를 결정하는 것조차 버거운 일이 될 수 있습니다. 또한 자바스크립트의 전역 변수 관리도 문제가 됩니다. 웹팩은 필요한 모듈을 올바른 스코프 내에서 사용하며 이러한 문제들을 극복합니다. 그렇다면 어떤 식으로 웹팩은 이런 마법을 부리는 걸까요?

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

이뿐만 아니라 모듈은 다수의 분리된 파일을 하나의 파일로 처리한다는 장점을 가지고 있습니다. 앞서 bundle.js는 자바스크립트 모듈들을 하나의 파일로 묶어서 관리하고 있지요. 또는 다양한 설정을 통해 번들링되는 방식을 조절할 수도 있습니다. 예를 들어 작은 이미지를 inlined image로 인코딩해 bundle.js에 묶어서 배포하거나 코드를 난독화 할수도 있습니다. 기대가 되네요.

https://blog.ag-grid.com/webpack-tutorial-understanding-how-it-works/#introduction-to-webpack
