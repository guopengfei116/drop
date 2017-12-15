## vuex
- vuex是专为vue开发的状态管理插件（数据管理）
- 当项目中存在比较复杂的组件数据依赖或共享时可以考虑使用

## 基本使用

#### 需求
![实现效果](./imgs/numbox.png)

#### 实现
```html
<div id="app">
	<div>
		<span>最大总数：{{ maxTotal }}</span>
		<span>当前总数：{{ total }}</span>
	</div>
	<v-numbox></v-numbox>
	<v-numbox></v-numbox>
</div>
```
```javascript
// 数字框组件
Vue.component('v-numbox', {
	template:
		`<div>
			<button @click="sub">-</button>
			<input v-model="num"/>
			<button @click="add">+</button>
		</div>`,
	data() {
		return {
			num: 0
		};
	},
	methods: {
		add() {
			var state = this.$store.state;
			if(state.total < state.maxTotal) {
				this.num++;
				this.$store.commit('addTotal');
			}
		},
		sub() {
			if(this.num > 0) {
				this.num--;
				this.$store.commit('subTotal');
			}
		}
	}
});
```
```javascript
// 共享数据
var store = new Vuex.Store({

	// 数据定义
	state: {
		maxTotal: 10,
		total: 0
	},

	// 修改数据的方法
	mutations: {
		addTotal(state) {
			state.total++;
		},
		subTotal(state) {
			state.total--;
		}
	}

});
```
```javascript
// 实例
var vm = new vue({
	el: '#app',
	store,
	computed: {
		maxTotal() {
			return this.$store.state.maxTotal;
		},
		total() {
			return this.$store.state.total;
		}
	}
});
```

## 进阶

#### 配置项
- state
    + @作用：定义所有的状态
- getter
    + @作用：定义获取状态的方法
    + @备注：如果不需要对状态进行加工，直接通过state访问属性即可，无需调用这里的方法获取
- mutations
    + @作用：定义修改状态的方法
    + @备注：想要Vue调试工具监听状态的变化过程，必须调用这里的方法进行修改，否则监听不到
- actions
    + @作用：定义异步调用mutations方法的方法
    + @备注：想要Vue调试工具准确计算状态异步变化后的值，必须在这里异步调用mutations里的方法，否则值有错误
- modules
    + @作用：分割store为不同的模块

#### 其他方法
- Vuex.mapState
- Vuex.mapGetters
- Vuex.mapMutations
- Vuex.mapActions
