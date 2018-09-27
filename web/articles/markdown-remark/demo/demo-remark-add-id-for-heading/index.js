var unified = require('unified');
var remarkParse = require('remark-parse');
var stringify = require('rehype-stringify');
var remark2rehype = require('remark-rehype');
var remarkAddIdForHeading = require('./plugin');

const testFile = `
# Hello World

> 说明。

## Table of Content

## Install

A **example**.

## Use

More text.

## License

MIT
`;

unified()
    .use(remarkParse)
    .use(remarkAddIdForHeading)
    .use(remark2rehype)
    .use(stringify)
    .process(testFile, (err, file) => {
        console.log(String(file))
    });
