
module.exports = function(Vue){
 let letters = {};
 let stored = {};
 let initboardletter = new Array(15);
 let initboardimg = new Array(15);
 let initboardfilled = new Array(15);

 

	for (let element of document.querySelectorAll('[data-init]')) {
		let data = JSON.parse(element.getAttribute('data-init'))
		for (let i in data.letters) letters[i] = data.letters[i]
		for (let i in data.stored) stored[i] = data.stored[i]
		//console.log(input);
	}


	Vue.component('single-tile', {
		props: ['letter'],
		template: '<div class="inner"><i class="fas fa-fw fa-crown" v-if="letter==5"></i>{{letter==4?"TW":letter==3?"DW":letter==2?"TL":letter==1?"DL":""}}</div>'
	})

	var gameshow = new Vue({
		el: '#gameshow-scope',
		data: {
			letters: letters,
			stored: stored,
			letter: initboardletter,
			img: initboardimg,
			filled: initboardfilled,
		},
		computed: {
			boardvalue: function(){
				let y = 0;
				let x = 0;
				for(y = 0; y < 15; y++){
			 	let temp = new Array(15);
			 	let temp2 = new Array(15);
			 	let temp3 = new Array(15);
			 	for(x = 0; x < 15; x++){
			 		temp[x] = 0;
			 		temp3[x] = 0;
			 		if(x == 7 && y == 7){
			 			temp2[x] = 5;
			 		}else if(y%7==0 && x%7==0){
			 			temp2[x] = 4;
			 		}else if(((y==3 || y==11) && (x==0 || x==14))
			 				|| ((y==0 || y==14) && (x==3 || x==11))){
			 			temp2[x] = 1;
			 		}else if((x == y || x+y==14) && x > 0 && x < 14){
			 			if(x<5 || x>9){
			 				temp2[x] = 3;
			 			}else if(x==5 || x==9){
			 				temp2[x] = 2;
			 			}else if(x==6 || x==8){
			 				temp2[x] = 1;
			 			}else{
			 				temp2[x] = 0;
			 			}
			 		}else if((x==6 && y==2) // ==== left
			 										||(x==8 && y==2) // ==== left
			 										||(x==7 && y==3) // ==== left
			 										||(x==2 && y==6) // ==== top
			 										||(x==2 && y==8) // ==== top
			 										||(x==3 && y==7) // ==== top
			 										||(x==11 && y==7) // ==== right
			 										||(x==12 && y==8) // ==== right
			 										||(x==12 && y==6) // ==== right
			 										||(x==6 && y==12) // ==== bottom
			 										||(x==7 && y==11) // ==== bottom
			 										||(x==8 && y==12)){
		 				temp2[x] = 1;
		 			}else if((x==5 && y==1) // ==== left
		 										||(x==9 && y==1) // ==== left
		 										||(x==1 && y==5) // ==== top
		 										||(x==1 && y==9) // ==== top
		 										||(x==5 && y==13) // ==== right
		 										||(x==9 && y==13) // ==== right
		 										||(x==13 && y==5) // ==== bottom
		 										||(x==13 && y==9)){
		 				temp2[x] = 2;
		 			}else{
			 			temp2[x] = 0;
			 		}
			 	}
					initboardletter[y] = temp;
					initboardimg[y] = temp2;
					initboardfilled[y] = temp3;
			 }

				return initboardimg;
			},
			isFilled: function(y, x){
				console.log(y);
				if(initboardfilled[y] != null){
					if(initboardfilled[y][x]==0){
						return false;
					}
					return true;
				}

				return false;
			}
		},
		delimiters: ['[[', ']]']
	});

	return gameshow;

}