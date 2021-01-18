'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

/**
 * 判断是否是期望的类型
 * @param { any } param 将要判断的变量
 * @param { ...string } types 期望的类型
 * @return { boolean } 返回期望是否正确
 */
var isExpectType = function (param) {
    var types = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
    }
    return types.some(function (type) { return Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === type; });
};
/**
 * 移除\n
 * @param { string } str 将要处理的字符串
 * @return { string } 返回新的字符串
 */
var removeEnter = function (str) {
    return [].filter.call(str, function (s) { return s !== '\n'; }).join('');
};

var name = "lucky-canvas";
var version = "1.2.6";

var Lucky = /** @class */ (function () {
    /**
     * 公共构造器
     * @param config
     */
    function Lucky(config) {
        this.htmlFontSize = 16;
        this.subs = {};
        this.rAF = function () { };
        this.setTimeout = function () { };
        this.setInterval = function () { };
        this.clearInterval = function () { };
        // 先初始化 fontSize 以防后面计算 rem
        this.setHTMLFontSize();
        // 兼容代码开始: 为了处理 v1.0.6 版本在这里传入了一个 dom
        if (typeof config === 'string')
            config = { el: config };
        else if (config.nodeType === 1)
            config = { el: '', divElement: config };
        config = config;
        // 兼容代码结束
        this.config = config;
        if (!config.flag)
            config.flag = 'WEB';
        if (config.el)
            config.divElement = document.querySelector(config.el);
        var boxWidth = 0, boxHeight = 0;
        if (config.divElement) {
            boxWidth = config.divElement.offsetWidth;
            boxHeight = config.divElement.offsetHeight;
            config.canvasElement = document.createElement('canvas');
            config.divElement.appendChild(config.canvasElement);
        }
        // 宽高优先从config里取, 其次从style上面取
        config.width = this.getLength(config.width) || boxWidth;
        config.height = this.getLength(config.height) || boxHeight;
        // 重新把宽高赋给盒子
        if (config.divElement) {
            config.divElement.style.overflow = 'hidden';
            config.divElement.style.width = config.width + 'px';
            config.divElement.style.height = config.height + 'px';
        }
        if (config.canvasElement) {
            // 添加版本信息到标签上, 方便定位版本问题
            config.canvasElement.setAttribute('package', name + "@" + version);
            config.ctx = config.canvasElement.getContext('2d');
        }
        this.ctx = config.ctx;
        // 如果最后得不到 canvas 上下文那就无法进行绘制
        if (!config.ctx || !config.width || !config.height) {
            console.error('无法获取到 CanvasContext2D 或宽高');
            return;
        }
        // 最后等待 config 来设置 dpr
        this.setDpr();
        // 重写数组原型方法
        this.resetArrayProto();
        // 初始化 window 方法
        this.initWindowFunction();
    }
    /**
     * 设备像素比
     * window 环境下自动获取, 其余环境手动传入
     */
    Lucky.prototype.setDpr = function () {
        var config = this.config;
        if (config.dpr) ;
        else if (window) {
            window.dpr = config.dpr = window.devicePixelRatio || 1;
        }
        else if (!config.dpr) {
            console.error(config, '未传入 dpr 可能会导致绘制异常');
        }
    };
    /**
     * 根标签的字体大小
     */
    Lucky.prototype.setHTMLFontSize = function () {
        if (!window)
            return;
        this.htmlFontSize = +window.getComputedStyle(document.documentElement).fontSize.slice(0, -2);
    };
    /**
     * 从 window 对象上获取一些方法
     */
    Lucky.prototype.initWindowFunction = function () {
        if (window) {
            this.rAF = window.requestAnimationFrame;
            this.setInterval = window.setInterval;
            this.clearInterval = window.clearInterval;
            return;
        }
        if (this.config.rAF) {
            // 优先使用帧动画
            this.rAF = this.config.rAF;
        }
        else if (this.config.setTimeout) {
            // 其次使用定时器
            var timeout_1 = this.config.setTimeout;
            this.rAF = function (callback) { return timeout_1(callback, 16); };
        }
        else {
            // 如果config里面没有提供, 那就假设全局方法存在setTimeout
            this.rAF = function (callback) { return setTimeout(callback, 16); };
        }
    };
    /**
     * 根据 dpr 缩放 canvas 并处理位移
     */
    Lucky.prototype.zoomCanvas = function () {
        var _a = this, config = _a.config, ctx = _a.ctx;
        var canvasElement = config.canvasElement, dpr = config.dpr;
        var compute = function (len) { return (len * dpr - len) / (len * dpr) * (dpr / 2) * 100; };
        if (!canvasElement)
            return;
        canvasElement.width = config.width * dpr;
        canvasElement.height = config.height * dpr;
        canvasElement.style.width = canvasElement.width + "px";
        canvasElement.style.height = canvasElement.height + "px";
        canvasElement.style.transform = "scale(" + 1 / dpr + ") translate(\n      " + -compute(canvasElement.width) + "%, " + -compute(canvasElement.height) + "%\n    )";
        ctx.scale(dpr, dpr);
    };
    /**
     * 异步加载图片并返回图片的几何信息
     * @param src 图片路径
     * @param info 图片信息
     */
    Lucky.prototype.loadImg = function (src, info) {
        var _this_1 = this;
        return new Promise(function (resolve) {
            if (_this_1.config.flag === 'WEB') {
                var imgObj_1 = new Image();
                imgObj_1.src = src;
                imgObj_1.onload = function () { return resolve(imgObj_1); };
            }
            else {
                // 其余平台向外暴露, 交给外部自行处理
                info.$resolve = resolve;
                return;
            }
            // else if (['MINI-WX', 'UNI-H5', 'UNI-MINI-WX'].includes(this.config.flag)) {
            //   // 修复 uni.getImageInfo 无法处理 base64 格式的图片的问题
            //   if (/^data:image\/([a-z]+);base64,/.test(src)) {
            //     info.$resolve = resolve
            //     return
            //   }
            //   this.global.getImageInfo({
            //     src: src,
            //     success: (imgObj: UniImageType) => resolve(imgObj),
            //     fail: () => console.error('API `getImageInfo` 加载图片失败', src)
            //   })
            // }
        });
    };
    /**
     * 获取长度
     * @param length 将要转换的长度
     * @return 返回长度
     */
    Lucky.prototype.getLength = function (length) {
        if (isExpectType(length, 'number'))
            return length;
        if (isExpectType(length, 'string'))
            return this.changeUnits(length);
        return 0;
    };
    /**
     * 转换单位
     * @param { string } value 将要转换的值
     * @param { number } denominator 分子
     * @return { number } 返回新的字符串
     */
    Lucky.prototype.changeUnits = function (value, denominator) {
        var _this_1 = this;
        if (denominator === void 0) { denominator = 1; }
        return Number(value.replace(/^(\-*[0-9.]*)([a-z%]*)$/, function (value, num, unit) {
            var unitFunc = {
                '%': function (n) { return n * (denominator / 100); },
                'px': function (n) { return n * 1; },
                'rem': function (n) { return n * _this_1.htmlFontSize; },
            }[unit];
            if (unitFunc)
                return unitFunc(num);
            // 如果找不到默认单位, 就交给外面处理
            var otherUnitFunc = _this_1.config.unitFunc;
            return otherUnitFunc ? otherUnitFunc(num, unit) : num;
        }));
    };
    /**
     * 更新数据并重新绘制 canvas 画布
     */
    Lucky.prototype.draw = function () { };
    /**
     * 数据劫持
     * @param obj 将要处理的数据
     */
    Lucky.prototype.observer = function (data) {
        var _this_1 = this;
        if (!data || typeof data !== 'object')
            return;
        Object.keys(data).forEach(function (key) {
            _this_1.defineReactive(data, key, data[key]);
        });
    };
    /**
     * 重写 setter 和 getter
     * @param obj 数据
     * @param key 属性
     * @param val 值
     */
    Lucky.prototype.defineReactive = function (data, key, value) {
        var _this_1 = this;
        this.observer(value);
        Object.defineProperty(data, key, {
            get: function () {
                return value;
            },
            set: function (newVal) {
                var oldVal = value;
                if (newVal === value)
                    return;
                value = newVal;
                _this_1.observer(value);
                if (_this_1.subs[key])
                    _this_1.subs[key].call(_this_1, value, oldVal);
                _this_1.draw();
            }
        });
    };
    /**
     * 添加一个新的响应式数据
     * @param data 数据
     * @param key 属性
     * @param value 新值
     */
    Lucky.prototype.$set = function (data, key, value) {
        if (!data || typeof data !== 'object')
            return;
        this.defineReactive(data, key, value);
    };
    /**
     * 添加一个属性计算
     * @param data 源数据
     * @param key 属性名
     * @param callback 回调函数
     */
    Lucky.prototype.$computed = function (data, key, callback) {
        var _this_1 = this;
        Object.defineProperty(data, key, {
            get: function () {
                return callback.call(_this_1);
            }
        });
    };
    /**
     * 添加一个观察者
     * @param key 属性名
     * @param callback 回调函数
     */
    Lucky.prototype.$watch = function (key, callback) {
        this.subs[key] = callback;
    };
    /**
     * 重写数组的原型方法
     */
    Lucky.prototype.resetArrayProto = function () {
        var _this = this;
        var oldArrayProto = Array.prototype;
        var newArrayProto = Object.create(oldArrayProto);
        var methods = ['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse'];
        methods.forEach(function (name) {
            newArrayProto[name] = function () {
                var _a;
                _this.draw();
                (_a = oldArrayProto[name]).call.apply(_a, __spreadArrays([this], Array.from(arguments)));
            };
        });
    };
    return Lucky;
}());

