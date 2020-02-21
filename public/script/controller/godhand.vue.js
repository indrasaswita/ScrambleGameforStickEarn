
module.exports = function(Vue){
	

	var myMixin = {
		created: function(){
		},
		method: {
			hello: function(){
				return "Hi Vue";
			}
		}
	};

	var Component = Vue.extend({
		mixin: [myMixin]
	});

	var godhand = new Component();

	return godhand;

}