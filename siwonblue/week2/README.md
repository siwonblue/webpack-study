
# π±μμνκΈ°

### μΉν© μ€μΉ

```bash
$npm i webpack webpack-cli -D
```

### λͺλ Ήμ΄ μ€ν

package.json μ€ν¬λ¦½νΈμ build λͺλ Ήμ΄ μ΄μ©ν΄μ μ¬μ©

```json
{
  "scripts" : {
    "build": "webpack"
  }  
}
```



### configuration

package.json μ μλμ κ°μ΄ νλμ© μ€μ ν΄λ λ¨
```json
{
  "scripts" : {
    "build": "webpack --mode=none --entry=src/index.js"
  }  
}
```

κ·Όλ° μμ°μ±μ΄ λ¨μ΄μ§κΈ° λλ¬Έμ webpack.config.js λ‘ κ΄λ¦¬

- νλ‘μ νΈ λ£¨νΈν΄λμ webpack.config.js μμ±

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


### λμ μμ

webpack.config.js νμΌ μμ΄λ μΉν© μ€ννλ©΄ λν΄νΈ κ°μΌλ‘ μ μ©λλ λ΄μ©μ
λ€μκ³Ό κ°μ
- entry : src/index.js
- output : dist/main.js

μΉν©μ μ€ννκ² λλ©΄ output μΌλ‘ κ²°κ³Όλ¬Όμ΄ λμ€κ² λκ³  κ·Έ νμΌμ index.html μ μ°κ²°μν€λ©΄ λ¨





# π±κ°λ

### μΉν© μ£Όμ μμ± λ€ κ°μ§

- entry
- output
- loader
- plugin

### entry

- μΉν©μ΄ μ΅μ΄ μ§μνλ js νμΌμ κ²½λ‘ μ§μ 
- νλμ HTML νμ΄μ§μ νλμ entry point  
  SPA λ νλ, MPA λ λ€μμ μνΈλ¦¬ ν¬μΈνΈκ° νμ

```js
// webpack.config.js
module.exports = {
  entry: './src/index.js'
}
```


### output

- μΉν©μ΄ μ€νλκ³  λ ν κ²°κ³Όλ¬Όμ΄ λμ€λ κ²½λ‘
- μνΈλ¦¬ μ΄λ¦, ν΄μ κ° λ± λμ μΌλ‘ μ€μ  κ°λ₯
```js
// webpack.config.js
module.exports = {
  output: {
    filename: 'bundle.js'
  }
}
```

### loader
- jsκ° μλ λ€λ₯Έ μΉ μμμ ν΄μν  μ μκ² ν΄μ£Όλ μμ±
- λ‘λλ₯Ό ν΅ν΄μ λ€λ₯Έ μΉ μμμ λͺ¨λ jsλ‘ λ³ν
- λ‘λ μ€μ μ ν΄λμ§ μμΌλ©΄ js νμΌμ λ€λ₯Έ μΉ μμμ΄ μλ κ²½μ° μ€λ₯ λ°μ
  ex. js νμΌμ css λͺ¨λμ΄ μλ κ²½μ° μ€λ₯ λ°μ

```js
// webpack.config.js
module.exports = {
  module: {
    rules: []
  }
}
```

- μλμ²λΌ loader λ λͺ¨λ μ€μΉ ν μ§μ  λ£μ΄ μ€μΌ ν¨
- module : {rules : []} μ μ€μ 

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

λ‘λ μ€μ μ νμ§ μμΌλ©΄ css νμΌμ μ²λ¦¬ν  μ μμ΄μ λ€μκ³Ό κ°μ μ€λ₯ λ°μ
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




μμ£Ό μ¬μ©νλ λ‘λ μ’λ₯
- **babel loader**
- Sass loader
- File loader
- Vue loader
- Ts loader
- **μ¬λ¬ κ°μ λ‘λλ₯Ό μ¬μ©ν  κ²½μ° μ€λ₯Έμͺ½μμ μΌμͺ½μΌλ‘ μ μ©**



### Plugin

- κ²°κ³Όλ¬Όμ ννλ₯Ό λ³κ²½
- λ‘λμ μ°¨μ΄μ   
  λ‘λλ νμΌμ ν΄μνλ κ³Όμ μ κ΄μ¬νμ§λ§ νλ¬κ·ΈμΈμ κ²°κ³Όλ¬Όμ κ΄μ¬

```js
// webpack.config.js
module.exports = {
  plugins: []
}
```
- νλ¬κ·ΈμΈμ λ°°μ΄μλ μμ±μ ν¨μλ‘ μμ±ν κ°μ²΄ μΈμ€ν΄μ€λ§ μΆκ° κ°λ₯

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

μμ£Ό μ¬μ©νλ νλ¬κ·ΈμΈ
- split-chunks-plugin
- clean-webpack-plugin
- image-webpack-loader
- webpack-bundle-analyzer-plugin


### code spliting
- plugin κΈ°λ₯μ μ΄μ©ν΄μ κ²°κ³Όλ¬Όμ μ¬λ¬ νμΌλ‘ μͺΌκ°€ μ μμ
- μνλ μμμ νμν  λλ§ μ¬μ©νκΈ° μν΄ ν νμΌλ‘ λ³ννμ§ μκ³  μ¬λ¬ κ°λ‘ μͺΌκ°λ κ²μ




# π±μμ½

- webpack μ λͺ¨λ  μΉ μμ (css, images, ...) μ js λ‘ λ°κΏ
- λ°κΏμ£Όλ μ€λ¬΄μλ loader
- loader μ€μ  μ ν΄λλ©΄ λ€λ₯Έ μμμ js λ‘ λͺ» λ°κΏ
- μΉν© λΉλ κ³Όμ μμ μ€μν λ€ κ°μ§ ν¬μΈνΈ
    - entry  : μ΄ νμΌμ ν΅ν΄μ λΉλ μμ
    - output : κ²°κ³Όλ¬Όμ μ΄ κ³³μΌλ‘
    - loader : js μΈμ λ€λ₯Έ μΉ μμμ js λ‘ λ°κΎΈλ μ€μ 
    - plugin : κ²°κ³Όλ¬Όμ μ΄λ»κ² μ‘°μν μ§ κ²°μ  (ex. code spliting)

![](https://velog.velcdn.com/images/siwonblue/post/1a738444-7096-43d4-ada7-08fed34fb15f/image.png)




## μΆμ²
https://joshua1988.github.io/webpack-guide/  
https://createapp.dev/webpack  
https://webpack.js.org/configuration/