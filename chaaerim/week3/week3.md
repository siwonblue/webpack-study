# 🔎 WebPack 스터디 Week3

## ✔️ webpack-dev-server

- `webpack-dev-server`는 코드 변경을 감지해서 웹팩을 자동으로 실행시켜 줌. 

- 결과 파일이 만들어지면 브라우저를 자동으로 리로드 시켜주기도 함. 

- webpack-dev-server는 webpack을 실행하고 나온 결과물을 **output에서 지정한 파일로 내보내는 것이 아니고**, webpack-dev-server에서 제공하는 자체 스크립트를 포함시켜서 **메모리 상에 저장하고 자체 웹 서버를 통해 배포함**. 

- 즉, webpack-dev-server로 빌드한 결과물은 메모리에 저장 o, 파일 생성 x *(파일 입출력보다 메모리 입출력이 더 빠름..! )* </br>
  → 따라서 개발이 완료되면 결과물을 파일로 생성해야 함. 

</br>

![image](https://user-images.githubusercontent.com/89721027/174442584-f832b4dd-53b8-48c8-ae22-ef7dc5e3484f.png)

- 서버가 시작되면 해석된 모듈 목록 앞에 메세지가 표시됨. 이를 통해 서버가 어디에 있고 무엇을 제공하는지 알 수 있음. 

</br>
</br>

## ✔️ 프록시(Proxy) 설정

- 브라우저에서 API를 요청할 때에는 브라우저의 현재 주소와 API 주소의 도메인이 일치해야만 데이터 접근이 가능. 

- [CORS설정](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS#HTTP_%EC%9D%91%EB%8B%B5_%ED%97%A4%EB%8D%94)을 한다면 다른 도메인에서 API를 요청하여 사용 가능. 

> CORS는 *Cross-Origin Resource Sharing*로 추가 HTTP 헤더를 사용하여 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제. 

- 그러나 webpack-dev-server에서 제공하는 ***Proxy***를 사용하면 따로 CORS 설정을 하거나 백엔드 개발자에게 도메인 허용을 요청하지 않아도 됨. 

</br>


![image](https://user-images.githubusercontent.com/89721027/174442821-610f600f-982b-4b1e-b33d-e2f65176ed57.png)

- Proxy를 사용하면 브라우저 API를 요청할 때 백엔드 서버가 아닌 현재 개발 서버로 요청. 
- webpack-dev-server에서는 해당 요청을 받아 백엔드 서버로 전달. 
- 백엔드 서버에서는 응답한 내용을 다시 브라우저 쪽으로 반환. 

</br>

webpack.config.js
```js
module.exports = {
  devServer: {
    proxy: {
      '/api': 'domain.com'
    }
  }
};
```
- Proxy 속성 설정

</br>

![image](https://user-images.githubusercontent.com/89721027/174442875-77859e30-5f58-445d-96a2-deeb2a392815.png)

- 실제 브라우저에서는 `localhost:8080/api/login`로 요청했지만 프록시 서버로 인해 `domain.com`서버에서는 같은 도메인에서 온 요청으로 인식해 CORS 에러가 나지 않음. 

</br>
</br>


## ✔️ Hot Module Replacement

> [HMR](https://webpack.kr/guides/hot-module-replacement/)를 사용하면 모든 종류의 모듈을 새로고치미 할 필요없이 런타임에 업데이트 가능. </br>
> `webpack-dev-server
 v4.0.0` 부터 Hot Module Replacement가 기본적으로 활성화되어 있다고 한다,,,! 
 
</br>

webpack.config.js

```js
module.exports = {
  devServer: {
    hot: true
  }
}
```
- HMR 설정

</br>
</br>

## ✔️ Source Map

> 소스 맵이란 배포용으로 빌드한 파일과 원본 파일을 연결시켜주는 기능. 

- 번들링된 파일들은 페이지에서 에러가 발생할 경우 디버깅하기가 어려움. → 따라서 Source Map이 등장…! 

- 원본코드를 인코딩하여 특정 키워드로 매핑 해놓으면 나중에 브라우저에서 디코딩하여 복원 가능. 

</br>

webpack.config.js

```js
module.exports = {
  devtool: 'cheap-eval-source-map'
}
```

- 소스 맵 설정

</br>
</br>

## ✔️ mode

![image](https://user-images.githubusercontent.com/89721027/174446712-03d7d55a-8e0c-49ab-9ebd-0a5fdfe40c24.png)


- mode 설정을 하라는 경고

- [요기](https://webpack.js.org/configuration/mode/)에서 각각의 모드가 어떤 의미를 갖는지 확인 가능, 각각의 모드에서 생략된 option도 확인 가능. 

</br>
</br>

mode 값은 설정을 안하면 production이 기본값이고 none, development, production 3가지 중에 선택할 수 있음. 

- `none` : 모드 설정 안함
- `development` : 개발 모드
- `production` : 배포 모드

</br>
</br>


![image](https://user-images.githubusercontent.com/89721027/174446828-3ccf142d-8a71-48b0-b105-4a7852411ee0.png)
- 보통 개발을 할 때와 배포를 할 때에는 모드가 다를 수 밖에 없음. 
- 따라서 `webpack.config.js`(development 모드)와 `webpack.config.prod.js`(production 모드)를 따로 만들어서 실행. 
- `webpack.config.prod.js`를 실행시키고 싶다면 `npx webpack —config webpack.config.prod.js`로 명령하여 번들링을 시키면 됨. 

</br>
</br>


## ✔️ Webpack Merge

> 앞에서 모드에 따라 파일을 나눠 놓았을 때 `Webpack Merge`를 사용 가능. 

</br>

```
webpack.common.js
webpack.dev.js
webpack.prod.js
```

- 웹팩 머지를 효율적으로 사용하기 위해 `개발용`, `배포용`, `공통부분`을 분리 

</br>

webpack.common.js

```jsx
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
      template: 'index.html',
    }),
  ],
};
```

- 공통 설정 파일에는 실행 모드에 관계 없이 항상 들어가야 하는 코드를 추가. 

</br>
</br>

webpack.dev.js

```jsx
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 9000,
  },

});
```

- 개발용 설정 파일에는 개발자 도구나 웹팩 데브 서버와 같은 설정 추가. 
- 또한 `webpack.common.js`파일을 로딩하여 같이 merge. 

</br>
</br>

webpack.prod.js

```jsx
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production'
});
```

- 배포용 설정 파일에는 웹 리소스 최적화를 위한 설정 추가. 
- 여기서도 `webpack.common.js`파일을 로딩하여 같이 merge.