/**
 * 转换为运算角度
 * @param { number } deg 数学角度
 * @return { number } 运算角度
 */
var getAngle = function (deg) {
    return Math.PI / 180 * deg;
};

/**
 * 缓动函数
 * t: current time（当前时间）
 * b: beginning value（初始值）
 * c: change in value（变化量）
 * d: duration（持续时间）
 *
 * 感谢张鑫旭大佬 https://github.com/zhangxinxu/Tween
 */
// 二次方的缓动
var quad = {
    easeIn: function (t, b, c, d) {
        if (t >= d)
            t = d;
        return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
        if (t >= d)
            t = d;
        return -c * (t /= d) * (t - 2) + b;
    }
};

var LuckyWheel = /** @class */ (function (_super) {
    __extends(LuckyWheel, _super);
    /**
     * 大转盘构造器
     * @param config 元素标识
     * @param data 抽奖配置项
     */
    function LuckyWheel(config, data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this, config) || this;
        _this.blocks = [];
        _this.prizes = [];
        _this.buttons = [];
        _this.defaultConfig = {};
        _this._defaultConfig = {
            gutter: '0px',
            offsetDegree: 0,
            speed: 20,
            accelerationTime: 2500,
            decelerationTime: 2500,
        };
        _this.defaultStyle = {};
        _this._defaultStyle = {
            fontSize: '18px',
            fontColor: '#000',
            fontStyle: 'microsoft yahei ui,microsoft yahei,simsun,sans-serif',
            fontWeight: '400',
            lineHeight: '',
            background: '#fff',
            wordWrap: true,
            lengthLimit: '90%',
        };
        _this.Radius = 0; // 大转盘半径
        _this.prizeRadius = 0; // 奖品区域半径
        _this.prizeDeg = 0; // 奖品数学角度
        _this.prizeRadian = 0; // 奖品运算角度
        _this.rotateDeg = 0; // 转盘旋转角度
        _this.rotateBlockDeg = 0; // 外圈转盘旋转角度
        _this.maxBtnRadius = 0; // 最大按钮半径
        _this.startTime = 0; // 开始时间戳
        _this.endTime = 0; // 停止时间戳
        _this.stopDeg = 0; // 刻舟求剑
        _this.stopBlockDeg = 0; // 外圈
        _this.endDeg = 0; // 停止角度
        _this.endBlockDeg = 0; // 外圈停止角度
        _this.animationId = 0; // 帧动画id
        _this.slowDownBool = false;
        _this.slowDownBlockBool = false;
        _this.FPS = 16.6; // 屏幕刷新率
        _this.prizeImgs = [[]];
        _this.btnImgs = [[]];
        _this.initData(data);
        _this.initComputed();
        _this.initWatch();
        // 收集首次渲染的图片
        var willUpdate = [[]];
        _this.prizes && (willUpdate = _this.prizes.map(function (prize) { return prize.imgs; }));
        _this.buttons && (willUpdate.push.apply(willUpdate, _this.buttons.map(function (btn) { return btn.imgs; })));
        _this.init(willUpdate);
        return _this;
    }
    /**
     * 初始化数据
     * @param data
     */
    LuckyWheel.prototype.initData = function (data) {
        this.$set(this, 'blocks', data.blocks || []);
        this.$set(this, 'prizes', data.prizes || []);
        this.$set(this, 'buttons', data.buttons || []);
        this.$set(this, 'defaultConfig', data.defaultConfig || {});
        this.$set(this, 'defaultStyle', data.defaultStyle || {});
        this.$set(this, 'startCallback', data.start);
        this.$set(this, 'endCallback', data.end);
    };
    /**
     * 初始化属性计算
     */
    LuckyWheel.prototype.initComputed = function () {
        var _this = this;
        // 默认配置
        this.$computed(this, '_defaultConfig', function () {
            var config = __assign({ gutter: '0px', offsetDegree: 0, speed: 12, accelerationTime: 2500, decelerationTime: 2500 }, _this.defaultConfig);
            return config;
        });
        // 默认样式
        this.$computed(this, '_defaultStyle', function () {
            var style = __assign({ fontSize: '18px', fontColor: '#000', fontStyle: 'microsoft yahei ui,microsoft yahei,simsun,sans-serif', fontWeight: '400', background: '#fff', wordWrap: true, lengthLimit: '90%' }, _this.defaultStyle);
            return style;
        });
    };
    /**
     * 初始化观察者
     */
    LuckyWheel.prototype.initWatch = function () {
        var _this = this;
        // 观察奖品数据的变化
        this.$watch('prizes', function (newData, oldData) {
            var willUpdate = [];
            // 首次渲染时oldData为undefined
            if (!oldData)
                willUpdate = newData.map(function (prize) { return prize.imgs; });
            // 此时新值一定存在
            else if (newData)
                newData.forEach(function (newPrize, prizeIndex) {
                    var prizeImgs = [];
                    var oldPrize = oldData[prizeIndex];
                    // 如果旧奖品不存在
                    if (!oldPrize)
                        prizeImgs = newPrize.imgs || [];
                    // 新奖品有图片才能进行对比
                    else if (newPrize.imgs)
                        newPrize.imgs.forEach(function (newImg, imgIndex) {
                            if (!oldPrize.imgs)
                                return prizeImgs[imgIndex] = newImg;
                            var oldImg = oldPrize.imgs[imgIndex];
                            // 如果旧值不存在
                            if (!oldImg)
                                prizeImgs[imgIndex] = newImg;
                            // 如果缓存中没有奖品或图片
                            else if (!_this.prizeImgs[prizeIndex] || !_this.prizeImgs[prizeIndex][imgIndex]) {
                                prizeImgs[imgIndex] = newImg;
                            }
                            // 如果新值和旧值的src不相等
                            else if (newImg.src !== oldImg.src)
                                prizeImgs[imgIndex] = newImg;
                        });
                    willUpdate[prizeIndex] = prizeImgs;
                });
            return _this.init(willUpdate);
        });
        // 观察按钮数据的变化
        this.$watch('buttons', function (newData, oldData) {
            var willUpdate = [];
            // 首次渲染时oldData为undefined
            if (!oldData)
                willUpdate = newData.map(function (btn) { return btn.imgs; });
            // 此时新值一定存在
            else if (newData)
                newData.forEach(function (newBtn, btnIndex) {
                    var btnImgs = [];
                    var oldBtn = oldData[btnIndex];
                    // 如果旧奖品不存在或旧奖品的图片不存在
                    if (!oldBtn || !oldBtn.imgs)
                        btnImgs = newBtn.imgs || [];
                    // 新奖品有图片才能进行对比
                    else if (newBtn.imgs)
                        newBtn.imgs.forEach(function (newImg, imgIndex) {
                            if (!oldBtn.imgs)
                                return btnImgs[imgIndex] = newImg;
                            var oldImg = oldBtn.imgs[imgIndex];
                            // 如果旧值不存在
                            if (!oldImg)
                                btnImgs[imgIndex] = newImg;
                            // 如果缓存中没有按钮或图片
                            else if (!_this.btnImgs[btnIndex] || !_this.btnImgs[btnIndex][imgIndex]) {
                                btnImgs[imgIndex] = newImg;
                            }
                            // 如果新值和旧值的src不相等
                            else if (newImg.src !== oldImg.src)
                                btnImgs[imgIndex] = newImg;
                        });
                    willUpdate[btnIndex] = btnImgs;
                });
            return _this.init(__spreadArrays(new Array(_this.prizes.length).fill(undefined), willUpdate));
        });
    };
    /**
     * 初始化 canvas 抽奖
     * @param { Array<ImgType[]> } willUpdateImgs 需要更新的图片
     */
    LuckyWheel.prototype.init = function (willUpdateImgs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, config, ctx, endCallBack, num, sum;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = this, config = _c.config, ctx = _c.ctx;
                        this.setDpr();
                        this.setHTMLFontSize();
                        this.zoomCanvas();
                        // 初始化前回调函数
                        (_a = config.beforeInit) === null || _a === void 0 ? void 0 : _a.call(this);
                        this.Radius = Math.min(config.width, config.height) / 2;
                        ctx.translate(this.Radius, this.Radius);
                        endCallBack = function () {
                            _this.draw();
                            // 防止多次绑定点击事件
                            if (config.canvasElement)
                                config.canvasElement.onclick = function (e) {
                                    var _a;
                                    ctx.beginPath();
                                    ctx.arc(0, 0, _this.maxBtnRadius, 0, Math.PI * 2, false);
                                    if (!ctx.isPointInPath(e.offsetX, e.offsetY))
                                        return;
                                    if (_this.startTime)
                                        return;
                                    (_a = _this.startCallback) === null || _a === void 0 ? void 0 : _a.call(_this, e);
                                };
                        };
                        if (!this.blocks[0].img) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadBlockImg()];
                    case 1:
                        _d.sent();
                        _d.label = 2;
                    case 2:
                        if (!this.blocks[0].imgBackground) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.loadBlockImgBackground()];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        num = 0, sum = 0;
                        if (isExpectType(willUpdateImgs, 'array')) {
                            this.draw(); // 先画一次防止闪烁, 因为加载图片是异步的
                            willUpdateImgs.forEach(function (imgs, cellIndex) {
                                if (!imgs)
                                    return false;
                                imgs.forEach(function (imgInfo, imgIndex) {
                                    sum++;
                                    _this.loadAndCacheImg(cellIndex, imgIndex, function () {
                                        num++;
                                        if (sum === num)
                                            endCallBack.call(_this);
                                    });
                                });
                            });
                        }
                        if (!sum)
                            endCallBack.call(this);
                        // 初始化后回调函数
                        (_b = config.afterInit) === null || _b === void 0 ? void 0 : _b.call(this);
                        return [2 /*return*/];
                }
            });
        });
    };
    LuckyWheel.prototype.loadBlockImg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var s;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadImg(this.blocks[0].img.src, this.blocks[0].img)];
                    case 1:
                        s = _a.sent();
                        this.blokImg = s;
                        return [2 /*return*/];
                }
            });
        });
    };
    LuckyWheel.prototype.loadBlockImgBackground = function () {
        return __awaiter(this, void 0, void 0, function () {
            var s;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadImg(this.blocks[0].imgBackground.src, this.blocks[0].imgBackground)];
                    case 1:
                        s = _a.sent();
                        this.centerBackground = s;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 单独加载某一张图片并计算其实际渲染宽高
     * @param { number } cellIndex 奖品索引
     * @param { number } imgIndex 奖品图片索引
     * @param { Function } callBack 图片加载完毕回调
     */
    LuckyWheel.prototype.loadAndCacheImg = function (cellIndex, imgIndex, callBack) {
        return __awaiter(this, void 0, void 0, function () {
            var isPrize, cellName, imgName, cell, imgInfo, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        isPrize = cellIndex < this.prizes.length;
                        cellName = isPrize ? 'prizes' : 'buttons';
                        imgName = isPrize ? 'prizeImgs' : 'btnImgs';
                        cellIndex = isPrize ? cellIndex : cellIndex - this.prizes.length;
                        cell = this[cellName][cellIndex];
                        if (!cell || !cell.imgs)
                            return [2 /*return*/];
                        imgInfo = cell.imgs[imgIndex];
                        if (!imgInfo)
                            return [2 /*return*/];
                        // 同步加载图片
                        if (!this[imgName][cellIndex])
                            this[imgName][cellIndex] = [];
                        _a = this[imgName][cellIndex];
                        _b = imgIndex;
                        return [4 /*yield*/, this.loadImg(imgInfo.src, imgInfo)];
                    case 1:
                        _a[_b] = _c.sent();
                        callBack.call(this);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 计算图片的渲染宽高
     * @param imgObj 图片标签元素
     * @param imgInfo 图片信息
     * @param computedWidth 宽度百分比
     * @param computedHeight 高度百分比
     * @return [渲染宽度, 渲染高度]
     */
    LuckyWheel.prototype.computedWidthAndHeight = function (imgObj, imgInfo, computedWidth, computedHeight) {
        // 根据配置的样式计算图片的真实宽高
        if (!imgInfo.width && !imgInfo.height) {
            // 如果没有配置宽高, 则使用图片本身的宽高
            return [imgObj.width, imgObj.height];
        }
        else if (imgInfo.width && !imgInfo.height) {
            // 如果只填写了宽度, 没填写高度
            var trueWidth = this.getWidth(imgInfo.width, computedWidth);
            // 那高度就随着宽度进行等比缩放
            return [trueWidth, imgObj.height * (trueWidth / imgObj.width)];
        }
        else if (!imgInfo.width && imgInfo.height) {
            // 如果只填写了宽度, 没填写高度
            var trueHeight = this.getHeight(imgInfo.height, computedHeight);
            // 那宽度就随着高度进行等比缩放
            return [imgObj.width * (trueHeight / imgObj.height), trueHeight];
        }
        // 如果宽度和高度都填写了, 就如实计算
        return [
            this.getWidth(imgInfo.width, computedWidth),
            this.getHeight(imgInfo.height, computedHeight)
        ];
    };
    /**
     * 开始绘制
     */
    LuckyWheel.prototype.draw = function () {
        var _this = this;
        var _a, _b;
        // 计算文字横坐标
        var getFontX = function (line) {
            return _this.getOffsetX(ctx.measureText(line).width);
        };
        // 计算文字纵坐标
        var getFontY = function (font, height, lineIndex) {
            // 优先使用字体行高, 要么使用默认行高, 其次使用字体大小, 否则使用默认字体大小
            var lineHeight = font.lineHeight || _defaultStyle.lineHeight || font.fontSize || _defaultStyle.fontSize;
            return _this.getHeight(font.top, height) + (lineIndex + 1) * _this.getLength(lineHeight);
        };
        this.prizeDeg = 360 / this.prizes.length;
        this.prizeRadian = getAngle(this.prizeDeg);
        var _c = this, config = _c.config, ctx = _c.ctx, _defaultConfig = _c._defaultConfig, _defaultStyle = _c._defaultStyle;
        // 触发绘制前回调
        (_a = config.beforeDraw) === null || _a === void 0 ? void 0 : _a.call(this, ctx);
        // 清空画布
        ctx.clearRect(-this.Radius, -this.Radius, this.Radius * 2, this.Radius * 2);
        ctx.restore();
        var startBlock = getAngle(-90 + this.rotateBlockDeg + _defaultConfig.offsetDegree);
        var rBlockRadius = this.Radius - 16;
        // 绘制blocks边框
        this.prizeRadius = this.blocks.reduce(function (radius, block, index) {
            // ctx.beginPath()
            // ctx.fillStyle = block.background
            // ctx.arc(0, 0, radius, 0, Math.PI * 2, false)
            // ctx.fill()
            ctx.save();
            var _a = _this.computedWidthAndHeight(block.img, block.img, _this.getHeight(_this.Radius) * 2, _this.getHeight(_this.Radius) * 2), trueWidth = _a[0], trueHeight = _a[1];
            var _b = [_this.getOffsetX(trueWidth), _this.getHeight(block.img.top, _this.Radius)], imgX = _b[0], imgY = _b[1];
            // ctx.rotate(this.rotateBlockDeg);
            ctx.drawImage(_this.blokImg, imgX, imgY + imgX, trueWidth, trueHeight);
            if (block.text) {
                // ctx.fill();
                block.text.forEach(function (text, index) {
                    var currMiddleDeg = startBlock + index * _this.prizeRadian;
                    ctx.fillStyle = '#fff';
                    var x = Math.cos(currMiddleDeg) * rBlockRadius;
                    var y = Math.sin(currMiddleDeg) * rBlockRadius;
                    ctx.fillText(text, x - 10, y + 4);
                });
            }
            // 绘制文字
            return radius - _this.getLength(block.padding.split(' ')[0]);
        }, this.Radius);
        var _d = this.computedWidthAndHeight(this.blocks[0].imgBackground, this.blocks[0].imgBackground, this.getHeight(this.prizeRadius) * 2, this.getHeight(this.prizeRadius) * 2), trueWidth = _d[0], trueHeight = _d[1];
        // 计算起始弧度
        // ctx.fillText('原点', 0 , 0);
        var start = getAngle(-90 + this.rotateDeg + _defaultConfig.offsetDegree);
        ctx.save();
        var _e = [this.getOffsetX(trueWidth), this.getHeight(0, this.prizeRadius)], imgX = _e[0];
        ctx.drawImage(this.centerBackground, imgX, imgX, trueWidth, trueHeight);
        // 绘制prizes奖品区域
        this.prizes.forEach(function (prize, prizeIndex) {
            // 计算当前奖品区域中间坐标点
            var currMiddleDeg = start + prizeIndex * _this.prizeRadian;
            // 奖品区域可见高度
            var prizeHeight = _this.prizeRadius - _this.maxBtnRadius;
            // 绘制背景
            // drawSector(
            //   config.flag, ctx,
            //   this.maxBtnRadius, this.prizeRadius,
            //   currMiddleDeg - this.prizeRadian / 2,
            //   currMiddleDeg + this.prizeRadian / 2,
            //   this.getLength(_defaultConfig.gutter),
            //   prize.background || _defaultStyle.background
            // )
            // 计算临时坐标并旋转文字
            var x = Math.cos(currMiddleDeg) * _this.prizeRadius;
            var y = Math.sin(currMiddleDeg) * _this.prizeRadius;
            ctx.translate(x, y);
            ctx.rotate(currMiddleDeg + getAngle(90));
            // 绘制图片
            prize.imgs && prize.imgs.forEach(function (imgInfo, imgIndex) {
                if (!_this.prizeImgs[prizeIndex])
                    return;
                var prizeImg = _this.prizeImgs[prizeIndex][imgIndex];
                if (!prizeImg)
                    return;
                var _a = _this.computedWidthAndHeight(prizeImg, imgInfo, _this.prizeRadian * _this.prizeRadius, prizeHeight), trueWidth = _a[0], trueHeight = _a[1];
                var _b = [_this.getOffsetX(trueWidth), _this.getHeight(imgInfo.top, prizeHeight)], imgX = _b[0], imgY = _b[1];
                var drawImg;
                // 兼容代码
                if (['WEB', 'MINI-WX'].includes(_this.config.flag)) {
                    drawImg = prizeImg;
                }
                else if (['UNI-H5', 'UNI-MINI-WX'].includes(_this.config.flag)) {
                    drawImg = prizeImg.path;
                }
                // 绘制图片
                ctx.drawImage(drawImg, imgX, imgY, trueWidth, trueHeight);
            });
            // 逐行绘制文字
            prize.fonts && prize.fonts.forEach(function (font) {
                var fontColor = font.fontColor || _defaultStyle.fontColor;
                var fontWeight = font.fontWeight || _defaultStyle.fontWeight;
                var fontSize = _this.getLength(font.fontSize || _defaultStyle.fontSize);
                var fontStyle = font.fontStyle || _defaultStyle.fontStyle;
                ctx.fillStyle = fontColor;
                ctx.font = fontWeight + " " + fontSize + "px " + fontStyle;
                var lines = [], text = String(font.text);
                if (font.hasOwnProperty('wordWrap') ? font.wordWrap : _defaultStyle.wordWrap) {
                    text = removeEnter(text);
                    var str = '';
                    for (var i = 0; i < text.length; i++) {
                        str += text[i];
                        var currWidth = ctx.measureText(str).width;
                        var maxWidth = (_this.prizeRadius - getFontY(font, prizeHeight, lines.length))
                            * Math.tan(_this.prizeRadian / 2) * 2 - _this.getLength(_defaultConfig.gutter);
                        if (currWidth > _this.getWidth(font.lengthLimit || _defaultStyle.lengthLimit, maxWidth)) {
                            lines.push(str.slice(0, -1));
                            str = text[i];
                        }
                    }
                    if (str)
                        lines.push(str);
                    if (!lines.length)
                        lines.push(text);
                }
                else {
                    lines = text.split('\n');
                }
                lines.filter(function (line) { return !!line; }).forEach(function (line, lineIndex) {
                    ctx.fillText(line, getFontX(line), getFontY(font, prizeHeight, lineIndex));
                });
            });
            // 修正旋转角度和原点坐标
            ctx.rotate(getAngle(360) - currMiddleDeg - getAngle(90));
            ctx.translate(-x, -y);
        });
        ctx.restore();
        // 绘制按钮
        this.buttons.forEach(function (btn, btnIndex) {
            var radius = _this.getHeight(btn.radius);
            // 绘制背景颜色
            _this.maxBtnRadius = Math.max(_this.maxBtnRadius, radius);
            ctx.beginPath();
            ctx.fillStyle = btn.background || '#fff';
            ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
            ctx.fill();
            // 绘制指针
            if (btn.pointer) {
                ctx.beginPath();
                ctx.fillStyle = btn.background || '#fff';
                ctx.moveTo(-radius, 0);
                ctx.lineTo(radius, 0);
                ctx.lineTo(0, -radius * 2);
                ctx.closePath();
                ctx.fill();
            }
            // 绘制按钮图片
            btn.imgs && btn.imgs.forEach(function (imgInfo, imgIndex) {
                if (!_this.btnImgs[btnIndex])
                    return;
                var btnImg = _this.btnImgs[btnIndex][imgIndex];
                if (!btnImg)
                    return;
                // 计算图片真实宽高
                var _a = _this.computedWidthAndHeight(btnImg, imgInfo, _this.getHeight(btn.radius) * 2, _this.getHeight(btn.radius) * 2), trueWidth = _a[0], trueHeight = _a[1];
                var _b = [_this.getOffsetX(trueWidth), _this.getHeight(imgInfo.top, radius)], imgX = _b[0], imgY = _b[1];
                // 兼容代码
                var drawImg;
                if (['WEB', 'MINI-WX'].includes(_this.config.flag)) {
                    drawImg = btnImg;
                }
                else if (['UNI-H5', 'UNI-MINI-WX'].includes(_this.config.flag)) {
                    drawImg = btnImg.path;
                }
                // 绘制图片
                ctx.drawImage(drawImg, imgX, imgY, trueWidth, trueHeight);
            });
            // 绘制按钮文字
            btn.fonts && btn.fonts.forEach(function (font) {
                var fontColor = font.fontColor || _defaultStyle.fontColor;
                var fontWeight = font.fontWeight || _defaultStyle.fontWeight;
                var fontSize = _this.getLength(font.fontSize || _defaultStyle.fontSize);
                var fontStyle = font.fontStyle || _defaultStyle.fontStyle;
                ctx.fillStyle = fontColor;
                ctx.font = fontWeight + " " + fontSize + "px " + fontStyle;
                String(font.text).split('\n').forEach(function (line, lineIndex) {
                    ctx.fillText(line, getFontX(line), getFontY(font, radius, lineIndex));
                });
            });
        });
        // 触发绘制后回调
        (_b = config.afterDraw) === null || _b === void 0 ? void 0 : _b.call(this, ctx);
    };
    /**
     * 对外暴露: 开始抽奖方法
     */
    LuckyWheel.prototype.play = function () {
        var _this = this;
        // 再次拦截, 因为play是可以异步调用的
        if (this.startTime)
            return;
        this.startTime = Date.now();
        this.prizeFlag = undefined;
        this.blockFlag = undefined;
        this.slowDownBlockBool = false;
        this.slowDownBool = false;
        this.run();
        // 最长时间10s
        setTimeout(function () {
            _this.stop(0, 0);
        }, 10000);
    };
    /**
     * 对外暴露: 缓慢停止方法
     * @param index 中奖索引
     */
    LuckyWheel.prototype.stop = function (index, index2) {
        this.prizeFlag = Number(index) % this.prizes.length;
        if (typeof index2 === 'number') {
            this.blockFlag = Number(index2) % this.blocks[0].text.length;
        }
    };
    /**
     * 实际开始执行方法
     * @param num 记录帧动画执行多少次
     */
    LuckyWheel.prototype.run = function (num) {
        if (num === void 0) { num = 0; }
        var _a = this, rAF = _a.rAF, prizeFlag = _a.prizeFlag, blockFlag = _a.blockFlag, prizeDeg = _a.prizeDeg, rotateDeg = _a.rotateDeg, _defaultConfig = _a._defaultConfig;
        var interval = Date.now() - this.startTime;
        // 中心，先完全旋转, 再停止 
        if (interval >= _defaultConfig.accelerationTime) {
            // 记录帧率
            this.FPS = interval / num;
            // 记录开始停止的时间戳
            this.endTime = Date.now();
            if (prizeFlag !== undefined && !this.slowDownBool) {
                // 记录开始停止的位置
                this.stopDeg = rotateDeg;
                var i = 0;
                // 测算最终停止的角度
                while (++i) {
                    var endDeg = 360 * i - prizeFlag * prizeDeg - rotateDeg - _defaultConfig.offsetDegree;
                    var currSpeed = quad.easeOut(this.FPS, this.stopDeg, endDeg, _defaultConfig.decelerationTime) - this.stopDeg;
                    if (currSpeed > _defaultConfig.speed) {
                        this.endDeg = endDeg + 135;
                        break;
                    }
                }
                this.slowDown();
            }
            if (blockFlag !== undefined && !this.slowDownBlockBool) {
                this.stopBlockDeg = this.rotateBlockDeg;
                var j = 0;
                while (++j) {
                    var endDeg = 360 * j - blockFlag * prizeDeg - rotateDeg - _defaultConfig.offsetDegree;
                    var currSpeed = quad.easeOut(this.FPS, this.stopBlockDeg, endDeg, _defaultConfig.decelerationTime) - this.stopBlockDeg;
                    if (currSpeed > _defaultConfig.speed) {
                        this.endBlockDeg = endDeg + 140;
                        break;
                    }
                }
                this.slowDownblock();
            }
        }
        this.rotateDeg = (rotateDeg + quad.easeIn(interval, 0, _defaultConfig.speed, _defaultConfig.accelerationTime)) % 360;
        this.rotateBlockDeg = (this.rotateBlockDeg + quad.easeIn(interval, 0, _defaultConfig.speed, _defaultConfig.accelerationTime)) % 360;
        this.draw();
        if (!this.slowDownBool || !this.slowDownBlockBool) {
            rAF(this.run.bind(this, num + 1));
        }
    };
    /**
     * 缓慢停止的方法 中心区域
     */
    LuckyWheel.prototype.slowDown = function () {
        var _a;
        this.slowDownBool = true;
        var _b = this, rAF = _b.rAF, prizes = _b.prizes, prizeFlag = _b.prizeFlag, stopDeg = _b.stopDeg, endDeg = _b.endDeg, _defaultConfig = _b._defaultConfig;
        var interval = Date.now() - this.endTime;
        if (interval >= _defaultConfig.decelerationTime) {
            this.startTime = 0;
            (_a = this.endCallback) === null || _a === void 0 ? void 0 : _a.call(this, __assign({}, prizes.find(function (prize, index) { return index === prizeFlag; })));
            return;
        }
        this.rotateDeg = quad.easeOut(interval, stopDeg, endDeg, _defaultConfig.decelerationTime) % 360;
        this.draw();
        rAF(this.slowDown.bind(this));
    };
    /**
     * 缓慢停止的方法 边框区域
     */
    LuckyWheel.prototype.slowDownblock = function () {
        var _a;
        this.slowDownBlockBool = true;
        var _b = this, rAF = _b.rAF, prizes = _b.prizes, blockFlag = _b.blockFlag, stopDeg = _b.stopDeg, endBlockDeg = _b.endBlockDeg, _defaultConfig = _b._defaultConfig, blocks = _b.blocks;
        var interval = Date.now() - this.endTime;
        if (interval >= _defaultConfig.decelerationTime) {
            this.startTime = 0;
            (_a = this.endCallback) === null || _a === void 0 ? void 0 : _a.call(this, { block: blocks[0].text.find(function (text, index) { return index === blockFlag; }) });
            return;
        }
        this.rotateBlockDeg = quad.easeOut(interval + 1000, stopDeg, endBlockDeg, _defaultConfig.decelerationTime) % 360;
        this.draw();
        rAF(this.slowDownblock.bind(this));
    };
    /**
     * 获取相对宽度
     * @param length 将要转换的宽度
     * @param width 宽度计算百分比
     * @return 返回相对宽度
     */
    LuckyWheel.prototype.getWidth = function (length, width) {
        if (width === void 0) { width = this.prizeRadian * this.prizeRadius; }
        if (isExpectType(length, 'number'))
            return length;
        if (isExpectType(length, 'string'))
            return this.changeUnits(length, width);
        return 0;
    };
    /**
     * 获取相对高度
     * @param length 将要转换的高度
     * @param height 高度计算百分比
     * @return 返回相对高度
     */
    LuckyWheel.prototype.getHeight = function (length, height) {
        if (height === void 0) { height = this.prizeRadius; }
        if (isExpectType(length, 'number'))
            return length;
        if (isExpectType(length, 'string'))
            return this.changeUnits(length, height);
        return 0;
    };
    /**
     * 获取相对(居中)X坐标
     * @param width
     * @return 返回x坐标
     */
    LuckyWheel.prototype.getOffsetX = function (width) {
        return -width / 2;
    };
    return LuckyWheel;
}(Lucky));

exports.LuckyWheel = LuckyWheel;
