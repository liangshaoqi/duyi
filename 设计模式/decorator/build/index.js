'use strict';

var _desc, _value, _class;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 装饰器的实现

// 定义一个圆
var Circle = function () {
  function Circle() {
    _classCallCheck(this, Circle);
  }

  _createClass(Circle, [{
    key: 'draw',
    value: function draw() {
      // 行为
      console.log('画圆');
    }
  }]);

  return Circle;
}();

// 使用装饰器额外给圆添加一个边框


var Decorator = function () {
  function Decorator(circle) {
    _classCallCheck(this, Decorator);

    this.circle = circle;
  }

  _createClass(Decorator, [{
    key: 'draw',
    value: function draw() {
      // 自己的绘制方法
      this.circle.draw();
      this.addBorder(this.circle);
    }
  }, {
    key: 'addBorder',
    value: function addBorder(circle) {
      // console.log('当前圆信息:', circle)
      console.log('添加一个边框');
    }
  }]);

  return Decorator;
}();

var circle = new Circle();
var decorator = new Decorator(circle);
decorator.draw();

// 装饰器--注解模式
var Girl = (_class = function () {
  function Girl() {
    _classCallCheck(this, Girl);
  }

  _createClass(Girl, [{
    key: 'speak',
    value: function speak() {
      console.log('我会唱歌');
    }
  }]);

  return Girl;
}(), (_applyDecoratedDescriptor(_class.prototype, 'speak', [run], Object.getOwnPropertyDescriptor(_class.prototype, 'speak'), _class.prototype)), _class);
// 装饰器 参数

function run(target, key, descriptor) {
  // target ==>Girl对象 key===>被装饰的方法名称(speak) descriptor属性描述符
  console.log('装饰器参数:', target, key, descriptor);
  console.log('我会跑了哦');
}
var girl = new Girl();
girl.speak();