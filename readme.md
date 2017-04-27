# zipy [![Build Status](https://travis-ci.org/kevva/zipy.svg?branch=master)](https://travis-ci.org/kevva/zipy)

> Simple service for creating ZIP files


## Install

```
$ npm install --save zipy
```


## Usage

```
$ zipy --help

  Simple service for creating ZIP files

  Usage
    $ zipy

  Options
    --port  Port to listen on
```


## Programmatic usage

```js
const zipy = require('zipy');

zipy.listen(3000, () => {
	console.log('Listening on http://localhost:3000');
});
```


## License

MIT © [Kevin Martensson](http://github.com/kevva)
