/*!
 * @sphinxxxx/color-conversion v2.2.1
 * https://github.com/Sphinxxxx/color-conversion
 *
 * Copyright 2017-2019 Joudee (https://github.com/Joudee), Andreas Borgen (https://github.com/Sphinxxxx), Michael Jackson (https://github.com/mjackson)
 * Released under the ISC license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Color = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

String.prototype.startsWith = String.prototype.startsWith || function (needle) {
	return this.indexOf(needle) === 0;
};
String.prototype.padStart = String.prototype.padStart || function (len, pad) {
	var str = this;while (str.length < len) {
		str = pad + str;
	}return str;
};

var colorNames = { aliceblue: '#f0f8ff', antiquewhite: '#faebd7', aqua: '#00ffff', aquamarine: '#7fffd4', azure: '#f0ffff', beige: '#f5f5dc', bisque: '#ffe4c4', black: '#000000', blanchedalmond: '#ffebcd', blue: '#0000ff', blueviolet: '#8a2be2', brown: '#a52a2a', burlywood: '#deb887', cadetblue: '#5f9ea0', chartreuse: '#7fff00', chocolate: '#d2691e', coral: '#ff7f50', cornflowerblue: '#6495ed', cornsilk: '#fff8dc', crimson: '#dc143c', cyan: '#00ffff', darkblue: '#00008b', darkcyan: '#008b8b', darkgoldenrod: '#b8860b', darkgray: '#a9a9a9', darkgreen: '#006400', darkgrey: '#a9a9a9', darkkhaki: '#bdb76b', darkmagenta: '#8b008b', darkolivegreen: '#556b2f', darkorange: '#ff8c00', darkorchid: '#9932cc', darkred: '#8b0000', darksalmon: '#e9967a', darkseagreen: '#8fbc8f', darkslateblue: '#483d8b', darkslategray: '#2f4f4f', darkslategrey: '#2f4f4f', darkturquoise: '#00ced1', darkviolet: '#9400d3', deeppink: '#ff1493', deepskyblue: '#00bfff', dimgray: '#696969', dimgrey: '#696969', dodgerblue: '#1e90ff', firebrick: '#b22222', floralwhite: '#fffaf0', forestgreen: '#228b22', fuchsia: '#ff00ff', gainsboro: '#dcdcdc', ghostwhite: '#f8f8ff', gold: '#ffd700', goldenrod: '#daa520', gray: '#808080', green: '#008000', greenyellow: '#adff2f', grey: '#808080', honeydew: '#f0fff0', hotpink: '#ff69b4', indianred: '#cd5c5c', indigo: '#4b0082', ivory: '#fffff0', khaki: '#f0e68c', lavender: '#e6e6fa', lavenderblush: '#fff0f5', lawngreen: '#7cfc00', lemonchiffon: '#fffacd', lightblue: '#add8e6', lightcoral: '#f08080', lightcyan: '#e0ffff', lightgoldenrodyellow: '#fafad2', lightgray: '#d3d3d3', lightgreen: '#90ee90', lightgrey: '#d3d3d3', lightpink: '#ffb6c1', lightsalmon: '#ffa07a', lightseagreen: '#20b2aa', lightskyblue: '#87cefa', lightslategray: '#778899', lightslategrey: '#778899', lightsteelblue: '#b0c4de', lightyellow: '#ffffe0', lime: '#00ff00', limegreen: '#32cd32', linen: '#faf0e6', magenta: '#ff00ff', maroon: '#800000', mediumaquamarine: '#66cdaa', mediumblue: '#0000cd', mediumorchid: '#ba55d3', mediumpurple: '#9370db', mediumseagreen: '#3cb371', mediumslateblue: '#7b68ee', mediumspringgreen: '#00fa9a', mediumturquoise: '#48d1cc', mediumvioletred: '#c71585', midnightblue: '#191970', mintcream: '#f5fffa', mistyrose: '#ffe4e1', moccasin: '#ffe4b5', navajowhite: '#ffdead', navy: '#000080', oldlace: '#fdf5e6', olive: '#808000', olivedrab: '#6b8e23', orange: '#ffa500', orangered: '#ff4500', orchid: '#da70d6', palegoldenrod: '#eee8aa', palegreen: '#98fb98', paleturquoise: '#afeeee', palevioletred: '#db7093', papayawhip: '#ffefd5', peachpuff: '#ffdab9', peru: '#cd853f', pink: '#ffc0cb', plum: '#dda0dd', powderblue: '#b0e0e6', purple: '#800080', rebeccapurple: '#663399', red: '#ff0000', rosybrown: '#bc8f8f', royalblue: '#4169e1', saddlebrown: '#8b4513', salmon: '#fa8072', sandybrown: '#f4a460', seagreen: '#2e8b57', seashell: '#fff5ee', sienna: '#a0522d', silver: '#c0c0c0', skyblue: '#87ceeb', slateblue: '#6a5acd', slategray: '#708090', slategrey: '#708090', snow: '#fffafa', springgreen: '#00ff7f', steelblue: '#4682b4', tan: '#d2b48c', teal: '#008080', thistle: '#d8bfd8', tomato: '#ff6347', turquoise: '#40e0d0', violet: '#ee82ee', wheat: '#f5deb3', white: '#ffffff', whitesmoke: '#f5f5f5', yellow: '#ffff00', yellowgreen: '#9acd32' };

function printNum(num) {
	var decs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	var str = decs > 0 ? num.toFixed(decs).replace(/0+$/, '').replace(/\.$/, '') : num.toString();
	return str || '0';
}

var Color = function () {
	function Color(r, g, b, a) {
		classCallCheck(this, Color);


		var that = this;
		function parseString(input) {

			if (input.startsWith('hsl')) {
				var _input$match$map = input.match(/([\-\d\.e]+)/g).map(Number),
				    _input$match$map2 = slicedToArray(_input$match$map, 4),
				    h = _input$match$map2[0],
				    s = _input$match$map2[1],
				    l = _input$match$map2[2],
				    _a = _input$match$map2[3];

				if (_a === undefined) {
					_a = 1;
				}

				h /= 360;
				s /= 100;
				l /= 100;
				that.hsla = [h, s, l, _a];
			}

			else if (input.startsWith('rgb')) {
					var _input$match$map3 = input.match(/([\-\d\.e]+)/g).map(Number),
					    _input$match$map4 = slicedToArray(_input$match$map3, 4),
					    _r = _input$match$map4[0],
					    _g = _input$match$map4[1],
					    _b = _input$match$map4[2],
					    _a2 = _input$match$map4[3];

					if (_a2 === undefined) {
						_a2 = 1;
					}

					that.rgba = [_r, _g, _b, _a2];
				}

				else {
						if (input.startsWith('#')) {
							that.rgba = Color.hexToRgb(input);
						} else {
							that.rgba = Color.nameToRgb(input) || Color.hexToRgb(input);
						}
					}
		}

		if (r === undefined) {}


		else if (Array.isArray(r)) {
				this.rgba = r;
			}

			else if (b === undefined) {
					var color = r && '' + r;
					if (color) {
						parseString(color.toLowerCase());
					}
				} else {
					this.rgba = [r, g, b, a === undefined ? 1 : a];
				}
	}


	createClass(Color, [{
		key: 'printRGB',
		value: function printRGB(alpha) {
			var rgb = alpha ? this.rgba : this.rgba.slice(0, 3),
			    vals = rgb.map(function (x, i) {
				return printNum(x, i === 3 ? 3 : 0);
			});

			return alpha ? 'rgba(' + vals + ')' : 'rgb(' + vals + ')';
		}
	}, {
		key: 'printHSL',
		value: function printHSL(alpha) {
			var mults = [360, 100, 100, 1],
			    suff = ['', '%', '%', ''];

			var hsl = alpha ? this.hsla : this.hsla.slice(0, 3),

			vals = hsl.map(function (x, i) {
				return printNum(x * mults[i], i === 3 ? 3 : 1) + suff[i];
			});

			return alpha ? 'hsla(' + vals + ')' : 'hsl(' + vals + ')';
		}
	}, {
		key: 'printHex',
		value: function printHex(alpha) {
			var hex = this.hex;
			return alpha ? hex : hex.substring(0, 7);
		}



	}, {
		key: 'rgba',
		get: function get$$1() {
			if (this._rgba) {
				return this._rgba;
			}
			if (!this._hsla) {
				throw new Error('No color is set');
			}

			return this._rgba = Color.hslToRgb(this._hsla);
		},
		set: function set$$1(rgb) {
			if (rgb.length === 3) {
				rgb[3] = 1;
			}

			this._rgba = rgb;
			this._hsla = null;
		}
	}, {
		key: 'rgbString',
		get: function get$$1() {
			return this.printRGB();
		}
	}, {
		key: 'rgbaString',
		get: function get$$1() {
			return this.printRGB(true);
		}


	}, {
		key: 'hsla',
		get: function get$$1() {
			if (this._hsla) {
				return this._hsla;
			}
			if (!this._rgba) {
				throw new Error('No color is set');
			}

			return this._hsla = Color.rgbToHsl(this._rgba);
		},
		set: function set$$1(hsl) {
			if (hsl.length === 3) {
				hsl[3] = 1;
			}

			this._hsla = hsl;
			this._rgba = null;
		}
	}, {
		key: 'hslString',
		get: function get$$1() {
			return this.printHSL();
		}
	}, {
		key: 'hslaString',
		get: function get$$1() {
			return this.printHSL(true);
		}


	}, {
		key: 'hex',
		get: function get$$1() {
			var rgb = this.rgba,
			    hex = rgb.map(function (x, i) {
				return i < 3 ? x.toString(16) : Math.round(x * 255).toString(16);
			});

			return '#' + hex.map(function (x) {
				return x.padStart(2, '0');
			}).join('');
		},
		set: function set$$1(hex) {
			this.rgba = Color.hexToRgb(hex);
		}
	}], [{
		key: 'hexToRgb',
		value: function hexToRgb(input) {
			var hex = (input.startsWith('#') ? input.slice(1) : input).replace(/^(\w{3})$/, '$1F') 
			.replace(/^(\w)(\w)(\w)(\w)$/, '$1$1$2$2$3$3$4$4') 
			.replace(/^(\w{6})$/, '$1FF'); 

			if (!hex.match(/^([0-9a-fA-F]{8})$/)) {
				throw new Error('Unknown hex color; ' + input);
			}

			var rgba = hex.match(/^(\w\w)(\w\w)(\w\w)(\w\w)$/).slice(1) 
			.map(function (x) {
				return parseInt(x, 16);
			}); 

			rgba[3] = rgba[3] / 255;
			return rgba;
		}


	}, {
		key: 'nameToRgb',
		value: function nameToRgb(input) {
			var hex = colorNames[input];
			if (hex) {
				return Color.hexToRgb(hex);
			}
		}


	}, {
		key: 'rgbToHsl',
		value: function rgbToHsl(_ref) {
			var _ref2 = slicedToArray(_ref, 4),
			    r = _ref2[0],
			    g = _ref2[1],
			    b = _ref2[2],
			    a = _ref2[3];

			r /= 255;
			g /= 255;
			b /= 255;

			var max = Math.max(r, g, b),
			    min = Math.min(r, g, b);
			var h = void 0,
			    s = void 0,
			    l = (max + min) / 2;

			if (max === min) {
				h = s = 0; 
			} else {
				var d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
				switch (max) {
					case r:
						h = (g - b) / d + (g < b ? 6 : 0);break;
					case g:
						h = (b - r) / d + 2;break;
					case b:
						h = (r - g) / d + 4;break;
				}

				h /= 6;
			}

			return [h, s, l, a];
		}


	}, {
		key: 'hslToRgb',
		value: function hslToRgb(_ref3) {
			var _ref4 = slicedToArray(_ref3, 4),
			    h = _ref4[0],
			    s = _ref4[1],
			    l = _ref4[2],
			    a = _ref4[3];

			var r = void 0,
			    g = void 0,
			    b = void 0;

			if (s === 0) {
				r = g = b = l; 
			} else {
				var hue2rgb = function hue2rgb(p, q, t) {
					if (t < 0) t += 1;
					if (t > 1) t -= 1;
					if (t < 1 / 6) return p + (q - p) * 6 * t;
					if (t < 1 / 2) return q;
					if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
					return p;
				};

				var q = l < 0.5 ? l * (1 + s) : l + s - l * s,
				    p = 2 * l - q;

				r = hue2rgb(p, q, h + 1 / 3);
				g = hue2rgb(p, q, h);
				b = hue2rgb(p, q, h - 1 / 3);
			}

			var rgba = [r * 255, g * 255, b * 255].map(Math.round);
			rgba[3] = a;

			return rgba;
		}
	}]);
	return Color;
}();

return Color;

})));
