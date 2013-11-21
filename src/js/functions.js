/** 
 * author: Juexin Wang
 * date: 2013-11-20
 * detail: 用于定义功能函数
 */

define(function(require, exports, modules) {
	/**
	 * @param {String} selector [CSS选择器]
	 */
	exports.getElement = function(selector) {
		return document.querySelector(selector);
	};
	/**
	 * @param {String} selector [CSS选择器]
	 */
	exports.getElements = function(selector) {
		return document.querySelectorAll(selector);
	};
	/**
	 * @param {HTMLElement} element
	 * @param {String} className
	 */
	exports.addClass = function(element, className) {
		var classStr = element.className;
		if (classStr.indexOf(className) === -1) {    //当前class属性中没有提供的值
			var classArr = classStr.split(/\s+/);
			classArr.push(className);
			element.className = classArr.join(' ');
		}
	};
	/**
	 * @param {HTMLElement} element
	 * @param {String} className
	 */
	exports.removeClass = function(element, className) {
		var classStr = element.className;
		if (classStr.indexOf(className) !== -1) {    //当前class属性中存在提供的值
            var classArr = classStr.split(/\s+/);
            for (var i = classArr.length; i >= 0; i--) {
                if (classArr[i] === className) {
                    classArr.splice(i, 1);
                }
            }
            element.className = classArr.join(' ');
		}
	};
	/**
	 * @param {HTMLElement} element
	 */
	exports.removeAllClass = function(element) {
		element.className = '';
	};
	/**
	 *
	 */
	exports.clone = function(oldObject) {
		var newObject = {};
		for (var item in oldObject) {
			if (typeof oldObject[item] === 'object') {
				newObject[item] = arguments.callee(oldObject[item]);
			} else {
				newObject[item] = oldObject[item];
			}
		}
		return newObject;
	}
});

var a = {
	a: '1',
	b: '2',
	c: {
		a: '1',
		b: '2',
		c: /\s/,
		d: [1, 3, 5]
	}
};