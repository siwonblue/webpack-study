# ๐ WebPack ์คํฐ๋ Week3

## โ๏ธ webpack-dev-server

- `webpack-dev-server`๋ ์ฝ๋ ๋ณ๊ฒฝ์ ๊ฐ์งํด์ ์นํฉ์ ์๋์ผ๋ก ์คํ์์ผ ์ค. 

- ๊ฒฐ๊ณผ ํ์ผ์ด ๋ง๋ค์ด์ง๋ฉด ๋ธ๋ผ์ฐ์ ๋ฅผ ์๋์ผ๋ก ๋ฆฌ๋ก๋ ์์ผ์ฃผ๊ธฐ๋ ํจ. 

- webpack-dev-server๋ webpack์ ์คํํ๊ณ  ๋์จ ๊ฒฐ๊ณผ๋ฌผ์ **output์์ ์ง์ ํ ํ์ผ๋ก ๋ด๋ณด๋ด๋ ๊ฒ์ด ์๋๊ณ **, webpack-dev-server์์ ์ ๊ณตํ๋ ์์ฒด ์คํฌ๋ฆฝํธ๋ฅผ ํฌํจ์์ผ์ **๋ฉ๋ชจ๋ฆฌ ์์ ์ ์ฅํ๊ณ  ์์ฒด ์น ์๋ฒ๋ฅผ ํตํด ๋ฐฐํฌํจ**. 

- ์ฆ, webpack-dev-server๋ก ๋น๋ํ ๊ฒฐ๊ณผ๋ฌผ์ ๋ฉ๋ชจ๋ฆฌ์ ์ ์ฅ o, ํ์ผ ์์ฑ x *(ํ์ผ ์์ถ๋ ฅ๋ณด๋ค ๋ฉ๋ชจ๋ฆฌ ์์ถ๋ ฅ์ด ๋ ๋น ๋ฆ..! )* </br>
  โ ๋ฐ๋ผ์ ๊ฐ๋ฐ์ด ์๋ฃ๋๋ฉด ๊ฒฐ๊ณผ๋ฌผ์ ํ์ผ๋ก ์์ฑํด์ผ ํจ. 

</br>

