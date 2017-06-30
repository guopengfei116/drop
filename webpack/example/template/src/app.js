import './css/common.css';
//import './css/header.sass';

import layer from './components/layer/layer.js';
import profile from './components/profile/profile.js';

const App = function() {
	console.log('App created');
	console.log(layer);
};

App.prototype = {
	
	// 渲染layer
	renderLayer: function() {
		document.querySelector('#layer').innerHTML = layer.tpl;
	},
	
	// 渲染Profile
	renderProfile: function(data) {
		document.querySelector('#profile').innerHTML = profile.tpl(data);
	}
};

var app = new App();
app.renderLayer();
app.renderProfile({
	name: '呢滴',
	alias: ['二丫', '妮妮', '小滴']
});
