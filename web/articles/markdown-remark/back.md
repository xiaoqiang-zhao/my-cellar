
直接输出是最基本的能力，支持的多种插件，表格、代码高亮、数学公式。CSS 是否提供，怎么自定义。


You should pick a name prefixed by 'remark-', such as remark-lint.

if the thing you create cannot be given to remark().use(), it isn’t a “plugin”. Don’t use the remark- prefix as that could confuse users. 

If it works with the HAST tree, use 'mdast-util-'

if it works with any Unist tree, use unist-util-

if it works with virtual files, use vfile-.
