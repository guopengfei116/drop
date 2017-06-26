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
	
	// these helpers produces better vm code in JS engines due to their
	// explicitness and function inlining
	function isUndef(v) {
		return v === undefined || v === null;
	}
	
	function isDef(v) {
		return v !== undefined && v !== null;
	}
	
	function isTure(v) {
		return v === true;
	}
	
	function isFalse(v) {
		return v === false;
	}
	
	/**
	 * 检测数据是不是原始值(字符串与数字)
	 * */
	function isPrimitive(value) {
		return typeof value === 'string' || typeof value === 'number';
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject(obj) {
		return obj !== null && typeof obj === 'object';
	}
	
	// 缓存Object原型上的toString
	var _toString = Object.prototype.toString;
	
	// 检测是不是普通对象
	function isPlainObject(obj) {
		return _toString.call(obj) === '[object Object]';
	}
	
	// 检测是不是正则
	function isRegExp(v) {
		return _toString.call(v) === '[object RegExp]';
	}
	
	/**
	 * 把值转换为字符串：
	 * 1、对象stringify
	 * 2、null空字符串
	 * 3、其他toString
	 * */
	function toString(val) {
		return val == null ? ''
			: typeof val === 'object'? JSON.stringify(val, null, 2) : String(val);
	}
	
	/**
	 * 表单值转数字：
	 * 1、先把数据转为浮点数
	 * 2、如果为NaN则返回原始值，否则返回转换后的值
	 * */
	function toNumber(val) {
		var n = parseFloat(val, 10);
		return isNaN(n)? val : n;
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
	
	// 该方法用于检查是不是一个构建标签(slot,component)
	var isBuiltInTag = makeMap('slot,component', true);
	
	/**
	 * 从数组中删除某个值
	 * */
	function remove(arr, item) {
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
	 * 创建一个用于加工字符串的函数，加工过程由调用者提供：
	 * 1、内部创建一个用于缓存加工结果的对象
	 * 2、返回一个加工结果的函数
	 * 2.1、函数接受要加工的字符串
	 * 2.2、优先从缓存中取加工后的值
	 * 2.3、否则调用方法加工字符串缓存后返回
	 * */
	function cached(fn) {
		var cache = Object.create(null);
		return function cachedFn(str) {
			var hit = cache[str];
			return hit || (cache[str] = fn(str));
		};
	}
	
	/**
	 * 创建一个提取字符串-后面值的函数，
	 * 该函数可以缓存结果，下次提取回比较快。
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
	 * 创建一个转换字符的函数：
	 * 1、该函数会尝试把非-后面的大写字符使用-分隔，
	 * 2、最后全部转为小写并返回。
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
		// record original fn length
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
	 * 返回任何值
	 * */
	var identity = function(_) {
		return _;
	};
	
	/**
	 * 获取所有模块staticKeys属性构成的字符串：
	 * 1、遍历所有模块
	 * 2、依次并入每个模块的staticKeys属性到数组
	 * 3、最后把数组使用,号拼为字符串返回
	 * */
	function genStaticKeys(modules) {
		return modules.reduce(function(keys, m) {
			return keys.concat(m.staticKeys || []);
		}, []).join(',');
	}
	
	/**
	 * 简单比较两个值是否相等：
	 * 1、对象之间stringify之后比较，如果报错则比较引用
	 * 2、两个都不是对象则toString之后比较
	 * 3、对象与其他数据比较直接为false
	 * */
	function looseEqual(a, b) {
		var isObjectA = isObject(a);
		var isObjectB = isObject(b);
		if(isObjectA && isObjectB) {
			try{
				return JSON.stringify(a) === JSON.stringify(b);
			}catch(e) {
				return a === b;
			}
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
				return i;
			}
		}
		return -1;
	}
	
	/**
	 * 获取一个函数，用于执行一次指定函数；
	 * 如果函数执行过了则不会再次执行。
	 */
	function once(fn) {
		var called = false;
		return function() {
			if(!called) {
				called = true;
				fn.apply(this, arguments);
			}
		};
	}
	
	var SSR_ATTR = 'data-server-rendered';
	
	var ASSET_TYPES = [
		'component',
		'directive',
		'filter'
	];
	
	var LIFECYCLE_HOOKS = [
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
	];
	
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
	    * Whether to record perf
	    */
		performance: false,
		
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
	    * Check if an attribute is reserved so that it cannot be used as a component
	    * prop. This is platform-dependent and may be overwritten. 
	    */
  	    isReservedAttr: no,
		
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
//	    _assetTypes: [
//		  	'component',
//		  	'directive',
//		  	'filter'
//		],
	  
	  	/**
	  	 * lifecycle钩子列表
	  	 * */
		_lifecycleHooks: LIFECYCLE_HOOKS;
//		_lifecycleHooks: [
//			'beforeCreate',
//			'created',
//			'beforeMount',
//			'mounted',
//			'beforeUpdate',
//			'updated',
//			'beforeDestroy',
//			'destroyed',
//			'activated',
//			'deactivated'
//		],
		
		/**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
//		_maxUpdateCount: 100
	};
	
	/**
	 * 检测字符串开头是不是$或_
	 * */
	function isReserved(str) {
		var c = (str + '').charCodeAt(0);
		return c === 0x24 || c === 0x5F;
	}
	
	/**
	 * 对象定义属性
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
		}
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
	
	
	
	var warn = noop;
	var tip = noop;
	var formatComponentName = (null); // work around flow check
	{
		var hasConsole = typeof console !== 'undefined';
		var classifyRE = /(?:^|[-_])(\w)/g;
		
		/**
		 * 组件名转为大写形式的字符串：
		 * 1、把符合规则的字符转大写
		 * 2、然后去掉-和_首位标识字符
		 * */
		var classify = function(str) {
			return str
				.replace(classifyRE, function(c) {
					return c.toUpperCase();
				})
				.replace(/[-_]/g, '');
		}
		
		/**
		 * 警告：
		 * 1、如果存在console方法并且警告未禁用
		 * 2、
		 * */
		warn = function(msg, vm) {
			if(hasConsole && (!config.silent)) {
				console.error("[Vue warn]: " + msg + " " + (
					vm? generateComponentTrace(vm) : ''
				));
			}
		}
		
		tip = function(msg, vm) {
			if(hasConsole && (!config.silent)) {
				console.warn("[Vue tip]:" + msg + (
					vm? generateComponentTrace(vm) : ''
				));
			}
		};
		
		/**
		 * 获取组件名：
		 * 1、root实例直接返回<Root>
		 * 2、如果是字符串，认为已经获取到了组件名直接返回原值
		 * 3、如果是函数，并且具有options对象，则返回options中的name值
		 * 4、如果是Vue实例，取$options对象中的name值(用户自己起的)，或者_componentTag值(未取名则取标签名)
		 * 5、如果没有取到name，则取该组件的文件名
		 * 6、取到name值返回component提示，取文件名或无返回anonymous component提示
		 * */
		formatComponentName = function(vm, includeFile) {
			if(vm.$root === vm) {
				return '<Root>';
			}
			
			var name = typeof vm === 'string
				? vm
				: typeof vm === 'function' && vm.options
					? vm.options.name
					: vm._isVue
						? vm.$options.name || vm.$options._componentTag
						: vm.name;
						
			var file = vm._isVue && vm.$options.__file;
			if(!name && file) {
				var match = file.match(/([^/\\]+)\.vue$/);
				name = match && match[1];
			}
			
			return name
				? ("<" + (classify(name) + ">")
				: ("<Anonymous>" + (file && includeFile !== false? (" ac " + file) : ''));
		};
		
		/**
		 * 格式化组件完整的提示信息：
		 * 1、如果是匿名组件提示使用name选项可以提升调试能力
		 * 2、最后格式化整个提示信息
		 * */
//		var formatLocation = function(str) {
//			if(str === 'anonymous component') {
//				str += " - use the \"name\" option for better debugging messages.";
//			}
//			return ("\n(found in " + str + ")");
//		};
		
		/** 478
		 * 重复一串字符串
		 * */
		var repeat = function(str, n) {
			var res = '';
			while(n) {
				if(n % 2 == 1) {
					res += str;
				}
				if(n > 1) {
					str += str;
				}
				n >>= 1;
			}
			return res;
		};
		
		var generateComponentTrace = function(vm) {
			
			// vue实例并且拥有父，则找出所以父
			if(vm._isVue && vm.$parent) {
				var tree = [];
				var currentRecursiveSequence = 0;
				
				// 从子到父所有组件存储到tree中
				while(vm) {
					if(tree.length > 0) {
						 var last = tree[tree.length - 1];
						 if(last.constructor === vm.constructor) {
						 	currentRecursiveSequence++;
						 	vm = vm.$parent;
						 	continue;
						 }else if(currentRecursiveSequence > 0) {
						 	tree[tree.length - 1] = [last, currentRecursiveSequence];
            					currentRecursiveSequence = 0;
						 }
					}
					tree.push(vm);
					vm = vm.$parent;
				}
				
				// 从子到父返回所有组件的名字
				return '\n\nfound in\n\n'
					+ tree.map(function(vm, i) {
						return "" 
							+ (i === 0? '---> ' : repeat(' ', 5 + i * 2))
							+ (Array.isArray(vm)
								? (formatComponentName(vm[0])
									+ "... ("
									+ vm[1] 
									+ "recursive calls)")
								: formatComponentName(vm));
					}).join('\n');
			}
			
			// 没有父则返回自己的名字
			else {
				return "\n\n(found in " + (formatComponentName(vm)) + ")";
			}
		};
	}
	
	/**
	 * 错误处理函数：
	 * 1、优先使用config中的错误处理函数
	 * 2、否则使用warn函数
	 * 3、如果warn函数没有成功报错，那么尝试手动抛出错误
	 */
	function handleError(err, vm, info) {
		if(config.errorHandler) {
			config.errorHandler.call(null, err, vm, info);
		}else {
			{
				warn(("Error in " + info + ": \"" + err.toString() + "\""), vm);
			}
			if(inBrowser && typeof console !== 'undefined') {
				console.error(err);
			}else {
				throw err;
			}
		}
	}

	/** 537
	 * 全局变化观察者
	 * globals MutationObserver
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
	var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
	
	var supportsPassive = false;
	if(inBrowser) {
		try {
			var opts = {};
			Object.defineProperty(opts, 'passive', {
				get: function get() {
					supportsPassive = true;
				}
			});
			// https://github.com/facebook/flow/issues/285
			window.addEventListener('test-passive', null, opts);
		}catch(e) {}
	}
	
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
		return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
	}
	
	// 是否存在Symbol类型
	var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol)
		&& typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
	
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
				if(cb) {
					
					try {
						cb.call(ctx);
					}catch(e) {
						handleError(e, ctx, 'nextTick');
					}
					
				}else if(_resolve) {
					_resolve(ctx);
				}
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
	
			
	// 706	
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
		remove(this.subs, sub);
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
	
	/** 821
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
	function set(target, key, val) {
		
		// 标替数组指定下标的值
		if(Array.isArray(target) && typeof key === 'number') {
			target.length = Math.max(obj.length, key);
			target.splice(key, 1, val);
			return val;
		}
		
		// 如果对象已存在该属性，那么直接修改即可
		if(hasOwn(target, key)) {
			target[key] = val;
			return val;
		}
		
		// 如果对象不存在该属性，
		// 并且对象是vue实例，或者被观察者监听，在非生产环境下报错
		var ob = target.__ob__;
		if(target._isVue || (ob && ob.vmCount)) {
			"development" !== 'production' && warn(
				'Avoid adding reactive properties to a Vue instance or its root $data ' +
      			'at runtime - declare it upfront in the data option.'
			);
			return val;
		}
		
		// 如果该对象没有被观察者监听，
		// 则直接添加新值并返回
		if(!ob) {
			target[key] = val;
			return val;
		}
		
		// 不存在该属性，并且被观察者监听，
		// 那么通过特定方式添加新属性，并发布属性修改消息
		defineReactive$$1(ob.value, key, val);
		ob.dep.notify();
		return val;
	}
	
	/**
	 * 函数对象的指定属性：
	 * 1、数组通过splice删除
	 * 2、vue实例，或对象被观察者监听拥有实例，那么报错不允许删除属性
	 * 3、没有该属性的对象忽略删除操作
	 * 4、非vue实例对象删除属性
	 * 4.1、如果对象被观察者监听，删除后发布消息
	 * Delete a property and trigger change if necessary.
	 */
	function del(target, key) {
		
		if(Array.isArray(target) && typeof key === 'number') {
			target.splice(key, 1);
			return;
		}
		
		// vue实例，或对象被观察者监听拥有实例，那么报错不允许删除属性
		var ob = target.__ob__;
		if(target._isVue || (ob && ob.vmCount)) {
			"development" !== 'production' && warn(
		    	'Avoid deleting properties on a Vue instance or its root $data ' +
		    	'- just set it to null.'
		    );
    			return;
		}
		
		// 不存在这个属性忽略
		if(!hasOwn(target, key)) {
			return;
		}
		
		// 非vue实例删除属性，如果有观察者则发布消息
		delete target[key];
		ob && ob.dep.notify();
	}
	
	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 * 设置每个值的依赖关系
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
	
	/** 1047
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
	LIFECYCLE_HOOKS.forEach(function(hook) {
		strats[hook] = mergeHook;
	});
	
	/** 1164
	 * Assets
	 * 
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 * */
	function mergeAssets(parentVal, childVal) {
		
	}
	
	// 遍历每一个资产类型添加到strats中
	ASSET_TYPES.forEach(function(type) {
		strats[type + 's'] = mergeAssets;
	});
	
	/** 1181
	 * Watchers.
	 * 
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 * */
	strats.watch = function(parentVal, childVal) {
		
	};
	
	/** 1206
	 * 其他对象杂物
	 * */
	strats.props = strats.methods = strats.computed = function(parentVal, childVal) {
		
	};
	
	/** 1220
	 * 默认策略
	 * */
	var defaultStrat = function(parentVal, childVal) {
		
	};
	
	/**
	 * 验证组件名称
	 * */
	function checkComponents(options) {
		
	}
	
	/** 1244
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
	
	/** 1291
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
	
	/** 1369
	 * 验证属性
	 * */
	function validateProp(key, propOptions, propsData, vm) {
		
	}
	
	/** 1404 
	 * 获取默认的属性值
	 * */
	function getPropDefaultValue(vm, prop, key) {
		
	}
	
	/**
	 * 断言属性是不是有效的
	 * */
	function assertProp(prop, name, value, vm, absent) {
		
	}
	
	// 非普通对象、null、undefined类型数据的匹配正则
	var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;
	
	/** 1491
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
	
	
	/** 1533
	 *
	 */
	var mark;
	var measure;
	{
		var perf = inBrowser && window.performance;
		/* istanbul ignore if */
		if(perf && perf.mark && perf.measure
			&& perf.clearMarks && perf.clearMeasures) {
			mark = function(tag) {
				return perf.mark(tag);
			};
			measure = function(name, startTag, endTag) {
				perf.measure(name, startTag, endTag);
				perf.clearMarks(startTag);
			    perf.clearMarks(endTag);
			    perf.clearMeasures(name);
			};
		}
	}

	
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
	
	/** 1632
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
		this.componentInstance = undefined;
		this.parent = undefined;
		this.raw = false;
		this.isStatic = false;
		this.isRootInsert = true;
		this.isComment = false;
		this.isCloned = false;
		this.isOnce = false;
	};
	
	var prototypeAccessors = { child: {} };
	
	// DEPRECATED: alias for componentInstance for backwards compat.
	/* istanbul ignore next */
	prototypeAccessors.child.get = function() {
		return this.componentInstance;	
	};
	
	Object.defineProperty(Vnode.prototype, prototypeAccessors);
	
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
		cloned.isComment = vnode.isComment;
		cloned.isCloned = true;
		return cloned;
	}
	
	/**
	 * 批量clone虚拟节点
	 * */
	function cloneVNodes(vnodes) {
		var len = vnodes.length;
		var res = new Array(len);
		for(var i = 0; i < len; i++) {
			res[i] = cloneVNode(vnodes[i]);
		}
		return res;
	}
	
	/**
	 * 把一个事件指令转换为一个描述对象
	 * */
	var normalizeEvent = cached(function(name) {
		var passive = name.charAt(0) === '&';
		name = passive? name.slice(1) : name;
		var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
		var capture = name.charAt(0) === '!';
		name = capture? name.slice(1) : name;
		return {
			name: name,
			once: once$$1,
			capture: capture,
			passive: passive
		}
	});
	
	/**
	 * 创建一个能够执行事件队列的函数
	 * */
	function createFnInvoker(fns) {
		function invoker() {
			var arguments$1 = arguments;
			var fns = invoker.fns;
			if(Array.isArray(fns)) {
				for(var i = 0; i < fns.length; i++) {
					fns[i].apply(null, arguments$1);
				}
			}else {
				// return handler return value for single handlers
				return fns.apply(null, arguments);
			}
		}
		invoker.fns = fns;
		return invoker;
	}
	
	/**
	 * 更新事件监听器
	 * */
	function updateListeners(on, oldOn, add, remove$$1, vm) {
		var name, cur, old, event;
//		var name, cur, old, fn, event, capture, once;
		
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
			event = normalizeEvent(name);
			if(isUndef(cur)) {
				"development" !== 'production' && warn(
		        "Invalid handler for event \"" + event.name + "\": got " + String(cur)
		        , vm);
			}else if(isUndef(old)) {
				if(isUndef(cur.fns)) {
					cur = on[name] = createFnInvoker(cur);
				}
				add(event.name, cur, event.once, event.capture, event.passive);
			}else if(cur !== old) {
				old.fns = cur;
				on[name] = old;
			}
		}
		
		/**
		 * 遍历旧事件，如果没有对应的新事件则进行移除
		 * */
		for(name in oldOn) {
			if(isUndef(on[name])) {
				event = normalizeEvent(name);
				remove$$1(event.name, oldOn[name], event.capture);
			}
		}
	}
	
	
	/** 1787
	 * 往节点中加入新的钩子函数：
	 * 1、如果def上没有__injected属性则初始化一个，
	 * 2、如果存在指定hookKey的钩子，则包装成新的钩子
	 * */
	function mergeVNodeHook(def, hookKey, hook) {
		var invoker;
		var oldHook = def[hookKey];
		
		function wrappedHook() {
			hook.apply(this, arguments);
			// important: remove merged hook to ensure it's called only once
    			// and prevent memory leak
			remove(invoker.fns, wrappedHook);
		}
		
		// 以前没有钩子那么创建一个包装过的钩子
		if(isUndef(oldHook)) {
			// no existing hook
			invoker = createFnInvoker([wrappedHook]);
		}else {
			/* istanbul ignore if */
			if(isDef(oldHook.fns) && isTure(oldHook.merged)) {
				// already a merged invoker
				invoker = oldHook;
				invoker.fns.push(wrappedHook);
			}else {
				// existing plain hook
				invoker = createFnInvoker([oldHook, wrappedHook]);
			}
		}
		
		invoker.merged = true;
		def[hookKey] = invoker;
	}
	
	
	/** 1817
	 * 
	 * */
	function extractPropsFromVNodeData(data, Ctor, tag) {
		// we are only extracting raw values here.
		// validation and default values are handled in the child
		// component itself.
		var propOptions = Ctor.options.props;
		if(isUndef(propOptions)) {
			return;
		}
		
		var res = {};
		var attrs = data.attrs;
		var props = data.props;
		
		// 如果存在属性或特性，那么遍历属性配置项
		if(isDef(attrs) || isDef(props)) {
			for(var key in propOptions) {
				var altKey = hyphenate(key);
				{
					var keyInLowerCase = key.toLowerCase();
					
					// 如果当前key是大写，attrs中对应的key是小写，那么给出提示
					if(key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase) {
						tip(
				            "Prop \"" + keyInLowerCase + "\" is passed to component " +
				            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
				            " \"" + key + "\". " +
				            "Note that HTML attributes are case-insensitive and camelCased " +
				            "props need to use their kebab-case equivalents when using in-DOM " +
				            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
				        );
					}
						
				}
				checkProp(res, props, key, altKey, true)
				|| checkProp(res, attrs, key, altKey, false);
			}
		}
		return res;
	}
	
	/**
	 * 属性检测：
	 * 1、如果存在hash数据
	 * 2、如果hash中存在指定key
	 * 2.1、那么把hash中指定的key值赋给res
	 * 2.2、赋值完毕后依据情况删除hash中的值
	 * 3、如果hash中存在指定altKey
	 * 3.1、那么把hash中指定的altKey值赋给res
	 * 3.2、赋值完毕后依据情况删除hash中的值
	 * 4、如果赋的是altKey返回trure，否则返回false
	 * */
	function checkProp(res, hash, key, altKey, preserve) {
		if(isDef(hash)) {
			if(hasOwn(hash, key)) {
				res[key] = hash[key];
				if(!preserve) {
					delete hash[key];
				}
			}else if(hasOwn(hash, altKey)) {
				res[key] = hash[altKey];
				if(!preserve) {
					delete hash[altKey];
				}
				return true;
			}
		}
		return false;
	}
	

	// 1886
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
	
	// 判断是不是文本节点
	function isTextNode(node) {
		return isDef(node) && isDef(node.text) && isFalse(node.isComment);
	}
	
	function normalizeArrayChildren(children, nestedIndex) {
		var res = [];
		var i, c, last;
		
		// 遍历所有节点数据
		for(i = 0; i < children.length; i++) {
			c = children[i];
			
			// 值未定义或null或boolean则忽略
			if(isUndef(c) || typeof c === 'boolean') {
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
				if(isTextNode(last)) {
					last.text += String(c);
				}else if(c !== '') {
					res.push(createTextVNode(c));
				}
			}else {
				if(isTextNode(c) && isTextNode(last)) {
					res[res.length - 1] = createTextVNode(last.text + c.text);
				}else {
					// default key for nested array children (likely generated by v-for)
					if(isTure(children._isVList) && isDef(c.tag) && isUndef(c.key)
						&& isDef(nestedIndex)) {
						c.key = "__vlist" + nestedIndex + "_" + i + "__";
					}
				}
				res.push(c);
			}
		}
		return res;
	}
	
	
	/*  */
	function ensureCtor(comp, base) {

	}
	
	function resolveAsyncComponent(factory, baseCtor, context) {
		
	}
	
	function getFirstComponentChild(children) {
		
	}
	
	
	/* 2084 */
	
	/*  */
	function initEvents(vm) {
		
	}
	
	var target;
	
	function add(event, fn, once$$1) {
		
	}
	
	function remove$1(event, fn) {
		
	}
	
	function updateComponentListeners(vm, listeners, oldListeners) {
		
	}
	
	function eventsMixin(Vue) {
		var hookRE = /^hook:/;
		
		/** 2123
		 * 绑定事件：
		 * 1、如果事件句柄是多个那么遍历每一个递归绑定
		 * 2、如果是单个事件句柄
		 * 2.1、判断_events中有没有添加过该事件
		 * 2.2、添加过直接push没有添加过初始化一个空数组再push
		 * */
		Vue.prototype.$on = function(event, fn) {
			var this$1 = this;
			var vm = this;
			if(Array.isArray(event) {
				for(var i = 0, l = event.length; i < l; i++) {
					this$1.$on(event[i], fn);
				}
			}else {
				(vm._events[event] || (vm._events[event] = [])).push(fn);
				// optimize hook:event cost by using a boolean flag marked at registration
			    // instead of a hash lookup
			    if (hookRE.test(event)) {
			    		vm._hasHookEvent = true;
			    }
			}
			return vm;
		};
		
		/** 2123
		 * 绑定一次性事件：
		 * 1、复用$on方法绑定事件句柄
		 * 2、事件句柄是个包装过的句柄
		 * 2.1、执行时内部会先移除自己
		 * 2.2、然后执行包装前的句柄函数
		 * */
		Vue.prototype.$once = function(event, fn) {
			var vm = this;
			function on() {
				vm.$off(event, on);
				fn.apply(vm, arguments);
			}
			on.fn = fn;
			vm.$on(event, on);
			return vm;
		};
		
		Vue.prototype.$off = function(event, fn) {
			var this$1 = this;
			var vm = this;
			
			// 没有传参解除全部事件句柄，把_events设为空对象
			if(!arguments.length) {
				vm._events = Object.create(null);
				return vm;
			}
			
			// 如果是个数组，依次递归移除对应事件句柄
			if(Array.isArray(event)) {
				for(var i$1 = 0, l = event.length; i$1 < l; i$1++) {
					this$1.$off(event[i$1], fn);
				}
				return vm;
			}
			
			/** 
			 * 1、获取指定事件数组
			 * 1.1、如果不存在直接return实例
			 * 1.2、如果参数为1个那么清空整个事件句柄数组
			 * 1.3、否则找到对应的句柄删除
			 * */
			var cbs = vm._events[event];
			if(!cbs) {
				return vm;
			}
			
			if(arguments.length === 1) {
				vm._events[event] = null;
				return vm;
			}
			
			var cb;
			var i = cbs.length;
			while(i--) {
				cb = cbs[i];
				if(cb === fn || cb.fn === fn) {
					cbs.splice(i, 1);
					break;
				}
			}
			return vm;
		};
		
		Vue.prototype.$emit = function(event) {
			var vm = this;
			
			// 如果事件名是大写，事件组件中存储的是小写事件那么给出提示
			{
		      var lowerCaseEvent = event.toLowerCase();
		      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
		        tip(
		          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
		          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
		          "Note that HTML attributes are case-insensitive and you cannot use " +
		          "v-on to listen to camelCase events when using in-DOM templates. " +
		          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
		        );
		      }
			}
			
			// 遍历对应的事件数组依次执行
			var cbs = vm._events[event];
			if(cbs) {
				cbs = cbs.length > 1? toArray(cbs) :cbs;
				var args = toArray(arguments, 1);
				for(var i = 0, l = cbs.length; i < l; i++) {
					cbs[i].apply(vm, args);
				}
			}
			return vm;
		};
	}
	
	// 2219
	function resolveSlots(children, context) {
		
	}
	
	// 判断是不是一个空白节点
	function isWhitespace(node) {
		return node.isComment || node.text === ' ';
	}
	
	function resolveScopedSlots(fns, res) {
		
	}
	
	/* 2275 */
	function activeInstance = null;
	
	function initLifecycle(vm) {
		
	}
	
	function lifecycleMixin(Vue) {
		
		Vue.prototype._update = function(vnode, hydrating) {
			
		};
		
		Vue.prototype.$forceUpdate = function() {
			
		};
		
		Vue.prototype.$destroy = function() {
			
		};
	}
	
	function mountComponent(vm, el, hydrating) {
		
	}
	
	function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
		
	}
	
	function isInInactiveTree(vm) {
		
	}
	
	function activateChildComponent(vm, direct) {
		
	}
	
	function deactivateChildComponent(vm, direct) {
		
	}
	
	function callHook(vm, hook) {
		
	}
	
	/** xxx
	 * 上面的方法统一放在工具对象中
	 * */
