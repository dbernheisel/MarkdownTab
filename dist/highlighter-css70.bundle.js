(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{158:function(n,t,e){var o=e(7),s=e(534);"string"==typeof(s=s.__esModule?s.default:s)&&(s=[[n.i,s,""]]);var r,l=0,a={injectType:"lazySingletonStyleTag",insert:"head",singleton:!0},i={};s.locals&&(i.locals=s.locals),i.use=function(){return l++||(r=o(s,a)),i},i.unuse=function(){l>0&&!--l&&(r(),r=null)},n.exports=i},179:function(n,t,e){"use strict";n.exports=function(n){var t=[];return t.toString=function(){return this.map((function(t){var e=function(n,t){var e=n[1]||"",o=n[3];if(!o)return e;if(t&&"function"==typeof btoa){var s=(l=o,a=btoa(unescape(encodeURIComponent(JSON.stringify(l)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(i," */")),r=o.sources.map((function(n){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(n," */")}));return[e].concat(r).concat([s]).join("\n")}var l,a,i;return[e].join("\n")}(t,n);return t[2]?"@media ".concat(t[2]," {").concat(e,"}"):e})).join("")},t.i=function(n,e,o){"string"==typeof n&&(n=[[null,n,""]]);var s={};if(o)for(var r=0;r<this.length;r++){var l=this[r][0];null!=l&&(s[l]=!0)}for(var a=0;a<n.length;a++){var i=[].concat(n[a]);o&&s[i[0]]||(e&&(i[2]?i[2]="".concat(e," and ").concat(i[2]):i[2]=e),t.push(i))}},t}},534:function(n,t,e){(t=e(179)(!1)).push([n.i,'/*\n\nPureBASIC native IDE style ( version 1.0 - April 2016 )\n\nby Tristano Ajmone <tajmone@gmail.com>\n\nPublic Domain\n\nNOTE_1:\tPureBASIC code syntax highlighting only applies the following classes:\n\t\t\t.hljs-comment\n\t\t\t.hljs-function\n\t\t\t.hljs-keywords\n\t\t\t.hljs-string\n\t\t\t.hljs-symbol\n\n\t\tOther classes are added here for the benefit of styling other languages with the look and feel of PureBASIC native IDE style.\n\t\tIf you need to customize a stylesheet for PureBASIC only, remove all non-relevant classes -- PureBASIC-related classes are followed by\n\t\ta "--- used for PureBASIC ... ---" comment on same line.\n\nNOTE_2:\tColor names provided in comments were derived using "Name that Color" online tool:\n\t\t\thttp://chir.ag/projects/name-that-color\n*/\n\n.hljs {\n\tdisplay: block;\n\toverflow-x: auto;\n\tpadding: 0.5em;\n\tbackground: #FFFFDF; /* Half and Half (approx.) */\n/* --- Uncomment to add PureBASIC native IDE styled font!\n\tfont-family: Consolas;\n*/\n}\n\n.hljs, /* --- used for PureBASIC base color --- */\n.hljs-type,  /* --- used for PureBASIC Procedures return type --- */\n.hljs-function, /* --- used for wrapping PureBASIC Procedures definitions --- */\n.hljs-name,\n.hljs-number,\n.hljs-attr,\n.hljs-params,\n.hljs-subst {\n\tcolor: #000000; /* Black */\n}\n\n.hljs-comment, /* --- used for PureBASIC Comments --- */\n.hljs-regexp,\n.hljs-section,\n.hljs-selector-pseudo,\n.hljs-addition {\n\tcolor: #00AAAA; /* Persian Green (approx.) */\n}\n\n.hljs-title, /* --- used for PureBASIC Procedures Names --- */\n.hljs-tag,\n.hljs-variable,\n.hljs-code  {\n\tcolor: #006666; /* Blue Stone (approx.) */\n}\n\n.hljs-keyword, /* --- used for PureBASIC Keywords --- */\n.hljs-class,\n.hljs-meta-keyword,\n.hljs-selector-class,\n.hljs-built_in,\n.hljs-builtin-name {\n\tcolor: #006666; /* Blue Stone (approx.) */\n\tfont-weight: bold;\n}\n\n.hljs-string, /* --- used for PureBASIC Strings --- */\n.hljs-selector-attr {\n\tcolor: #0080FF; /* Azure Radiance (approx.) */\n}\n\n.hljs-symbol, /* --- used for PureBASIC Constants --- */\n.hljs-link,\n.hljs-deletion,\n.hljs-attribute {\n\tcolor: #924B72; /* Cannon Pink (approx.) */\n}\n\n.hljs-meta,\n.hljs-literal,\n.hljs-selector-id {\n\tcolor: #924B72; /* Cannon Pink (approx.) */\n\tfont-weight: bold;\n}\n\n.hljs-strong,\n.hljs-name {\n\tfont-weight: bold;\n}\n\n.hljs-emphasis {\n\tfont-style: italic;\n}\n',""]),n.exports=t}}]);