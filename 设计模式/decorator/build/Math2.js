"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _desc, _value, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

// 装饰器 --- 给方法添加日志
var Math = (_dec = log(100), (_class = function () {
  function Math() {
    _classCallCheck(this, Math);
  }

  _createClass(Math, [{
    key: "add",
    // 方法添加日志输出,并且带参数,对add方法进行每个参数都+100的操作
    value: function add(a, b) {
      return a + b;
    }
  }]);

  return Math;
}(), (_applyDecoratedDescriptor(_class.prototype, "add", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "add"), _class.prototype)), _class));

function log(num) {
  return function (target, key, descriptor) {
    var _num = num || 0;
    var oldValue = descriptor.value; // value ==> add
    // 重写
    descriptor.value = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args[0] += _num;
      args[1] += _num;
      console.log("\u8C03\u7528" + key + "\u53C2\u6570", target, args);
      return oldValue.apply(target, args);
    };
    return descriptor;
  };
}

var math = new Math();
console.log(math.add(1, 2));