//	var util = Object.freeze({
//		defineReactive: defineReactive$$1,
//		_toString: _toString,
//		toNumber: toNumber,
//		makeMap: makeMap,
//		isBuiltInTag: isBuiltInTag,
//		remove: remove$1,
//		hasOwn: hasOwn,
//		isPrimitive: isPrimitive,
//		cached: cached,
//		camelize: camelize,
//		capitalize: capitalize,
//		hyphenate: hyphenate,
//		bind: bind$1,
//		toArray: toArray,
//		extend: extend,
//		isObject: isObject,
//		isPlainObject: isPlainObject,
//		toObject: toObject,
//		noop: noop,
//		no: no,
//		identity: identity,
//		genStaticKeys: genStaticKeys,
//		looseEqual: looseEqual,
//		looseIndexOf: looseIndexOf,
//		isReserved: isReserved,
//		def: def,
//		parsePath: parsePath,
//		hasProto: hasProto,
//		isBrowser: inBrowser,
//		UA: UA,
//		isIE: isIE,
//		isIE9: isIE9,
//		isEdge: isEdge,
//		isAndroid: isAndroid,
//		isIOS: isIOS,
//		isServerRendering: isServerRendering,
//		devtools: devtools,
//		nextTick: nextTick,
//		mergeOptions: mergeOptions,
//		resolveAsset: resolveAsset,
//		validateProp: validateProp,
//		get _Set() {
//			return _Set;
//		},
//		get warn() {
//			return warn;
//		},
//		get formatComponentName() {
//			return formatComponentName;
//		}
//	});
	
	/* 2571 */
	
	var MAX_UPDATE_COUNT = 100;
	
	var queue = [];
	var activatedChildren = [];
	var has = {};
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
	
	function callUpdateHooks(queue) {
		
	}
	
	function queueActivatedComponent(vm) {
		
	}
	
	function callActivatedHooks(queue) {
		
	}
	
	/** 2683
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher(watcher) {
		
	}
	
	/* 2711 */
	var uid$2 = 0;

	/** 
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
	
	/** 2884
	 * Depend on all deps collected by this watcher.
	 */
	Wacher.prototype.depend = function depend() {
		
	};
	
	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Wacher.prototype.teardown = function teardown() {
		
	};
	
	/** 2917
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse(val) {
		
	}
	
	function _traverse(val, seen) {
		
	}
	
	/* 2951 */
	var sharedPropertyDefinition = {
		enumerable: true,
		configurable: true,
		get: noop,
		set: noop
	};
	
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
	
	function proxy(target, sourceKey, key) {
		
	}
	
	function initState(vm) {
		
	}
	
	var isReservedProp = {
		key: 1,
		ref: 1,
		slot: 1
	};
	
	/** 2990
	 * 
	 * */
	function initProps(vm, propsOptions) {
		
	}
	
	function initData(vm) {
		
	}
	
	function getData(data, vm) {
		
	}
	
	var computedWatcherOptions = { lazy: true };
	
	/** 3077
	 * 
	 * */
	function initComputed(vm, computed) {
		
	}
	
	function defineComputed(target, key, userDef) {
		
	}
	
	function createComputedGetter(key) {
		
	}
	
	
	
	function initMethods(vm, methods) {
		
	}
	
	function initWatch(vm, watch) {
		
	}
	
	function createWatcher(vm, key, handler) {
		
	}
	
	function stateMixin(Vue) {
		
	}
	
	/* 3235 */
	function initProvide(vm) {
		
	}
	
	function initInjections(vm) {
		
	}
	
	function resolveInject(inject, vm) {
		
	}
	
	/* 3291 */
	function createFunctionalComponent(Ctor, propsData, data, context, children) {
		
	}
	
	function mergeProps(to, from) {
		
	}
	
	/* 3339 */
	// hooks to be invoked on component VNodes during patch
	var componentVNodeHooks = {
		
	};
	
	var hooksToMerge = Object.keys(componentVNodeHooks);
	
	function createComponent(Ctor, data, context, children, tag) {
		
	}
	
	function createComponentInstanceForVnode(vnode, parent, parentElm, refElm) {
		
	}
	
	function mergeHooks(data) {
		
	}
	
	function mergeHook$1(one, two) {
		
	}
	
	// 3538
	// transform component v-model info (value and callback) into
	// prop and event handler respectively.
	function transformModel(options, data) {
		
	}
	
	/* 3551 */
	var SIMPLE_NORMALIZE = 1;
	var ALWAYS_NORMALIZE = 2;
	
	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
		
	}
	
	function _createElement(context, tag, data, children, normalizationType) {
		
	}
	
	function applyNS(vnode, ns) {
		
	}
	
	/**
	 * Runtime helper for rendering v-for lists.
	 * 渲染列表，v-for核心：
	 * 1、如果是数组或者字符串
	 * 1.1、遍历数组或者每个字符
	 * 1.2、分别渲染并把每个值存储起来
	 * 2、如果是数字
	 * 2.1、从1开始渲染每个数字，直到该数字为止
	 * 2.2、渲染的每个数字都会存储起来
	 * 3、如果是对象
	 * 3.1、遍历所有的key依次渲染每个值
	 * 3.2、渲染的每个值都会存储起来
	 * 4、如果ret被初始化，那么记录一个内部属性_isVList为true
	 * 5、返回ret
	 */
	function renderList(val, render) {
		var ret, i, l, keys, key;
		if(Array.isArray(val) || typeof val === 'string') {
			ret = new Array(val.length);
			for(i = 0, l = val.length; i < l; i++) {
				ret[i] = render(val[i], i);
			}
		}else if(typeof val === 'number') {
			ret = new Array(val);
			for(i = 0; i < val; i++) {
				ret[i] = render(i + 1, i);
			}
		}else if(isObject(val)) {
			keys = Object.keys(val);
			ret = new Array(keys.length);
			for(i = 0, l = keys.length; i < l; i++) {
				key = keys[i];
				ret[i] = render(val[key], key, i);
			}
		}
		if(isDef(ret)) {
			ret._isVList = true;
		}
		return ret;
	}
	
	/* 3693 */

	/**
	 * Runtime helper for rendering <slot>
	 * 渲染slot标签：
	 * 1、先通过name获取slotFn
	 * 2、如果获取成功
	 * 2.1、合并新选项到props中
	 * 2.2、然后调用slotFn方法传入合并后的props
	 * 2.3、返回调用结果，没有结果返回fallback
	 * 3、获取不成功
	 * 3.1、转而获取所有的slot节点
	 * 3.2、存在slotNodes，并且非部署环境
	 * 3.2.1、slotNodes已渲染则报错
	 * 3.2.2、未渲染则标注为已渲染
	 * 3.3、返回slotNodes，没有返回fallback
	 */
	function renderSlot(name, fallback, props, bindObject) {
		var scopedSlotFn = this.$scopedSlots[name];
		if(scopedSlotFn) {
			props = props || {};
			if(bindObject) {
				extend(props, bindObject);
			}
			return scopedSlotFn(props) || fallback;
		}else {
			var slotNodes = this.$slots[name];
			// warn duplicate slot usage
			if(slotNodes && "development" !== 'production') {
				slotNodes._rendered && warn(
					"Duplicate presence of slot \"" + name + "\" found in the same render tree " +
			        "- this will likely cause render errors.",
			        this
				);
				slotNodes._rendered = true;
			}
			return slotNodes || fallback;
		}
	}
	
	/* 3726 */

	/**
	 * Runtime helper for resolving filters
	 */
	function resolveFilter(id) {
		return resolveAsset(this.$options, 'filters', is, true) || identity;
	}
	
	/**
	 * Runtime helper for checking keyCodes from config.
	 */
	function checkKeyCodes(eventKeyCode, key, builtInAlias) {
		
	}
	
	/* 3753 */

	/**
	 * Runtime helper for merging v-bind="object" into a VNode's data.
	 */
	function bindObjectProps(data, tag, value, asProp) {
		
	}
	
	/* 3793 */

	/**
	 * Runtime helper for rendering static trees.
	 */
	function renderStatic(index, isInFor) {
		
	}
	
	/**
	 * Runtime helper for v-once.
	 * Effectively it means marking the node as static with a unique key.
	 */
	function markOnce(tree, index, key) {
		
	}
	
	function markStatic(tree, key, isOnce) {
		
	}
	
	// 标记一个节点为静态节点
	function markStaticNode(node, key, isOnce) {
		node.isStatic = true;
		node.key = key;
		node.isOnce = isOnce;
	}
	
	/* 3852 */
	
	function initRender(vm) {
		
	}
	
	function renderMixin(Vue) {
		
		/**
		 * 获取下一个标记
		 */
		Vue.prototype.$nextTick = function(fn) {
			return nextTick(fn, this);
		};
		
		Vue.prototype._render = function() {
			var vm = this;
			return vnode;
		};
		
		// internal render helpers.
		// these are exposed on the instance prototype to reduce generated render
		// code size.
		Vue.prototype._o = markOnce;
		Vue.prototype._n = toNumber;
		Vue.prototype._s = toString;
		Vue.prototype._l = renderList;
		Vue.prototype._t = renderSlot;
		Vue.prototype._q = looseEqual;
		Vue.prototype._i = looseIndexOf;
		Vue.prototype._m = renderStatic;
		Vue.prototype._f = resolveFilter;
		Vue.prototype._k = checkKeyCodes;
		Vue.prototype._b = bindObjectProps;
		Vue.prototype._v = createTextVNode;
		Vue.prototype._e = createEmptyVNode;
		Vue.prototype._u = resolveScopedSlots;
	}
	
	/* 3948 */

	var uid = 0;
	
	function initMixin(Vue) {
		
		/**
		 * Vue实例初始化：
		 * 1、添加实例唯一标识符_uid
		 * 2、非生产环境下，开启了性能测试，那么记录init时间
		 * 3、添加Vue实例专属标识符_isVue
		 * 4、给实例添加基础可选属性
		 * 4.1、如果options是个组件，那么copy其属性到实例$options中，并让$options继承静态options对象作为默认值存在
		 * 4.2、否则合并options参数、静态options对象、实例属性，构成新对象作为实例的$options
		 * 5、初始化实例代理
		 * 6、添加_self属性指向自己
		 * 7、Vue原型添加各种方法
		 * 8、触发beforeCreate钩子
		 * 9、初始化实例
		 * 10、触发created钩子
		 * 11、非生产环境下，开启了性能测试，那么计算整个初始化时间
		 * 12、如果实例有对应的页面元素，那么mount
		 */
		Vue.prototype._init = function(options) {
			var vm = this;
			vm._uid = uid++;
			
			var startTag, endTag;
			/* istanbul ignore if */
			if("development" !== 'production' && config.performance && mark) {
				startTag = "vue-perf-init:" + (vm._uid);
				endTag = "vue-perf-end:" + (vm._uid);
				mark(startTag);
			}
			
			// a flag to avoid this being observed
			vm._isVue = true;
			
			// merge options
			if(options && options._isComponent) {
				// optimize internal component instantiation
      			// since dynamic options merging is pretty slow, and none of the
      			// internal component options needs special treatment.
				initInternalComponent(vm, options);
			}else {
				vm.$options = mergeOptions(
					resolveConstructorOptions(vm.constructor),
					options || {},
					vm
				);
			}
			
			/* istanbul ignore else */
			{
				initProxy(vm);
			}
			
			// expose real self
			vm._self = vm;
			initLifecycle(vm);
			initEvents(vm);
			initRender(vm);
			callHook(vm, 'beforeCreate');
			initInjections(vm); // resolve injections before data/props
			initState(vm);
			initProvide(vm); // resolve provide after data/props
			callHook(vm, 'created');
			
			/* istanbul ignore if */
		    if ("development" !== 'production' && config.performance && mark) {
		      vm._name = formatComponentName(vm, false);
		      mark(endTag);
		      measure(((vm._name) + " init"), startTag, endTag);
		    }
		    
		    if(vm.$options.el) {
		    		vm.$mount(vm.$options.el);
		    }
		}
	}
	
	/**
	 * 初始化内部组件：
	 * 1、给实例初始化$options属性为新对象
	 * 2、新对象继承静态options，作为默认值
	 * 3、然后copy指定对象的属性到新对象
	 */
	function initInternalComponent(vm, options) {
		var opts = vm.$options = Object.create(vm.constructor.options);
		// doing this because it's faster than dynamic enumeration.
		opts.parent = options.parent; // 父组件
		opts.propsData = options.propsData;
		opts._parentVnode = options._parentVnode; // 父虚拟节点
		opts._parentListeners = options._parentListeners;
		opts._renderChildren = options._renderChildren;
		opts._componentTag = options._componentTag;
		opts._parentElm = options._parentElm; // 父元素
		opts._refElm = options._refElm;
		if(options.render) {
			opts.render = options.render;
    			opts.staticRenderFns = options.staticRenderFns;
		}
	}
	
	/**
	 * 重置构造器的静态options
	 */
	function resolveConstructorOptions(Ctor) {
		var options = Ctor.options;
		
		// 如果拥有父
		if(Ctor.super) {
			
			// 获取父的options，
			// 缓存Ctor当前的superOptions
			// 如果父的options和当前的superOptions不一样，那么替换为父的options
			var superOptions = resolveConstructorOptions(Ctor.super);
			var cachedSuperOptions = Ctor.superOptions;
			if(superOptions !== cachedSuperOptions) {
				// super option changed,
			    // need to resolve new options.
			    Ctor.superOptions = superOptions;
			    
			    // 检测属性是否有修改
			    // 有的话把未修改过的值记录在extendOptions中
			    // 然后并入到superOptions作为Ctor的新options
			    // check if there are any late-modified/attached options (#4976)
      			var modifiedOptions = resolveModifiedOptions(Ctor);
      			// update base extend options
			    if (modifiedOptions) {
			      extend(Ctor.extendOptions, modifiedOptions);
			    }
			    options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
				if(options.name) {
					options.components[options.name] = Ctor;
				}
			}
		}
		return options;
	}
	
	function resolveModifiedOptions(Ctor) {
		
	}
	
	// 4063
	// 快速去重
	function dedupe(latest, extended, sealed) {
		
	}
	
	function Vue$3(options) {
		if("development" !== 'production' && !(this instanceof Vue$3)) {
			warn('Vue is a constructor and should be called with the `new` keyword');
		}
		this._init(options);
	}
	
	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);
	
	
	/* 4098 */
	
	/**
	 * 添加静态加载插件方法：
	 * 1、如果插件已安装忽略
	 * 2、如果未安装则安装
	 * 2.1、则取调用use方法时传入的参数为数组
	 * 2.2、然后把第一个参数替换为当前vue实例(原来是插件对象)
	 * 2.3、调用插件暴露的install方法，把参数传递进去
	 * 3、安装完毕后给插件添加installed标识符防止重复安装
	 * 4、返回实例
	 */
	function initUse(Vue) {
		Vue.use = function(plugin) {
			if(plugin.installed) {
				return this;
			}
			
			var args = toArray(arguments, 1);
			args.unshift(this);
			if(typeof plugin.install === 'function') {
				plugin.install.apply(plugin, args);
			}else if(typeof plugin === 'function') {
				plugin.apply(null, args);
			}
			plugin.installed = true;
			return this;
		}
	}
	
	/**
	 * 添加静态混入方法：
	 * 1、合并静态options与新对象属性
	 * 2、置换合并后新的静态options
	 * 3、返回对应的Vue构造器
	 */
	function initMixin$1(Vue) {
		Vue.mixin = function(mixin) {
			this.options = mergeOptions(this.options, mixin);
			return this;
		};
	}
	
	function initExtend(Vue) {
		
	}
	
	/**
	 * 初始化组件props：
	 * 1、遍历组件props
	 * 2、每个key设置代理
	 */
	function initProps$1(Comp) {
		var props = Comp.options.props;
		for(var key in props) {
			proxy(Comp.prototype, "_props", key);
		}
	}
	
	/**
	 * 初始化组件computed：
	 * 1、遍历组件computed
	 * 2、每个值都配置getter、setter，防止值被修改
	 */
	function initComputed$1(Comp) {
		var computed = Comp.options.computed;
		for(var key in computed) {
			defineComputed(Comp.prototype, key, computed[key]);
		}
	}
	
	/* 4226 */
	
	function initAssetRegisters(Vue) {
		
	}
	
	var patternTypes = [String, RegExp];
	
	function getComponentName(opts) {
		
	}
	
	function matches(pattern, name) {
		
	}
	
	// 删除缓存
	function pruneCache(cache, current, filter) {
		
	}
	
	// 删除缓存入口
	// 销毁虚拟节点对应的组件实例
	function pruneCacheEntry(vnode) {
		if(vnode) {
			vnode.componentInstance.$destroy();
		}
	}
	
	// 保持活着
	var KeepAlive = {
		
	}
	
	var builtInComponents = {
		KeepAlive: KeepAlive
	};
	
	/* 4364 */
	
	function initGlobalAPI(Vue) {
		var configDef = {};
		
		// 获取默认的config对象
		configDef.get = function() {
			return config;
		}
		
		// 不能修改Vue.config
		{
			configDef.set = function() {
				warn(
			        'Do not replace the Vue.config object, set individual fields instead.'
		        );
			}
		}
		
		Object.defineProperty(Vue, 'config', configDef);
		
		// exposed util methods.
		// NOTE: these are not considered part of the public API - avoid relying on
		// them unless you are aware of the risk.
		Vue.util = {
			warn: warn,
			extend: extend,
			mergeOptions: mergeOptions,
			defineReactive: defineReactive$$1
		};
		
		Vue.set = set;
		Vue.delete = del;
		Vue.nextTick = nextTick;
		
		Vue.options = Object.create(null);
		ASSET_TYPES.forEach(function(type) {
			Vue.options[type + 's'] = Object.create(null);
		});
		
		// this is used to identify the "base" constructor to extend all plain-object
		// components with in Weex's multi-instance scenarios.
		Vue.options._base = Vue;
		
		extend(Vue.options.components, builtInComponents);
		
		initUse(Vue);
		initMixin$1(Vue);
		initExtend(Vue);
		initAssetRegisters(Vue);
	}
	
	initGlobalAPI(Vue$3);
	
	Object.defineProperty(Vue$3.prototype, '$isServer', {
		get: isServerRendering
	});
	
	Object.defineProperty(Vue$3.prototype, '$ssrContext', {
		get: function get() {
			return this.$vnode.ssrContext;
		}
	});
	
	Vue$3.version = '2.3.4';
	
	/* 4425 */
	
	// these are reserved for web because they are directly compiled away
	// during template compilation
	var isReservedAttr = makeMap('style,class');
	
	// 有value值的标签
	// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select');
	var mustUseProp = function(tag, type, attr) {
		
	};
	
	// 可枚举的属性
	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
	
	// 是布尔值的属性
	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);
	
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	
	var isXlink = function(name) {
		return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
	};
	
	var getXlinkProp = function(name) {
		return isXlink(name)? name.slice(6, name.length) : '';
	};
	
	var isFalsyAttrValue = function(val) {
		return val == null || val === false;
	};
	
	/* 4467 */
	
	// 收集虚拟节点的class
	function genClassForVnode(vnode) {
		
	}
	
	function mergeClassData(child, parent) {
		
	}
	
	function genClassFromData(data) {
		
	}
	
	function concat(a, b) {
		
	}
	
	function stringifyClass(value) {
		
	}
	
	/* 4539 */
	
	var namespaceMap = {
		svg: 'http://www.w3.org/2000/svg',
		math: 'http://www.w3.org/1998/Math/MathML'
	};
	
	var isHTMLTag = makeMap(
		'html,body,base,haed,link,meta,style,title,' +
		'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
		'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' + 
		'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
		's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
		'embed,object,param,source,canvas,script,noscript,del,ins,' +
		'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
		'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
		'output,progress,select,textarea,' +
		'details,dialog,menu,menuitem,summary,' +
		'content,element,shadow,template'
	);
	
	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
		'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
		'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
		'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
		true
	);
	
	
	// 判断是不是浏览器默认标签
	var isReservedTag = function(tag) {
		return isHTMLTag(tag) || isSVG(tag);
	};
	
	function getTagNamespace(tag) {
		
	}
	
	// 未知元素缓存
	var unknownElementCache = Object.create(null);
	function isUnknownElement(tag) {
		
	}
	
	/* 4612 */
	/**
	 * Query an element selector if it's not an element already.
	 */
	function query(el) {
		
	}
	
	function createElement$1(tagName, vnode) {
		
	}
	
	function createElementNS(namespace, tagName) {
		
	}
	
	function createTextNode(text) {
		
	}
	
	function createComment(text) {
		
	}
	
	function insertBefore(parentNode, newNode, referenceNode) {
		
	}
	
	function removeChild(node, child) {
		
	}
	
	function appendChild(node, child) {
		
	}
	
	function parentNode(node) {
		
	}
	
	function nextSibling(node) {
		
	}
	
	function tagName(node) {
		
	}
	
	function setTextContent(node, text) {
		
	}
	
	function setAttribute(node, key, val) {
		
	}
	
	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setAttribute: setAttribute
	});
	
	/* 4706 */
	
	var ref = {
		
	};
	
	function registerRef(vnode, isRemoval) {
		
	}
	
	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *
	
	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */
	
	var emptyNode = new VNode('', {}, []);
	
	var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];
	
	// 判断两节点是否相同
	function sameVnode(a, b) {
		
	}
	
	// 判断两input类型是否相同
	// Some browsers do not support dynamically changing type for <input>
	// so they need to be treated as different nodes
	function sameInputType(a, b) {
		
	}
	
	function createKeyToOldIdx(children, beginIdx, endIdx) {
		
	}
	
	// 4797
	function createPatchFunction(backend) {
		
	}
	
	/* 5375 */
	
	var directives = {
		
	};
	
	function updateDirectives(oldVnode, vnode) {
		
	}
	
	// 5391
	function _update(oldVnode, vnode) {
		
	}
	
	var emptyModifiers = Object.create(null);
	
	function normalizeDirectives$1(dirs, vm) {
		
	}
	
	function getRawDirName(dir) {
		
	}
	
	function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
		
	}
	
	var baseModules = [
		ref,
		directives
	];
	
	/* 5493 */
	
	function updateAttrs(oldVnode, vnode) {
		
	}
	
	function setAttr(el, key, value) {
		
	}
	
	var attrs = {
		create: updateAttrs,
		update: updateAttrs
	};
	
	
	/* 5562 */
	
	function updateClass(oldVnode, vnode) {
		
	}
	
	var klass = {
		create: updateClass,
		update: updateClass
	};
	
	/* 5600 */
	
	var validDivisionCharRE = /[\w).+\-_$\]]/
	
	function wrapFilter(exp, filter) {
		
	}
	
	/*  */

	/*  */
	
	/**
	 * Cross-platform code generation for component v-model
	 */
	
	
	/**
	 * Cross-platform codegen helper for generating v-model value assignment code.
	 */
	
	
	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */
	
	var str;
	var index$1;
	
	// in some cases, the event used has to be determined at runtime
	// so we used some reserved tokens during compile.
	var RANGE_TOKEN = '__r';
	var CHECKBOX_RADIO_TOKEN = '__c';
	
	// normalize v-model event tokens that can only be determined at runtime.
	// it's important to place the event as the first in the array because
	// the whole point is ensuring the v-model callback gets called before
	// user-attached handlers.
	function normalizeEvents(on) {
		
	}
	
	var target$1;
	
	function add$1(event, handler, once$$1, capture, passive) {
		
	}
	
	function remove$2(event, handler, capture, _target) {
		
	}
	
	function updateDOMListeners(oldVnode, vnode) {
		
	}
	
	var events = {
		create: updateDOMListeners,
		update: updateDOMListeners
	};
	
	/* 5734 */
	function updateDOMProps(oldVnode, vnode) {
		
	}
	
	// check platforms/web/util/attrs.js acceptValue
	
	// 将要更新值
	function shouldUpdateValue(elm, vnode, checkVal) {
		
	}
	
	// 脏检测
	function isDirty(elm, checkVal) {
		
	}
	
	function isInputChanged(elm, newVal) {
		
	}
	
	var domProps = {
		create: updateDOMProps,
		update: updateDOMProps
	};
	
	/* 5816 */
	
	var parseStyleText = cached(function(cssText) {
		
	});
	
	// merge static and dynamic style data on the same vnode
	function normalizeStyleData(data) {
		
	}
	
	// normalize possible array / string values into Object
	function normalizeStyleBinding(bindingStyle) {
		
	}
	
	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle(vnode, checkChild) {
		
	}
	
	/* 5883 */
	
	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function(el, name, val) {
		
	};
	
	var prefixes = ['Webkit', 'Moz', 'ms'];
	
	var testEl;
	var normalize = cached(function(prop) {
		
	});
	
	function updateStyle(oldVnode, vnode) {
		
	}
	
	var style = {
		create: updateStyle,
		update: updateStyle
	};
	
	/* 5974 */
	
	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass(el, cls) {
		
	}
	
	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass(el, cls) {
		
	}
	
	/* 6028 */
	
	function resolveTransition(def$$1) {
		
	}
	
	var autoCssTransition = cached(function(name) {
		
	});
	
	var hasTransition = isBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';
	
	// Transition property/event sniffing
	
	// 动画帧函数
	// binding to window is necessary to make hot reload work in IE in strict mode
	var raf = inBrowser && window.requestAnimationFrame
		? window.requestAnimationFrame.bind(window) : setTimeout;
	
	function nextFrame(fn) {
		
	}
	
	function addTransitionClass(el, cls) {
		
	}
	
	function removeTransitionClass(el, cls) {
		
	}
	
	function whenTransitionEnds(el, expectedType, cb) {
		
	}
	
	var transformRE = /\b(transform|all)(,|$)/;
	
	function getTransitionInfo(el, expectedType) {
		
	}
	
	function getTimeout(delays, durations) {
		
	}
	
	function toMs(s) {
		
	}
	
	/* 6203 */
	
	function enter(vnode, toggleDisplay) {
		
	}
	
	function leave(vnode, rm) {
		
	}
	
	function checkDuration(val, name, vnode) {
		
	}
	
	function isValidDuration(val) {
		
	}
	
	/**
	 * Normalize a transition hook's argument length. The hook may be:
	 * - a merged hook (invoker) with the original in .fns
	 * - a wrapped component method (check ._length)
	 * - a plain function (.length)
	 */
	function getHookArgumentsLength(fn) {
		
	}
	
	function _enter(_, vnode) {
		
	}
	
	var transition = inBrowser? {
		
	} : {};
	
	var platformModules = [
		attrs,
		klass,
		events,
		domProps,
		style,
		transition
	];
	
	/* 6528 */
	
	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);
	
	var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });
	
	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */
	
	/* istanbul ignore if */
	if(isIE9) {
		// http://www.matts411.com/post/internet-explorer-9-oninput/
		document.addEventListener('selectionchange', function() {
			var el = document.activeElement;
			if(el && el.vmodel) {
				trigger(el, 'input');
			}
		});
	}
	
	var model$1 = {
		
	};
	
	function setSelected(el, binding, vm) {
		
	}
	
	// 6631
	function hasNoMatchingOption(value, options) {
		
	}
	
	function getValue(option) {
		return '_value' in option
			? option._value : option.value;
	}
	
	function onCompositionStart(e) {
		
	}
	
	function onCompositionEnd(e) {
		
	}
	
	// 触发事件
	function trigger(el, type) {
		var e = document.createEvent('HTMLEvents');
		e.initEvent(type, true, true);
		el.dispatchEvent(e);
	}
	
	/* 6664 */
	
	// recursively search for possible transition defined inside the component root
	function locateNode(vnode) {
		
	}
	
	var show = {
		
	};
	
	var platformDirectives = {
		model: model$1,
		show: show
	};
	
	/* 6733 */
	
	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)
	
	var transitionProps = {
		name: String,
		appear: Boolean,
		css: Boolean,
		mode: String,
		type: String,
		enterClass: Stirng,
		leaveClass: String,
		enterToClass: String,
		leaveToClass: String,
		enterActiveClass: String,
		leaveActiveClass: String,
		appearClass: String,
		appearActiveClass: String,
		appearToClass: String,
		duration: [Number, String, Object]
	};

	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild(vnode) {
		
	}
	
	function extractTransitionData(comp) {
		
	}
	
	function placeholder(h, rawChild) {
		
	}
	
	function hasParentTransition(vnode) {
		
	}
	
	function isSameChild(child, oldChild) {
		
	}
	
	var Transition = {
		
	};
	
	/* 6910 */
	
	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.
	
	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final desired state. This way in the second pass removed
	// nodes will remain where they should be.
	
	var props = extend({
		tag: String,
		moveClass: String
	}, transitionProps);
	
	delete props.mode;
	
	var TransitionGroup = {
		
	};
	
	function callPendingCbs(c) {
		
	}
	
	function recordPosition(c) {
		
	}
	
	function applyTranslation(c) {
		
	}
	
	var platformComponents = {
		Transition: Transition,
		TransitionGroup: TransitionGroup
	};
	
	/* 7082 */
	
	// install platform specific utils
	Vue$3.config.mustUseProp = mustUseProp; // 必须使用属性
	Vue$3.config.isReservedTag = isReservedTag; // 是不是浏览器原生标签
	Vue$3.config.isReservedAttr = isReservedAttr; // 是不是浏览器原生属性
	Vue$3.config.getTagNamespace = getTagNamespace; // 是不是标签命名空间
	Vue$3.config.isUnknownElement = isUnknownElement; // 是不是未知元素
	
	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);
	
	// install platform patch function
	Vue$3.prototype.__patch__ = inBrowser? patch : noop;
	
	// public mount method
	Vue$3.prototype.$mount = function(el, hydrating) {
		el = el && inBrowser? query(el) : undefined;
		return mountComponent(this, el, hydrating);
	}
	
	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function() {
		
		if(config.devtools) {
			if(devtools) {
				devtools.emit('init', Vue$3);
			}else if("development" !== 'production' && isChrome) {
				console[console.info ? 'info' : 'log'](
			        'Download the Vue Devtools extension for a better development experience:\n' +
			        'https://github.com/vuejs/vue-devtools'
			    );
			}
		}
		
		if("development" !== 'production' 
			&& config.productionTip !== false
			&& inBrowser 
			&& typeof console !== 'undefined') {
			console[console.info ? 'info' : 'log'](
		      "You are running Vue in development mode.\n" +
		      "Make sure to turn on production mode when deploying for production.\n" +
		      "See more tips at https://vuejs.org/guide/deployment.html"
		    );
		}
	}, 0);
	
	/* 7132 */
	
	return Vue$3;
	
}));