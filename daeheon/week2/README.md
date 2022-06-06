## Get Started
<br/>

### [1] import _ 구문은 무엇을 의미하는가 
<br/>

```
import _ from lodash
```

Lodash의 이름 그대로 '_'는 언더스코어 혹은 low dash를 의미한다. 자바스크립트에서 배열, 숫자, 오브젝트, 문자열을 다루는데 도움을 주는 패키지이다. Lodash는 다음의 작업에 도움을 줄 수 있다.

- 배열, 오브젝트, 숫자의 반복
- 값의 조작과 검사
- 합성 함수의 생성 

```
element.innerHTML = _.join(['Hello','webpack'], ' ');
```
핸드북에서 Lodash는 다음과 같이 사용하며 함수의 결과는 "Hello webpack"의 문자열이었다. 나아가, 다음의 예를 참조하면 Lodash의 역할을 이해할 수 있다.

```
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
```

### [2] Webpack mode는 무엇인가
<br/>

Mode는 웹팩에게 built-in 지시된 최적화를 사용할 것을 명시하는 설정 값이다. 각각 DefinePlugin의 process.env.NODE_ENV에서 값을 'development' | 'production' | 'none'으로 결정한다. 추가로
webpack.config.js에서 mode의 값에 따라 행동을 변화시킬 수도 있다.

```
// webpack.custom.config.js
module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};
```

### [3] __dirname은 무엇인가
<br/>
'__dirname'은 현재 실행되고 있는 파일의 절대 경로를 알려주는 Node.js의 환경 변수이다. 'path.resolve()' 함수는 함수의 실행 경러와 다수의 path 세그먼트를 합쳐 하나의 절대경로로 만들어주는 함수이다. 만약 인자로 아무것도 주어지지 않는다면 현재 위치의 절대경로를 출력한다.

```
path2 = path.resolve("users", "admin", "readme.md");
console.log(path2)
// 'G:\tutorials\nodejs-path-resolve\users\admin\readme.md'
```

## Concepts
<br/>

### [1] Entry Points
<br/>

단일 엔트리 포인트는 빠르게 웹팩을 설정하는데 최고의 선택이지만 프로젝트의 스케일링 면에서 유연성이 부족하다. 다중 엔트리 포인트를 이용해 다수의 의존적인 파일을 생성하고 의존성 그래프의 chunk로 묶을 수 있다.

설정 또한 환경, 빌드 목표, 런타임에 따라 문제를 분리시키고 webpack-merge를 통해 설정을 다시 합칠 수 있다. 예를 들어 [webpack-merge](https://github.com/survivejs/webpack-merge)는 웹팩의 설정을 포함해 각종 array, object를 합치는 함수 merge를 제공한다.

다중 엔트리 포인트를 사용할 경우 다음과 같은 Object Syntax를 사용한다.

```
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js',
  },
};
```

다음의 설정은 2개의 다중 엔트리 포인트를 통해 파일을 분리하고 있다. (1) main은 앱 구동을 위한 파일이며 (2) vendor는 자주 업데이트되지 않는 의존성을 위한 js 파일이다. 브라우저는 vendor.js 를 캐시하여 사용함으로써 페이지 로드 시간을 줄일 수 있다. (note: vendor의 분리는 webapck v4이후 optimization.splitChunks를 통해 설정할 것을 권고하고 있다. [링크](https://webpack.js.org/concepts/entry-points/#separate-app-and-vendor-entries))

웹팩의 다중 엔트리 포인트는 다수의 페이지를 생성하는데도 도움을 줄 수 있다.

```
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js',
  },
};
```

이런 식으로 페이지를 여러개 생성한 뒤 앞서 말한 splitChunks를 통해 공유하는 코드를 분리한다. 각 페이지를 로드할 때 서버에서 받아오는 자원을 감소시킬 수 있다.

*가능하다면 각 html 페이지마다 하나의 entry point를 생성하자. Entry point를 통해 생성된 각 bundle은 서로 상태를 공유하지 않는다. [링크](https://bundlers.tooling.report/code-splitting/multi-entry/#webpack) 

### [2] Babel
<br/>

웹팩에서 Babel을 사용하기 위해서는 Babel Loader가 필요하다. Babel을 이용해 CSS, image, TS 파일들을 ES5 코드로 변환할 수 있다. 구체적으로 다음의 3가지 의존성이 필요하다.

- babel-loader: Babel과 Webpack의 상호 인터페이스
- babel-core: 코드를 읽고 parse, 상응하는 결과(ES2015)를 생성
- babel-preset-es2015: ES2015 문법을 변환하기 위한 Babel 프리셋 (현재 버전에서는 @bable/prset-env를 사용하여 ES2015+을 모두 변환할 수 있다)

다음의 코드는 babel을 이용해 js 파일을 es2015 문법으로 변환하고 있다.
```
module: {
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }
    ]
}
```
presets를 통해 문법을 지정할 수 있고 exclude를 통해 node_modules 내 js 파일을 변환하지 않을 것을 지시할 수 있다. preset의 요소는 뒤에서부터 적용된다. ["a", "b", "c"]는 c, b, a 순으로 적용된다

## Tutorials
<br/>

[1] DevServer

webpack-dev-server는 빠르게 어플리케이션을 개발하기 위한 수단이다. 다음은 일반적인 webpack-dev-server의 설정을 보여준다.

```
const path = require('path');

module.exports = {
  //...
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};
```

public/ 디렉터리에 있는 모든 요소를 [gzip](https://git.savannah.gnu.org/cgit/gzip.git)을 통해 압축하여 제공한다. Node.js API를 통해 devServer를 운영할 경우에 devServer 설정은 무시된다. devServer에 문제가 발생할 경우 http://localhost:9000/webpack-dev-server 를 참조하면 오류를 확인할 수 있다. 