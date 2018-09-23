/**
 * 为 heading 添加 id 插件
 */

/**
 * 是否是 markdown 的语法分析器
 *
 * @param {Object} parser 分析器
 * @return {boolean} 是否是 markdown 的语法分析器
 */
function isRemarkParser(parser) {
    return Boolean(
        parser
        && parser.prototype
        && parser.prototype.inlineTokenizers
        && parser.prototype.inlineTokenizers.link
        && parser.prototype.inlineTokenizers.link.locator
    );
}

function tokenizeGenerator(oldParser) {
    function token(eat, value, silent) {
        // This we call the old tokenize
        const self = this;
        let eaten = oldParser.call(self, eat, value, silent);

        if (!eaten || !eaten.position) {
            return undefined;
        }

        const id = eaten.children[0].value;
        // 如果担心两行标题文字完全相同的问题，
        // 可以加用行号 eaten.position.start.line;
        if (eaten.data) {
            eaten.data.hProperties.id = id;
        }
        else {
            eaten.data = {
                hProperties: {
                    id
                }
            };
        }
        return eaten;
    }

    // Return the new tokenizer function
    return token;
}

/**
 * 入口函数
 */
function remarkAddIdForHeading() {
    const parser = this.Parser;

    if (!isRemarkParser(parser)) {
        throw new Error('Missing markdown parser. (npm install remark-parse)');
    }

    const tokenizersBlock = parser.prototype.blockTokenizers;

    // replace the old tokenizer by the new one
    const oldElem = tokenizersBlock.atxHeading;
    tokenizersBlock.atxHeading = tokenizeGenerator(oldElem);
}

module.exports = remarkAddIdForHeading;