![image](https://user-images.githubusercontent.com/89721027/174442584-f832b4dd-53b8-48c8-ae22-ef7dc5e3484f.png)

- ์๋ฒ๊ฐ ์์๋๋ฉด ํด์๋ ๋ชจ๋ ๋ชฉ๋ก ์์ ๋ฉ์ธ์ง๊ฐ ํ์๋จ. ์ด๋ฅผ ํตํด ์๋ฒ๊ฐ ์ด๋์ ์๊ณ  ๋ฌด์์ ์ ๊ณตํ๋์ง ์ ์ ์์. 

</br>
</br>

## โ๏ธ ํ๋ก์(Proxy) ์ค์ 

- ๋ธ๋ผ์ฐ์ ์์ API๋ฅผ ์์ฒญํ  ๋์๋ ๋ธ๋ผ์ฐ์ ์ ํ์ฌ ์ฃผ์์ API ์ฃผ์์ ๋๋ฉ์ธ์ด ์ผ์นํด์ผ๋ง ๋ฐ์ดํฐ ์ ๊ทผ์ด ๊ฐ๋ฅ. 

- [CORS์ค์ ](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS#HTTP_%EC%9D%91%EB%8B%B5_%ED%97%A4%EB%8D%94)์ ํ๋ค๋ฉด ๋ค๋ฅธ ๋๋ฉ์ธ์์ API๋ฅผ ์์ฒญํ์ฌ ์ฌ์ฉ ๊ฐ๋ฅ. 

> CORS๋ *Cross-Origin Resource Sharing*๋ก ์ถ๊ฐ HTTP ํค๋๋ฅผ ์ฌ์ฉํ์ฌ ํ ์ถ์ฒ์์ ์คํ ์ค์ธ ์น ์ ํ๋ฆฌ์ผ์ด์์ด ๋ค๋ฅธ ์ถ์ฒ์ ์์์ ์ ๊ทผํ  ์ ์๋ ๊ถํ์ ๋ถ์ฌํ๋๋ก ๋ธ๋ผ์ฐ์ ์ ์๋ ค์ฃผ๋ ์ฒด์ . 

- ๊ทธ๋ฌ๋ webpack-dev-server์์ ์ ๊ณตํ๋ ***Proxy***๋ฅผ ์ฌ์ฉํ๋ฉด ๋ฐ๋ก CORS ์ค์ ์ ํ๊ฑฐ๋ ๋ฐฑ์๋ ๊ฐ๋ฐ์์๊ฒ ๋๋ฉ์ธ ํ์ฉ์ ์์ฒญํ์ง ์์๋ ๋จ. 

</br>


![image](https://user-images.githubusercontent.com/89721027/174442821-610f600f-982b-4b1e-b33d-e2f65176ed57.png)

- Proxy๋ฅผ ์ฌ์ฉํ๋ฉด ๋ธ๋ผ์ฐ์  API๋ฅผ ์์ฒญํ  ๋ ๋ฐฑ์๋ ์๋ฒ๊ฐ ์๋ ํ์ฌ ๊ฐ๋ฐ ์๋ฒ๋ก ์์ฒญ. 
- webpack-dev-server์์๋ ํด๋น ์์ฒญ์ ๋ฐ์ ๋ฐฑ์๋ ์๋ฒ๋ก ์ ๋ฌ. 
- ๋ฐฑ์๋ ์๋ฒ์์๋ ์๋ตํ ๋ด์ฉ์ ๋ค์ ๋ธ๋ผ์ฐ์  ์ชฝ์ผ๋ก ๋ฐํ. 

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
- Proxy ์์ฑ ์ค์ 

</br>

![image](https://user-images.githubusercontent.com/89721027/174442875-77859e30-5f58-445d-96a2-deeb2a392815.png)

- ์ค์  ๋ธ๋ผ์ฐ์ ์์๋ `localhost:8080/api/login`๋ก ์์ฒญํ์ง๋ง ํ๋ก์ ์๋ฒ๋ก ์ธํด `domain.com`์๋ฒ์์๋ ๊ฐ์ ๋๋ฉ์ธ์์ ์จ ์์ฒญ์ผ๋ก ์ธ์ํด CORS ์๋ฌ๊ฐ ๋์ง ์์. 

</br>
</br>


## โ๏ธ Hot Module Replacement

> [HMR](https://webpack.kr/guides/hot-module-replacement/)๋ฅผ ์ฌ์ฉํ๋ฉด ๋ชจ๋  ์ข๋ฅ์ ๋ชจ๋์ ์๋ก๊ณ ์น๋ฏธ ํ  ํ์์์ด ๋ฐํ์์ ์๋ฐ์ดํธ ๊ฐ๋ฅ. </br>
> `webpack-dev-server
 v4.0.0` ๋ถํฐ Hot Module Replacement๊ฐ ๊ธฐ๋ณธ์ ์ผ๋ก ํ์ฑํ๋์ด ์๋ค๊ณ  ํ๋ค,,,! 
 
</br>

webpack.config.js

```js
module.exports = {
  devServer: {
    hot: true
  }
}
```
- HMR ์ค์ 

</br>
</br>

## โ๏ธ Source Map

> ์์ค ๋งต์ด๋ ๋ฐฐํฌ์ฉ์ผ๋ก ๋น๋ํ ํ์ผ๊ณผ ์๋ณธ ํ์ผ์ ์ฐ๊ฒฐ์์ผ์ฃผ๋ ๊ธฐ๋ฅ. 

- ๋ฒ๋ค๋ง๋ ํ์ผ๋ค์ ํ์ด์ง์์ ์๋ฌ๊ฐ ๋ฐ์ํ  ๊ฒฝ์ฐ ๋๋ฒ๊นํ๊ธฐ๊ฐ ์ด๋ ค์. โ ๋ฐ๋ผ์ Source Map์ด ๋ฑ์ฅโฆ! 

- ์๋ณธ์ฝ๋๋ฅผ ์ธ์ฝ๋ฉํ์ฌ ํน์  ํค์๋๋ก ๋งคํ ํด๋์ผ๋ฉด ๋์ค์ ๋ธ๋ผ์ฐ์ ์์ ๋์ฝ๋ฉํ์ฌ ๋ณต์ ๊ฐ๋ฅ. 

</br>

webpack.config.js

```js
module.exports = {
  devtool: 'cheap-eval-source-map'
}
```

- ์์ค ๋งต ์ค์ 

</br>
</br>

## โ๏ธ mode

![image](https://user-images.githubusercontent.com/89721027/174446712-03d7d55a-8e0c-49ab-9ebd-0a5fdfe40c24.png)


- mode ์ค์ ์ ํ๋ผ๋ ๊ฒฝ๊ณ 

- [์๊ธฐ](https://webpack.js.org/configuration/mode/)์์ ๊ฐ๊ฐ์ ๋ชจ๋๊ฐ ์ด๋ค ์๋ฏธ๋ฅผ ๊ฐ๋์ง ํ์ธ ๊ฐ๋ฅ, ๊ฐ๊ฐ์ ๋ชจ๋์์ ์๋ต๋ option๋ ํ์ธ ๊ฐ๋ฅ. 

</br>
</br>

mode ๊ฐ์ ์ค์ ์ ์ํ๋ฉด production์ด ๊ธฐ๋ณธ๊ฐ์ด๊ณ  none, development, production 3๊ฐ์ง ์ค์ ์ ํํ  ์ ์์. 

- `none`ย : ๋ชจ๋ ์ค์  ์ํจ
- `development`ย : ๊ฐ๋ฐ ๋ชจ๋
- `production`ย : ๋ฐฐํฌ ๋ชจ๋

</br>
</br>


![image](https://user-images.githubusercontent.com/89721027/174446828-3ccf142d-8a71-48b0-b105-4a7852411ee0.png)
- ๋ณดํต ๊ฐ๋ฐ์ ํ  ๋์ ๋ฐฐํฌ๋ฅผ ํ  ๋์๋ ๋ชจ๋๊ฐ ๋ค๋ฅผ ์ ๋ฐ์ ์์. 
- ๋ฐ๋ผ์ `webpack.config.js`(development ๋ชจ๋)์ `webpack.config.prod.js`(production ๋ชจ๋)๋ฅผ ๋ฐ๋ก ๋ง๋ค์ด์ ์คํ. 
- `webpack.config.prod.js`๋ฅผ ์คํ์ํค๊ณ  ์ถ๋ค๋ฉด `npx webpack โconfig webpack.config.prod.js`๋ก ๋ช๋ นํ์ฌ ๋ฒ๋ค๋ง์ ์ํค๋ฉด ๋จ. 

</br>
</br>


## โ๏ธ Webpack Merge

> ์์์ ๋ชจ๋์ ๋ฐ๋ผ ํ์ผ์ ๋๋  ๋์์ ๋ `Webpack Merge`๋ฅผ ์ฌ์ฉ ๊ฐ๋ฅ. 

</br>

```
webpack.common.js
webpack.dev.js
webpack.prod.js
```

- ์นํฉ ๋จธ์ง๋ฅผ ํจ์จ์ ์ผ๋ก ์ฌ์ฉํ๊ธฐ ์ํด `๊ฐ๋ฐ์ฉ`, `๋ฐฐํฌ์ฉ`, `๊ณตํต๋ถ๋ถ`์ ๋ถ๋ฆฌ 

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
      // index.html ํํ๋ฆฟ์ ๊ธฐ๋ฐ์ผ๋ก ๋น๋ ๊ฒฐ๊ณผ๋ฌผ์ ์ถ๊ฐํด์ค
      template: 'index.html',
    }),
  ],
};
```

- ๊ณตํต ์ค์  ํ์ผ์๋ ์คํ ๋ชจ๋์ ๊ด๊ณ ์์ด ํญ์ ๋ค์ด๊ฐ์ผ ํ๋ ์ฝ๋๋ฅผ ์ถ๊ฐ. 

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

- ๊ฐ๋ฐ์ฉ ์ค์  ํ์ผ์๋ ๊ฐ๋ฐ์ ๋๊ตฌ๋ ์นํฉ ๋ฐ๋ธ ์๋ฒ์ ๊ฐ์ ์ค์  ์ถ๊ฐ. 
- ๋ํ `webpack.common.js`ํ์ผ์ ๋ก๋ฉํ์ฌ ๊ฐ์ด merge. 

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

- ๋ฐฐํฌ์ฉ ์ค์  ํ์ผ์๋ ์น ๋ฆฌ์์ค ์ต์ ํ๋ฅผ ์ํ ์ค์  ์ถ๊ฐ. 
- ์ฌ๊ธฐ์๋ `webpack.common.js`ํ์ผ์ ๋ก๋ฉํ์ฌ ๊ฐ์ด merge.
