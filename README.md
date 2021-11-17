# lhs-pages

[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> static web app workflow

## Installation

```shell
$ yarn add lhs-pages

# or npm
$ npm install lhs-pages
```

## Usage

<!-- TODO: Introduction of API use -->

```javascript
const zcePages = require("lhs-pages");
const result = zcePages("zce");
// result => 'zce@zce.me'
```

## API

<!-- TODO: Introduction of API -->

### zcePages(name[, options])

#### name

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'zce.me'`

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; zce <w@zce.me> (https://zce.me)

[downloads-image]: https://img.shields.io/npm/dm/lhs-pages.svg
[downloads-url]: https://npmjs.org/package/lhs-pages
[version-image]: https://img.shields.io/npm/v/lhs-pages.svg
[version-url]: https://npmjs.org/package/lhs-pages
[license-image]: https://img.shields.io/github/license/zce/lhs-pages.svg
[license-url]: https://github.com/zce/lhs-pages/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/zce/lhs-pages.svg
[dependency-url]: https://david-dm.org/zce/lhs-pages
[devdependency-image]: https://img.shields.io/david/dev/zce/lhs-pages.svg
[devdependency-url]: https://david-dm.org/zce/lhs-pages?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: https://standardjs.com
