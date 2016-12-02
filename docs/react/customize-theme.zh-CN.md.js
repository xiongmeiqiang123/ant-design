webpackJsonp([91,202],{

/***/ 1753:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	  "content": ["article", ["p", "Ant Design 设计规范上支持一定程度的样式定制，以满足业务和品牌上多样化的视觉需求，包括但不限于主色、圆角、边框和部分组件的视觉定制。"], ["p", ["img", {
	    "title": null,
	    "src": "https://zos.alipayobjects.com/rmsportal/zTFoszBtDODhXfLAazfSpYbSLSEeytoG.png",
	    "alt": null
	  }]], ["h2", "样式变量"], ["p", "antd 的样式使用了 ", ["a", {
	    "title": null,
	    "href": "http://lesscss.org/"
	  }, "Less"], " 作为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整。"], ["ul", ["li", ["p", ["a", {
	    "title": null,
	    "href": "https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less"
	  }, "默认样式变量"]]]], ["p", "如果以上变量不能满足你的定制需求，可以给我们提 issue。"], ["h2", "定制方式"], ["p", "我们使用 ", ["a", {
	    "title": null,
	    "href": "http://lesscss.org/usage/#using-less-in-the-browser-modify-variables"
	  }, "modifyVars"], " 的方式来覆盖变量。\n在具体工程实践中，有 ", ["code", "package.theme"], " 和 ", ["code", "less"], " 两种方案，选择一种即可。"], ["p", "可以在本地运行 ", ["a", {
	    "title": null,
	    "href": "https://github.com/ant-design/antd-init/tree/master/examples/customize-antd-theme"
	  }, "例子"], " 查看定制效果。"], ["h3", "1) package.theme（推荐）"], ["p", "配置在 ", ["code", "package.json"], " 下的 ", ["code", "theme"], " 字段。theme 可以为配置为一个对象或文件路径。"], ["pre", {
	    "lang": "js",
	    "highlighted": "<span class=\"token string\" >\"theme\"</span><span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >{</span>\n  <span class=\"token string\" >\"@primary-color\"</span><span class=\"token punctuation\" >:</span> <span class=\"token string\" >\"#1DA57A\"</span><span class=\"token punctuation\" >,</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >,</span>"
	  }, ["code", "\"theme\": {\n  \"@primary-color\": \"#1DA57A\",\n},"]], ["p", "或者 ", ["a", {
	    "title": null,
	    "href": "https://github.com/ant-design/antd-init/blob/master/examples/customize-antd-theme/theme.js"
	  }, "一个 js 文件"], "："], ["pre", {
	    "lang": "js",
	    "highlighted": "<span class=\"token string\" >\"theme\"</span><span class=\"token punctuation\" >:</span> <span class=\"token string\" >\"./theme.js\"</span><span class=\"token punctuation\" >,</span>"
	  }, ["code", "\"theme\": \"./theme.js\","]], ["p", "定义 ", ["code", "package.theme"], " 时， 需要配合 ", ["a", {
	    "title": null,
	    "href": "https://github.com/ant-tool/atool-build"
	  }, "atool-build"], " 使用（", ["a", {
	    "title": null,
	    "href": "https://github.com/ant-design/antd-init"
	  }, "antd-init"], " 和 ", ["a", {
	    "title": null,
	    "href": "https://github.com/dvajs/dva-cli"
	  }, "dva-cli"], " 内建支持）。如果你使用的是其他脚手架，可以参考 ", ["a", {
	    "title": null,
	    "href": "https://github.com/ant-tool/atool-build/blob/a4b3e3eec4ffc09b0e2352d7f9d279c4c28fdb99/src/getWebpackCommonConfig.js#L131-L138"
	  }, "atool-build 中 less-loader 的 webpack 相关配置 "], "，利用 ", ["a", {
	    "title": null,
	    "href": "https://github.com/webpack/less-loader#less-options"
	  }, "less-loader"], " 的 ", ["code", "modifyVars"], " 配置来覆盖原来的样式变量。"], ["p", "注意，样式必须加载 less 格式。如果您使用了 ", ["code", "babel-plugin-import"], "，请将 style 属性配置为 ", ["code", "true"], " 或 ", ["code", "less"], "。"], ["h3", "2) less"], ["p", "用 less 文件进行变量覆盖。"], ["p", "建立一个单独的 ", ["code", "less"], " 文件如下，再引入这个文件。"], ["pre", {
	    "lang": "css",
	    "highlighted": "<span class=\"token atrule\" ><span class=\"token rule\" >@import</span> <span class=\"token string\" >\"~antd/dist/antd.less\"</span><span class=\"token punctuation\" >;</span></span>   // 引入官方提供的 less 样式入口文件\n<span class=\"token atrule\" ><span class=\"token rule\" >@import</span> <span class=\"token string\" >\"your-theme-file.less\"</span><span class=\"token punctuation\" >;</span></span>   // 用于覆盖上面定义的变量"
	  }, ["code", "@import \"~antd/dist/antd.less\";   // 引入官方提供的 less 样式入口文件\n@import \"your-theme-file.less\";   // 用于覆盖上面定义的变量"]], ["p", "注意：这种方式会载入所有组件的样式，无法和按需加载插件 ", ["code", "babel-plugin-import"], " 的 ", ["code", "style"], " 属性一起使用。"]],
	  "meta": {
	    "order": 4,
	    "title": "定制主题",
	    "filename": "docs/react/customize-theme.zh-CN.md"
	  },
	  "toc": ["ul", ["li", ["a", {
	    "href": "#样式变量"
	  }, "样式变量"]], ["li", ["a", {
	    "href": "#定制方式"
	  }, "定制方式"]]]
	};

/***/ }

});