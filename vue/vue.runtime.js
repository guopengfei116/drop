(function(global, factory) {
	// commonjs规范
	typeof exports === 'object' && typeof module !==  undefined
		? module.exports = factory();
    // amd规范
    typeof define === 'function' && define.amd 
    	? define(factory)
	// 无论如何都会全局暴露Vue对象
    	: (global.Vue = factory());
})(this, (function() {
	'use strict';
	
	/**
	 * 把值转换为字符串：
	 * 1、对象stringify
	 * 2、null空字符串
	 * 3、其他toString
	 * */
	function _toString(val) {
		return val == null ? ''
			: typeof val === 'object'? JSON.stringify(val, null, 2) : String(val);
			
	}
	
	/**
	 * 表单值转数字：
	 * 1、尝试转换为浮点数然后返回
	 * 2、如果转换失败则返回原始值
	 * */
	function toNumber(val) {
		var n = parseFloat(val, 10);
		return (n || n === 0)? n : val;
	}
	
	/**
	 * 检测字符串中是否含有某值：
	 * 1、按照规则以逗号分隔提取字符串中的值
	 * 2、以值为可以映射出一个map对象，
	 * 3、然后返回一个函数用作判断map中是否含有某值
	 * 补充：第二个参数可以指定参数是否需要先转为小写后再判断
	 * */
	function makeMap(str, expectsLowerCase) {
		var map = Object.create(null);
		var list = str.split(',');
		for(var i = 0; i < list.length; i++) {
			map[list[i]] = true;
		}
		return expectsLowerCase
			? function(val) { return map[val.toLowerCase()]; }
			: function(val) { return map[val]; };
	}
	
	// 检查是不是一个构建标签
	var isBuiltInTag = makeMap('slot,component', true);
	
	/**
	 * 从数组中删除某个值
	 * */
	function remove$1(arr, item) {
		if(arr.length) {
			var index = arr.indexOf(item);
			if(index > -1) {
				return arr.splice(index, 1);
			}
		}
	}
	
	/**
	 * 检测对象中是否含有指定属性
	 * */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn(obj, key) {
		return hasOwnProperty.call(obj, key);
	}
	
	/**
	 * 检测数据是不是原始值(字符串与数字)
	 * */
	function isPrimitive(value) {
		return typeof value === 'string' || typeof value === 'number';
	}
	
	/**
	 * 创建缓存：
	 * 1、存储值的规则函数由创建者提供
	 * */
	function cached(fn) {
		var cache = Object.create(null);
		return function cachedFn(str) {
			var hit = cache[str];
			return hit || (cache[str] = fn(str));
		};
	}
	
	/**
	 * 创建一个缓存，用来提取-后面字符串的值
	 * */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function(str) {
		return str.replace(camelizeRE, function(_, c) {
			return c? c.toUpperCase() : '';
		});
	});
	
	/**
	 * 字符串首字母转大写
	 * */
	var capitalize = cached(function(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	});
	
	/**
	 * 
	 * */
	var hyphenateRE = /[^-]([A-Z])/g;
	var hyphenate = cached(function(str) {
		return str
			.replace(hyphenateRE, '$1-$2')
			.replace(hyphenateRE, '$1-$2')
			.toLowerCase()
	});
	
	/**
	 * bing简单实现，比本地的bind方法更快
	 * */
	function bind$1(fn, ctx) {
		function boundFn(a) {
			var l = arguments.length;
			return l
				? l > 1
					? fn.apply(ctx, arguments)
					: fn.call(ctx, a)
				: fn.call(ctx)
		}
		boundFn._length = fn.length;
		return boundFn;
	}
	
	/**
	 * 伪数组对象转为真数组
	 * */
	function toArray(list, start) {
		start = start || 0;
		var i = list.length - start;
		var ret = new Array(i);
		while(i--) {
			ret[i] = list[i + start];
		}
		return ret;
	}
	
	/**
	 * 混淆属性到目标对象
	 * */
	function extend(to, _from) {
		for(var key in _from) {
			to[key] = _from[key];
		}
		return to;
	}
	
	/**
	 * 核心对象检测
	 * */
	function isObject(obj) {
		return obj !== null && typeof obj === 'object';
	}
	
	/**
	 * Object类型的对象检测
	 * */
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject(obj) {
		return toString.call(obj) === OBJECT_STRING;
	}
	
	/**
	 * 合并数组中所有对象的属性到一个新对象中
	 * */
	function toObject(arr) {
		var res = {};
		for(var i = 0; i < arr.length; i++) {
			if(arr[i]) {
				extend(res, arr[i]);
			}
		}
		return res;
	}
	
	/**
	 * 无任何操作所执行的函数
	 * */
	function noop(){}
	
	/**
	 * 永远返回false的函数
	 * */
	var no = function() {
		return false;
	}
	
	/**
	 * 返回同一个值
	 * */
	var identity = function(_) {
		return _;
	};
	
	/**
	 * 根据所有编译模块，生成一个静态key构成的字符串
	 * */
	function genStaticKeys(modules) {
		return modules.reduce(function(keys, m) {
			return keys.concat(m.staticKeys || []);
		}, []).join(',');
	}
	
	/**
	 * 简单比较两个值是否相等：
	 * 1、对象比较内容是否一样
	 * 2、其他数据转字符串比较
	 * */
	function looseEqual(a, b) {
		var isObjectA = isObject(a);
		var isObjectB = isObject(b);
		if(isObjectA && isObjectB) {
			return JSON.stringify(a) === JSON.stringify(b);
		}else if(!isObjectA && !isObjectB) {
			return String(a) === String(b);
		}else {
			return false;
		}
	}
	
	/**
	 * 检测数组中是否含有某值，
	 * 相等的比较方式采用自己封装的规则。
	 * */
	function looseIndexOf(arr, val) {
		for(var i = 0; i < arr.length; i++) {
			if(looseEqual(arr[i], val)) {
				return 1;
			}
		}
		return -1;
	}
	
	var config = {
		
		/**
		 * 选项合并策略（在core/util/options中使用）
		 * */
		optionMergeStrategies: Object.create(null),
		
		/**
		 * 是否禁用警告
		 * */
		silent: false,
		
		/**
		 * 是否启用开发工具，如果当前开发模式并非生产那么就启用
		 * */
		devtools: "development" !== 'production',
		
		/**
		 * 监听错误时的错误句柄
		 * */
		errorHandler: null,
		
		/**
		 * 忽略某些定制的元素
		 * */
		ignoredElements: [],
		
		/**
		 * 定制v-on指令中用户定义的key别名
		 * */
		keyCodes: Object.create(null),
		
		/**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
		isReservedTag: no,
		
		/**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
		isUnknownElement: no,
		
		/**
		 * 在一个元素中获取命名空间
		 * */
		getTagNamespace: noop,
		
		/**
	   * Parse the real tag name for the specific platform.
	   */
		parsePlatformTagName: identity,
		
		/**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	    mustUseProp: no,
	  
	  /**
	   * 组件可以拥有的资源类型列表
	   * */
	    _assetTypes: [
		  	'component',
		  	'directive',
		  	'filter'
		],
	  
	  	/**
	  	 * lifecycle钩子列表
	  	 * */
		_lifecycleHooks: [
			'beforeCreate',
			'created',
			'beforeMount',
			'mounted',
			'beforeUpdate',
			'updated',
			'beforeDestroy',
			'destroyed',
			'activated',
			'deactivated'
		],
		
		/**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
		_maxUpdateCount: 100
	};
	
	/**
	 * 检测字符串开头是不是$或_
	 * */
	function isReserved(str) {
		var c = (str + '').charCodeAt(0);
		return c === 0x24 || c === 0x5F;
	}
	
	/**
	 * 定义属性
	 * */
	function def(obj, key, val, enumerable) {
		Object.defineProperty(obj, key, {
			value: val,
			enumerable: !!enumerable,
			writable: true,
			configurable: true
		});
	}
	
	/**
	 * 解析简单路径：
	 * 1、路径中含有非字母、点、$符号则非法路径不解析
	 * 2、合法路径先用点劈成路径片段
	 * 3、返回一个函数用于将来检测指定对象中是否含有这些路径片段
	 * 3.1、如果对象不存在这些路径片段返回undefined
	 * 3.2、如果对象里存有所有路径片段则返回最后一个
	 * */
	var bailRE = /[^\w.$]/;
	function parsePath(path) {
		if(bailRE.test(path)) {
			return;
		}else {
			var segments = path.split('.');
			return function(obj) {
				for(var i = 0; i <segments.length; i++) {
					if(!obj) {
						return;
					}else {
						obj = obj[segments[i]];
					}
				}
				return obj;
			};
		}
	}
	
	/**
	 * 全局变化观察者
	 * */
	
	// 是否可以使用__proto__属性
	var hasProto = '__proto__' in {};
	
	// 浏览器环境检测
	var inBrowser = typeof window !== 'undefined';
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
	
	/**
	 * 判断当前是否处于服务器渲染：
	 * 1、结果在每次调用函数后都会重新求值运算
	 * 2、主要根据进程中是否含有vue-server-renderer服务设置的VUE_ENVf属性来判读
	 * 3、webpack在运作时会处理这个进程属性
	 * */
	var _isServer;
	var isServerRendering = function() {
		if(_isServer === undefined) {
			if(!inBrowser && typeof global !== 'undefined') {
				_isServer = global['process'].env.VUE_ENV === 'server';
			}else {
				_isServer = false;
			}
		}
		return _isServer;
	}
	
	// 检测开发工具
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK_;
	
	/**
	 * 检测方法是不是本地提供的：
	 * istanbul ignore next
	 * */
	function isNative(Ctor) {
		return /native code/.test(Ctor.toString());
	}
	
	/**
	 * 延迟执行一个任务：
	 * Defer a task to execute it asynchronously.
	 * */
	var nextTick = (function() {
		var callbacks = [];
		var pending = false;
		var timerFunc;
		
		/**
		 * 执行下一轮回调
		 * */
		function nextTickHandler() {
			pending = false;
			var copies = callbacks.slice(0);
			callbacks.length = 0;
			for(var i = 0; i < copies.length; i++) {
				copies[i]();
			}
		}
		
		/**
		 * 异步执行下一轮回调：
		 * 1、如果支持promise使用promise
		 * 2、如果不支持使用MutationObserver
		 * 3、否则使用setTimeout
		 * */
		  // the nextTick behavior leverages the microtask queue, which can be accessed
		  // via either native Promise.then or MutationObserver.
		  // MutationObserver has wider support, however it is seriously bugged in
		  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
		  // completely stops working after triggering a few times... so, if native
		  // Promise is available, we will use it:
		  /* istanbul ignore if */
		if(typeof Promise !== 'undefined' && isNative(Promise)) {
			var p = Promise.resolve();
			var logError = function(err) {
				console.error(err);
			};
			timerFunc = function() {
				p.then(nextTickHandler).catch(logError);
				  // in problematic UIWebViews, Promise.then doesn't completely break, but
			      // it can get stuck in a weird state where callbacks are pushed into the
			      // microtask queue but the queue isn't being flushed, until the browser
			      // needs to do some other work, e.g. handle a timer. Therefore we can
			      // "force" the microtask queue to be flushed by adding an empty timer.
				if(isIOS) {
					setTimeout(noop);
				}
			}
		}else if(typeof MutationObserver !== 'undefined' && 
			(isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]')
		) {
			// use MutationObserver where native Promise is not available,
    		// e.g. PhantomJS IE11, iOS7, Android 4.4
			var counter = 1;
			var observer = new MutationObserver(nextTickHandler);
			var textNode = document.createTextNode(String(counter));
			observer.observe(textNode, {
				characterData: true
			});
			timeFunc = function() {
				counter = (counter + 1) % 2;
				textNode.data = String(counter);
			};
		}else {
			timerFunc = function() {
				setTimeout(nextTickHandler, 0);
			};
		}
		
		// 返回一个控制函数有序执行的函数
		return function queueNextTick(cb, ctx) {
			var _resolve;
			callbacks.push(function() {
				cb && cb.call(ctx);
				_resolve && _resolve(ctx);
			});
			if(!pending) {
				pending = true;
				timerFunc();
			}
			/**
			 * 如果没有传入回调，并且存在Promise，
			 * 那么返回一个Promise实例并把resolve方法缓存起来，
			 * 后续通过then方法执行回调。
			 * */
			if(!cb && typeof Promise !== 'undefined') {
				return new Promise(function(resolve) {
					_resolve = resolve;
				});
			}
		}
	})();
	
	var _Set;
	if(typeof Set !== 'undefined' && isNative(set)) {
		_Set = Set;
	}else {
		_Set = (function() {
			function Set() {
				this.set = Object.create(null);
			}
			Set.prototype.has = function has(key) {
				return this.set[key] === true;
			}
			Set.prototype.add = function add(key) {
				this.set[key] = true;
			}
			Set.prototype.clear = function clear() {
				this.set = Object.create(null);
			}
			return Set;
		}());
	}
	
	var warn = noop;
	var formatComponentName;
	{
		var hasConsole = typeof console !== 'undefined';
		
		/**
		 * 警告：
		 * 1、如果存在console方法并且警告未禁用
		 * 2、
		 * */
		warn = function(msg, vm) {
			if(hasConsole && (!config.silent)) {
				console.error("[Vue warn]: " + msg + " " + (
					vm? formatLocation(formatComponentName(vm)) : ''
				));
			}
		}
		
		/**
		 * 获取并格式化组件名：
		 * 1、root实例直接返回
		 * 2、Vue实例取$options中起的名字或标签名，不是Vue实例则直接取name属性值
		 * 2.1、如果取到了name那么返回组件名
		 * 2.2、如果未取到返回匿名组件描述（Vue实例额外添加该组件所在的文件名）
		 * */
		formatComponentName = function(vm) {
			if(vm.$root === vm) {
				return 'root instance';
			}
			
			var name = vm._isVue
				? vm.$options.name || vm.$options._componentTag
				: vm.name;
				
			return name? ("component <" + name + ">")
				: "anonymous component" 
					+ (vm._isVue && vm.$options.__file? (" at " + vm.$options.__file) : '')
		}
		
		/**
		 * 格式化组件完整的提示信息：
		 * 1、如果是匿名组件提示使用name选项可以提升调试能力
		 * 2、最后格式化整个提示信息
		 * */
		var formatLocation = function(str) {
			if(str === 'anonymous component') {
				str += " - use the \"name\" option for better debugging messages.";
			}
			return ("\n(found in " + str + ")");
		};
	}
	
	var uid$1 = 0;
	
	/**
	 * 一个dep是一个观察者并且可以有很多，
	 * 指令会订阅它。
	 * */
	var Dep = function Dep() {
		this.id = uid$1++;
		this.subs = [];
	};
	
	/**
	 * 添加订阅
	 * */
	Dep.prototype.addSub = function addSub(sub) {
		this.subs.push(sub);
	};
	
	/**
	 * 删除订阅
	 * */
	Dep.prototype.removeSub = function removeSub(sub) {
		remove$1(this.subs, sub);
	};
	
	/**
	 * 添加dep依赖：
	 * 1、如果存在Dep.target静态实例
	 * 2、那么调用addDep方法把当前实例添加进去
	 * */
	Dep.prototype.depend = function depend() {
		if(Dep.target) {
			Dep.target.addDep(this);
		}
	};
	
	/**
	 * 发布消息，告知订阅者：
	 * 1、先copy一份订阅者列表
	 * 2、然后依次调用订阅者的update方法
	 * */
	Dep.prototype.notify = function notify() {
		var subs = this.subs.slice();
		for(var i = 0, l = subs.length; i < l; i++) {
			subs[i].update();
		}
	};
	
	/**
	 * 1、执行当前的目标观察者
	 * 2、这是独一无二的只有一个
	 * 3、观察者将随时被执行
	 * */
	Dep.target = null;
	var targetStack = [];

	/**
	 * 目标观察者进栈：
	 * 1、如果存在目标观察者那么存储到栈中
	 * 2、然后修改当前的目标观察者
	 * */
	function pushTarget(_target) {
		if(Dep.target) {
			targetStack.push(Dep.target);
		}
		Dep.target = _target;
	}
	
	/**
	 * 目标观察者出栈：
	 * */
	function popTarget() {
		Dep.target = targetStack.pop();
	}
	
	/**
	 * 不要对这个文件进行检查，因为流不合适
	 * 动态访问数组原型的方法
	 * */
	
	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);
	
	/**
	 * 缓存数组的原始方法到arrayMethods对象中
	 * */
	['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function(method) {
		
		// 获取原生方法
		var original = arrayProto[method];
		
		/**
		 * arrayMethods对象定义数组几个常用方法：
		 * 1、内部缓存arguments
		 * 2、执行原生数组方法
		 * 3、如果执行的方法会新增值，那么就新增的值进行观察
		 * 4、方法执行完毕后发布消息
		 * 5、返回原生数组方法的执行结果
		 * */
		def(arrayMethods, method, function mutator() {
			
			/**
			 * 避免arguments泄漏，把值存储到数组中
			 * */
			var arguments$1 = arguments;
			var i = arguments.length;
			var args = new Array(i);
			while(i--) {
				args[i] = arguments$1[i];
			}
			
			// 执行方法
			var result = original.apply(this, args);
			
			/**
			 * 如果是添加值的操作，则对新增的值的进行观察
			 * */
			var ob = this.__ob__;
			var inserted;
			switch(method) {
				case 'push':
					inserted = args;
					break;
				case 'unshift':
					inserted = args;
					break;
				case 'splice':
					inserted = args.slice(2);
					break;
			}
			if(inserted) {
				ob.observeArray(inserted);
			}
			
			// notify change
			ob.dep.notify();
			return result;
		});
	});
	
	// 缓存数组常用方法的key
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	
	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
		shouldConvert: true,
		isSettingProps: false
	};
	
	/**
	 * 每个观察的观察者类
	 * 对象一旦附加，那么target就会被转换
	 * 对象的属性添加到getter/setter中
	 * 收集依赖关系和分派更新
	 * */
	var Observer = function Observer(value) {
		this.value = value;
		this.dep = new Dep();
		this.vmCount = 0;
		
		// 添加__ob__属性
		def(value, '__ob__', this);
		
		/**
		 * 如果是数组：
		 * 1、支持__proto__属性则让数组继承arrayMethods对象
		 * 2、不支持则copy方式添加到数组中
		 * 3、然后观察数组中的每一项
		 * 如果是对象：
		 * 则把对象中的属性转换为setter/setter。
		 * */
		if(Array.isArray(value)) {
			var augment = hasProto? protoAugment : copyAugment;
			augment(value, arrayMethods, arrayKeys);
			this.observeArray(value);
		}else {
			this.walk(value);
		}
	};
	
	/**
	 * 遍历每个属性并依次转换为getter/setter，
	 * 只有值类型为对象时才可以调用这些方法。
	 * */
	Observer.prototype.walk = function walk(obj) {
		var keys = Object.keys(obj);
		for(var i = 0; i < kyes.length; i++) {
			defineReactive$$1(obj, keys[i], obj[keys[i]]);
		}
	};
	
	/**
	 * 观察数组中的每一项
	 * */
	Observer.prototype.observeArray = function observeArray() {
		for(var i = 0, l = items.length; i < l; i++) {
			observe(items[i]);
		}
	};
	
	/**
	 * 使用__proto__属性设置对象的原型
	 * */
	function protoAugment(target, src) {
		target.__proto__ = src;
	}
	
	/**
	 * 把指定属性copy到对象中
	 * */
	function copyAugment(target, src, keys) {
		for(var i = 0, l = keys.length; i < l; i++) {
			var key = keys[i];
			def(target, key, src[key]);
		}
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe(value, asRootData) {
		
		// 不是对象直接返回
		if(!isObject(value)) {
			return;
		}
		
		// 对象已经被监听，则返回对应的观察者实例
		var ob;
		if(hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
			ob = value.__ob__;
		}
		/**
		 * 对象是数组或普通对象，
		 * 并且可扩展新属性，非vue实例，
		 * 非服务端环境，
		 * 那么创建一个新的观察者实例
		 * */
		else if(observerState.shouldConert && !isServerRendering()
			&& (Array.isArray(value) || isPlainObject(value))
			&& Object.isExtensible(value)
			&& !value._isVue
		) {
			ob = new Observer(value);
		}
		
		// 如果是根数据那么数量自增
		if(asRootData && ob) {
			ob.vmCount++;
		}
		return ob;
	}
	
	/**
	 * 在对象身上定义一个reactive属性
	 * */
	function defineReactive$$1(obj, key, val, customSetter) {
		var dep = new Dep();
		
		// 检测属性状态，如果不可配置直接返回
		var property = Object.getOwnPropertyDescriptor(obj, key);
		if(property && property.configurable === false) {
			return;
		}
		
		//  迎合提前定义好的getter与setters
		var getter = property && property.get;
		var setter = property && property.set;
		
		var childOb = observe(val);
		
		Object.defineProperty(obj, key, {
			
			enumerable: true,
			
			configurable: true,
			
			get: function reactiveGetter() {
				
				// 如果之前有getter通过getter取值，否则走参数
				var value = getter? getter.call(obj) : val;
				
				// 取值添加依赖
				if(Dep.target) {
					dep.depend();
					if(childObj) {
						childOb.dep.depend();
					}
					if(Array.isArray(value)) {
						dependArray(value);
					}
				}
				return value;
			},
			
			set: function reactiveSetter(newVal) {
				
				// 如果之前有getter通过getter取值，否则走参数
				var value = getter? getter.call(obj) : val;
				
				// 新值与旧值相同或者值为NaN则放弃设置
				if(newVal === value || (newVal !== newVal && value !== value)) {
					return;
				}
				
				if("development" !== 'production' && customSetter) {
					customSetter();
				}
				
				// 如果之前有setter通过setter设值，否则直接设值
				if(setter) {
					setter.call(obj, newVal);
				}else {
					val = newVal;
				}
				
				// 设值添加观察者并发布消息
				childOb = observe(newVal);
				dep.notify();
			}
		});
	}
	
	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set$1(obj, key, val) {
		
		// 数组指定下标替换一个值
		if(Array.isArray(obj)) {
			obj.length = Math.max(obj.length, key);
			obj.splice(key, 1, val);
			return val;
		}
		
		// 已存在该属性直接设置
		if(hasOwn(obj, key)) {
			obj[key] = val;
			return;
		}
		
		// 不存在该属性，vue实例或对象被观察，那么给出警告
		var ob = obj.__ob__;
		if(obj._isVue || (ob && ob.vmCount)) {
			"development" !== 'production' && warn(
				'Avoid adding reactive properties to a Vue instance or its root $data ' +
      			'at runtime - declare it upfront in the data option.'
			);
			return;
		}
		
		//  不存在该属性并且没有被观察则添加新值，
		// 然后进行观察，并发布消息。
		if(!ob) {
			obj[key] = val;
			return;
		}
		defineReactive$$1(obj.value, key, val);
		ob.dep.notify();
		return val;
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del(obj, key) {
		var ob = obj.__ob__;
		
		// vue实例或对象被观察，那么给出警告
		if(obj._isVue || (ob && ob.vmCount)) {
			"development" !== 'production' && warn(
		    	'Avoid deleting properties on a Vue instance or its root $data ' +
		    	'- just set it to null.'
		    );
    		return;
		}
		
		// 不存在这个属性忽略
		if(!hasOwn(obj, key)) {
			return;
		}
		
		// 存在则删除该属性并发布消息
		delete obj[key];
		ob && ob.dep.notify();
	}
	
	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray(value) {
		for(var e = (void 0), i = 0, l = value.length; i < l; i++) {
			e = value[i];
			e && e.__ob__ && e.__ob__.dep.depend();
			if(Array.isArray(e)) {
				dependArray(e);
			}
		}
	}
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;
	
	/**
	 * Options with restrictions
	 * */
	{
		strats.el = strats.propsData = function(parent, child, vm, key) {
			if(!vm) {
				warn(
					"option \"" + key + "\" can only be used during instance " +
        			'creation with the `new` keyword.'
				);
			}
			return defaultStrat(parent, child); 
		};
	}
	
	/** 911
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData(to, from) {
		
	}
	
	/** 931
	 * Data
	 * */
	strats.data = function(parentVal, childVal, vm) {
		
	};
	
	/** 985
	 * Hooks and param attributes are merged as arrays.
	 * */
	function mergeHook(parentVal, childVal) {
		
	}
	
	// 遍历每一个生命周期钩子添加到strats中
	config._lifecycleHooks.forEach(function(hook) {
		strats[hook] = mergeHook;
	});
	
	/** 1005
	 * Assets
	 * 
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 * */
	function mergeAssets(parentVal, childVal) {
		
	}
	
	// 遍历每一个资产类型添加到strats中
	config._assetTypes.forEach(function(type) {
		strats[type + 's'] = mergeAssets;
	});
	
	/** 1023
	 * Watchers.
	 * 
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 * */
	strats.watch = function(parentVal, childVal) {
		
	};
	
	/**
	 * 其他对象杂物
	 * */
	strats.props = strats.methods = strats.computed = function(parentVal, childVal) {
		
	};
	
	/** 1063
	 * 默认策略
	 * */
	var defaultStrat = function(parentVal, childVal) {
		
	};
	
	/**
	 * 验证组件名称
	 * */
	function checkComponents(options) {
		
	}
	
	/** 1086
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps(options) {
		
	}
	
	/**
	 * Normalize raw function directives into object format.
	 * */
	function normalizeDirectives(options) {
		
	}
	
	/** 1134
	 * 合并两个对象到一个新对象
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 * */
	function mergeOptions(parent, child, vm) {
		
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset(options, type, id, warnMissing) {
		
	}
	
	/**
	 * 验证属性
	 * */
	function validateProp(key, propOptions, propsData, vm) {
		
	}
	
	/** 1247 
	 * 获取默认的属性值
	 * */
	function getPropDefaultValue(vm, prop, key) {
		
	}
	
	/**
	 * 断言属性是不是有效的
	 * */
	function assertProp(prop, name, value, vm, absent) {
		
	}
	
	/**
	 * 断言value的类型
	 * */
	function assertType(value, type) {
		
	}
	
	/** 1358 
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType(fn) {
		
	}
	
	function isType(type, fn) {
		
	}
	
	
	/** 1383
	 * 上面的方法统一放在工具对象中
	 * */
	var util = Object.freeze({
		defineReactive: defineReactive$$1,
		_toString: _toString,
		toNumber: toNumber,
		makeMap: makeMap,
		isBuiltInTag: isBuiltInTag,
		remove: remove$1,
		hasOwn: hasOwn,
		isPrimitive: isPrimitive,
		cached: cached,
		camelize: camelize,
		capitalize: capitalize,
		hyphenate: hyphenate,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		toObject: toObject,
		noop: noop,
		no: no,
		identity: identity,
		genStaticKeys: genStaticKeys,
		looseEqual: looseEqual,
		looseIndexOf: looseIndexOf,
		isReserved: isReserved,
		def: def,
		parsePath: parsePath,
		hasProto: hasProto,
		isBrowser: inBrowser,
		UA: UA,
		isIE: isIE,
		isIE9: isIE9,
		isEdge: isEdge,
		isAndroid: isAndroid,
		isIOS: isIOS,
		isServerRendering: isServerRendering,
		devtools: devtools,
		nextTick: nextTick,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		validateProp: validateProp,
		get _Set() {
			return _Set;
		},
		get warn() {
			return warn;
		},
		get formatComponentName() {
			return formatComponentName;
		}
	});
	
	
	/* not type checking this file because flow doesn't play well with Proxy */
	var initProxy;
	{
		var allowedGlobals = makeMap(
			
		);
		
		var warnNonPresent = function(target, key) {
			
		};
		
		// 是否支持Proxy
		var hasProxy = 
			typeof Proxy !== 'undefined' 
			&& Proxy.toString().match(/native code/);
			
		if(hasProxy) {
			
		}
		
		var hasHandler = {
			
		};
		
		var getHandler = {
			
		};
		
		initProxy = function initProxy(vm) {
			
		};
	}
	
	
	// 1506
	var queue = [];
	var has$1 = {};
	var circular = {}; // 通知单
	var waiting = false; // 是否等待
	var flushing = false; // 是否冲洗
	var index = 0;
	
	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState() {
		
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue() {
		
	}
	
	/** 1575
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher(watcher) {
		
	}
	
	
	var uid$2 = 0;

	/** 1607
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher(vm, expOrFn, cb, options) {
		
	};
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get() {
		
	};
	
	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep(dep) {
		
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps() {
		
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update() {
		
	};
	
	/**
	 * Subscriber interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run() {
		
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Wacher.prototype.evaluate = function evaluate() {
		
	};
	
	/** 1775
	 * Depend on all deps collected by this watcher.
	 */
	Wacher.prototype.depend = function depend() {
		
	};
	
	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Wacher.prototype.teardown = function teardown() {
		
	};
	
	/** 1808
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse(val) {
		
	}
	
	function _traverse(val, seen) {
		
	}
	
	
	
	function initState(vm) {
		
	}
	
	// 保留属性
	var isReservedProp = { key: 1, ref: 1, slot: 1 };
	
	function initProps(vm, props) {
		
	}
	
	function initData(vm) {
		
	}
	
	// 对象属性共享的定义方式
	var computedSharedDefinition = {
		enumerable: true,
		configurable: true,
		get: noop,
		ser: noop
	};
	
	/** 1933
	 * 
	 * */
	function initComputed(vm, computed) {
		
	}
	
	function makeComputedGetter(getter, owner) {
		
	}
	
	function initMethods(vm, methods) {
		
	}
	
	function initWatch(vm, watch) {
		
	}
	
	function createWatcher(vm, key, handler) {
		
	}
	
	function stateMixin(Vue) {
		
	}
	
	function proxy(vm, key) {
		
	}
	
	
	
	/** 2070
	 * 
	 * */
	var VNode = function VNode(tag, data, children, text, elm, context, componentOptions) {
		this.tag = tag;
		this.data = data;
		this.children = children;
		this.text = text;
		this.elm = elm;
		this.ns = undefined;
		this.context = context;
		this.functionalContext = undefined;
		this.key = data && data.key;
		this.componentOptions = componentOptions;
		this.child = undefined;
		this.parent = undefined;
		this.raw = false;
		this.isStatic = false;
		this.isRootInsert = true;
		this.isComment = false;
		this.isCloned = false;
		this.isOnce = false;
	};
	
	/**
	 * 创建一个空注释虚拟节点
	 * */
	var createEmptyVNode = function() {
		var node = new VNode();
		node.text = '';
		node.isComment = true;
		return node;
	};
	
	/**
	 * 创建一个文本虚拟节点
	 * */
	function createTextVNode(val) {
		return new VNode(undefined, undefined, undefined, String(val));
	}
	
	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode(vnode) {
		var cloned = new VNode(
			vnode.tag,
			vnode.data,
			vnode.children,
			vnode.text,
			vnode.elm,
			vnode.context,
			vnode.componentOptions
		);
		cloned.ns = vnode.ns;
		cloned.isStatic = vnode.isStatic;
		cloned.key = vnode.key;
		cloned.isCloned = true;
		return cloned;
	}
	
	/**
	 * 批量clone虚拟节点
	 * */
	function cloneVNodes(vnodes) {
		var res = new Array(vnodes.length);
		for(var i = 0; i < vnodes.length; i++) {
			res[i] = cloneVNode(vnodes[i]);
		}
		return res;
	}
	
	/**
	 * 往节点中加入新的钩子函数：
	 * 如果def上没有__injected属性则初始化一个，
	 * 如果存在指定hookKey的钩子，则包装成新的钩子
	 * */
	function mergeVNodeHook(def, hookKey, hook, key) {
		key = key + hookKey;
		
		// def上定义一个注入hash
		var injectedHash = def.__injected || (def.__injected = {});
		
		if(!injectedHash[key]) {
			injectedHash[key] = true;
			var oldHook = def[hookKey];
			
			// 如果已经存在钩子，则新钩子优先执行，旧钩子后续执行
			if(oldHook) {
				def[hookKey] = function() {
					oldHook.apply(this, arguments);
					hook.apply(this, arguments);
				}
			}else {
				def[hookKey] = hook;
			}
		}
	}
	
	/**
	 * 更新事件监听器
	 * */
	function updateListeners(on, oldOn, add, remove$$1, vm) {
		var name, cur, old, fn, event, capture, once;
		
		/**
		 * 1、遍历所有要更新的事件
		 * 2、如果更新事件没有事件句柄则给出警告
		 * 3、如果更新事件没有旧事件
		 * 3.1、~代表一次性事件
		 * 3.2、!代表事件捕获阶段触发
		 * 3.3、如果是数组批量绑定那么转为一个函数在事件触发时批量执行
		 * 3.4、非数组，如没有invoker那么初始化一个对象添加fnInvoker
		 * 4、如果新旧事件不一样
		 * 4.1、旧事件是数组则置换数组中的每一个值为新的事件句柄
		 * 4.2、如果是函数那么直接置换
		 * */
		for(name in on) {
			cur = on[name];
			old = oldOn[name];
			if(!cur) {
				"development" !== 'production' && warn(
		        "Invalid handler for event \"" + name + "\": got " + String(cur)
		        , vm);
			}else if(!old) {
				once = name.charAt(0) === '~';
				event = once? name.slice(1) : name;
				capture = event.charAt(0) === '!';
				event = capture? event.slice(1) : event;
				if(Array.isArray(cur)) {
					add(event, (cur.invoker = arrInvoker(cur)), once, capture);
				}else {
					if(!cur.invoker) {
						fn = cur;
						cur = on[name] = {};
						cur.fn = fn;
						cur.invoker = fnInvoker(cur);
					}
					add(event, cur.invoker, once, capture);
				}
			}else if(cur !== old) {
				if(Array.isArray(old)) {
					old.length = cur.length;
					for(var i = 0; i < old.length; i++) {
						old[i] = cur[i];
					}
					on[name] = old;
				}else {
					old.fn = cur;
					on[name] = old;
				}
			}
		}
		
		/**
		 * 遍历旧事件，如果没有对应的新事件则进行移除
		 * */
		for(name in oldOn) {
			if(!on[name]) {
				once = name.charAt(0) === '~';
				event = once? name.slice(1) : name;
				capture = event.charAt(0) === '!';
				event = capture? event.slice(1) : event;
				remove$$1(event, oldOn[name].invoker, capture);
			}
		}
	}
	
	/**
	 * 根据列表生成一个可批量执行列表的单一函数
	 * */
	function arrInvoker(arr) {
		return function(ev) {
			var arguments$1 = arguments;
			var single = arguments.length === 1;
			for(var i = 0; i < arr.length; i++) {
				single? arr[i](ev) : arr[i].apply(null, arguments$1);
			}
		}
	}
	
	function fnInvoker(o) {
		return function(ev) {
			var single = arguments.length === 1;
			single? o.fn(ev) : o.fn.apply(null, arguments);
		}
	}
	
	// The template compiler attempts to minimize the need for normalization by
	// statically analyzing the template at compile time.
	//
	// For plain HTML markup, normalization can be completely skipped because the
	// generated render function is guaranteed to return Array<VNode>. There are
	// two cases where extra normalization is needed:
	
	// 1. When the children contains components - because a functional component
	// may return an Array instead of a single root. In this case, just a simple
	// nomralization is needed - if any child is an Array, we flatten the whole
	// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	// because functional components already normalize their own children.
	/**
	 * 简单格式化子元素数据：
	 * 1、遍历数据依次进行检测，
	 * 2、如果发现有数组嵌套则通过concat方法解除嵌套关系转为平级再返回。
	 * 3、如果没有原物返回数据
	 * */
	function simpleNormalizeChildren(children) {
		for(var i = 0; i < children.length; i++) {
			if(Array.isArray(children[i])) {
				return Array.prototype.concat.apply([], children);
			}
		}
		return children;
	}
	
	// 2. When the children contains constrcuts that always generated nested Arrays,
	// e.g. <template>, <slot>, v-for, or when the children is provided by user
	// with hand-written render functions / JSX. In such cases a full normalization
	// is needed to cater to all possible types of children values.
	/**
	 * 根据子元素数据创建元素：
	 * 1、如果是数字、字符串创建虚拟文本节点
	 * 2、如果是数组调用对应方法创建虚拟节点列表
	 * */
	function normalizeChildren(children) {
		return isPrimitive(children)? [createTextVNode(children)] 
			: Array.isArray(children)? normalizeArrayChildren(children) : undefined;
	}
	
	function normalizeArrayChildren(children, nestedIndex) {
		var res = [];
		var i, c, last;
		
		// 遍历所有节点数据
		for(i = 0; i < children.length; i++) {
			c = children[i];
			
			// 值为null或boolean的忽略
			if(c == null || typeof c === 'boolean') {
				continue;
			}
			
			/**
			 * 1、是数组递归创建虚拟节点然后push进来,
			 * 2、是数字或字符串
			 * 2.1、如果当前res中最后一个节点为文本节点那么把值拼接进入即可
			 * 2.2、如果不是空字符串，那么创建一个新的文本节点
			 * 3、是正常节点
			 * 3.1、如果节点中有文本，最后一个节点为文本节点则把文本节点内容拼接上来
			 * 3.2、如果是正常节点，key属性为null，nestedIndex有值则更新key属性
			 * */
			last = res[res.length - 1];
			if(Array.isArray(c)) {
				res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
			}else if(isPrimitive(c)) {
				if(last && last.text) {
					last.text += String(c);
				}else if(c !== '') {
					res.push(createTextVNode(c));
				}
			}else {
				if(c.text && last && last.text) {
					res[res.length - 1] = createTextVNode(last.text + c.text);
				}else {
					// default key for nested array children (likely generated by v-for)
					if(c.tag && c.key == null && nestedIndex != null) {
						c.key = "__vlist" + nestedIndex + "_" + i + "__";
					}
				}
				res.push(c);
			}
		}
		return res;
	}
	
	function getFirstComponentChild(children) {
		
	}
}));
