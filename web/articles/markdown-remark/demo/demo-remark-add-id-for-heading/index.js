var unified = require('unified');
var remarkParse = require('remark-parse');
var stringify = require('rehype-stringify');
var remark2rehype = require('remark-rehype');

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
    .use(function (userConfig) {
        console.log('userConfig.userConfigText: ', userConfig.userConfigText);

        const parser = this.Parser;

        const tokenizersBlock = parser.prototype.blockTokenizers;
      
        // tokenizersBlock.atxHeading
        console.log('tokenizersBlock.atxHeading:', tokenizersBlock.atxHeading);
        return function(tree) {
            tree.children.forEach(element => {
                if (element.type === 'heading') {
                    element.id = element.children[0].value;
                    console.log(element);
                }
            });
        }
    }, {
        userConfigText: '123'
    })
    .use(remark2rehype)
    .use(stringify)
    .process(testFile, (err, file) => {
        console.log(String(file))
    });