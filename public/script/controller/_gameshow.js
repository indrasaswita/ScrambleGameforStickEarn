module.exports = function(app){
	app.controller('GameshowController', ['$scope', '$http', 'API_URL', 'AJAX_URL', 'BASE_URL', '$window',
		function($scope, $http, API_URL, AJAX_URL, BASE_URL, $window){
			$scope.boardvalue = [];
			$scope.boardimage = [];
			$scope.boardinput = [];
			$scope.boardhighl = [];

			$scope.resultwords = null;
			$scope.letters = null;
			$scope.stored = null;

			$scope.totalvalue = 0;

			$combination = [
				{"letter":"A","value":1},
				{"letter":"B","value":3},
				{"letter":"C","value":3},
				{"letter":"D","value":2},
				{"letter":"E","value":1},
				{"letter":"F","value":4},
				{"letter":"G","value":2},
				{"letter":"H","value":4},
				{"letter":"I","value":1},
				{"letter":"J","value":8},
				{"letter":"K","value":5},
				{"letter":"L","value":1},
				{"letter":"M","value":3},
				{"letter":"N","value":1},
				{"letter":"O","value":1},
				{"letter":"P","value":3},
				{"letter":"Q","value":10},
				{"letter":"R","value":1},
				{"letter":"S","value":1},
				{"letter":"T","value":1},
				{"letter":"U","value":1},
				{"letter":"V","value":4},
				{"letter":"W","value":4},
				{"letter":"X","value":8},
				{"letter":"Y","value":4},
				{"letter":"Z","value":10},
				{"letter":" ","value":0},
			];

			$scope.initData = function($letters, $stored){
				$scope.letters = JSON.parse($letters);
				$.each($scope.letters, function($i, $ii){
					$scope.letters.selected = false;
				});
				$scope.stored = JSON.parse($stored);
				$scope.emptyBoard();
				$scope.simplifyStore();
			} 

			$scope.emptyBoard = function(){
				let y = 0;
				let x = 0;
				for(y = 0; y < 15; y++){
					let temp = new Array(15);
					let temp2 = new Array(15);
					let temp3 = new Array(15);
					let temp4 = new Array(15);
					for(x = 0; x < 15; x++){
						temp[x] = {"letter": "", "value": 0};
						temp3[x] = {"letter": "", "value": 0};
						temp4[x] = false;
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
					$scope.boardvalue[y] = temp;
					$scope.boardimage[y] = temp2;
					$scope.boardinput[y] = temp3;
					$scope.boardhighl[y] = temp4;
				}

				$scope.boardvalue[7][6] = {"letter": "B", value: 3};
				$scope.boardvalue[7][7] = {"letter": "E", value: 1};
				$scope.boardvalue[7][8] = {"letter": "A", value: 1};
				$scope.boardvalue[7][9] = {"letter": "N", value: 1};
				//$scope.boardinput[5][9] = {"letter": "B", value: 3};
				//$scope.boardinput[6][9] = {"letter": "A", value: 1};
				//$scope.boardinput[7][9] = {"letter": "B", value: 3};
				//$scope.boardinput[8][9] = {"letter": "I", value: 1};
				$scope.boardvalue[9][9] = {"letter": "T", value: 1};
				$scope.boardvalue[8][9] = {"letter": "U", value: 1};

				$scope.fillHighlight();
			}

			$scope.isFilled = function($y, $x){
				if($scope.boardvalue != null)
					if($scope.boardvalue[$y] != null)
						if($scope.boardvalue[$y][$x] != null)
							if($scope.boardvalue[$y][$x].letter != ""){
								return true;
							}
				return false;
			}

			$scope.isNewFilled = function($y, $x){
				if($scope.boardinput != null)
					if($scope.boardinput[$y] != null)
						if($scope.boardinput[$y][$x] != null)
							if($scope.boardinput[$y][$x].letter != ""){
								return true;
							}
				return false;
			}

			$scope.getLetter = function($y, $x){
				if($scope.boardvalue != null)
					if($scope.boardvalue[$y] != null)
						if($scope.boardvalue[$y][$x] != null){
							return $scope.boardvalue[$y][$x].letter;
						}
			}

			$scope.getNewLetter = function($y, $x){
				if($scope.boardinput != null)
					if($scope.boardinput[$y] != null)
						if($scope.boardinput[$y][$x] != null){
							return $scope.boardinput[$y][$x].letter;
						}
			}

			$scope.isNewEnable = function($y, $x){
				if($scope.boardhighl != null)
					if($scope.boardhighl[$y] != null)
						return $scope.boardhighl[$y][$x];
			}

			$scope.fillHighlight = function(){
				$countnewfilled = 0;
				for($y=0; $y<15; $y++){
					for($x=0; $x<15; $x++){
						if($scope.boardinput[$y][$x].letter!="")
							$countnewfilled++;
						$scope.boardhighl[$y][$x] = false;
					}
				}

				if($countnewfilled == 0){
					for($y=0; $y<15; $y++){
						for($x=0; $x<15; $x++){
							$scope.boardhighl[$y][$x] = false;
						}
					}

					for($y=0; $y<15; $y++){
						for($x=0; $x<15; $x++){
							if($scope.boardvalue[$y][$x].letter!=''){
								console.log($scope.boardvalue[$y-1][$x]);
								if($scope.boardvalue[$y-1][$x].letter=="")
									$scope.boardhighl[$y-1][$x] = true;
								if($scope.boardvalue[$y][$x-1].letter=="")
									$scope.boardhighl[$y][$x-1] = true;
								if($scope.boardvalue[$y+1][$x].letter=="")
									$scope.boardhighl[$y+1][$x] = true;
								if($scope.boardvalue[$y][$x+1].letter=="")
									$scope.boardhighl[$y][$x+1] = true;
							}
						}
					}
				}else{
					$lined = true;
					if($countnewfilled > 1){
						for($y=0; $y<15; $y++){
							for($x=0; $x<15; $x++){
								if($scope.boardinput[$y][$x].letter!=""){
									$linex = false;
									$liney = false;
									for($i=1; $i<15; $i++){
										if($x+$i<15)
											if($scope.boardinput[$y][$x+$i].letter!="")
												$linex = true;

										if($x-$i>=0)
											if($scope.boardinput[$y][$x-$i].letter!="")
												$linex = true;

										if($y+$i<15)
											if($scope.boardinput[$y+$i][$x].letter!="")
												$liney = true;

										if($y-$i>=0)
											if($scope.boardinput[$y-$i][$x].letter!="")
												$liney = true;
									}

									// bakal bukan lined kalau dia true true (kotak)
									// bakal bukan lined kalau dia false false (diagonal)
									if($linex == $liney){
										$lined = false;
									}
								}
							}
						}
					}

					if($lined){
						for($y=0; $y<15; $y++){
							for($x=0; $x<15; $x++){
								if($scope.boardinput[$y][$x].letter!=""){
									$isANewLineX = {"length":0, "y":0, "x":0}; // jarak ke temen yg baru X
									$isANewLineY = {"length":0, "y":0, "x":0}; // jarak ke temen yg baru Y
									$isAOldLineX = {"length":0, "y":0, "x":0}; // jarak ke temen yg baru X
									$isAOldLineY = {"length":0, "y":0, "x":0}; // jarak ke temen yg baru Y
									for($i=1; $i<15; $i++){
										if($x+$i<15)
											if($scope.boardinput[$y][$x+$i].letter!="" && $isANewLineX.length==0)
												$isANewLineX = {"length":$i, "y":$y, "x":$x+$i};

										if($x-$i>=0)
											if($scope.boardinput[$y][$x-$i].letter!="" && $isANewLineX.length==0)
												$isANewLineX = {"length":-$i, "y":$y, "x":$x-$i};

										if($y+$i<15)
											if($scope.boardinput[$y+$i][$x].letter!="" && $isANewLineY.length==0)
												$isANewLineY = {"length":$i, "y":$y+$i, "x":$x};

										if($y-$i>=0)
											if($scope.boardinput[$y-$i][$x].letter!="" && $isANewLineY.length==0)
												$isANewLineY = {"length":-$i, "y":$y-$i, "x":$x};

											//==========

										if($x+$i<15)
											if($scope.boardvalue[$y][$x+$i].letter!="" && $isAOldLineX.length==0)
												$isAOldLineX = {"length":$i, "y":$y, "x":$x+$i};

										if($x-$i>=0)
											if($scope.boardvalue[$y][$x-$i].letter!="" && $isAOldLineX.length==0)
												$isAOldLineX = {"length":-$i, "y":$y, "x":$x-$i};

										if($y+$i<15)
											if($scope.boardvalue[$y+$i][$x].letter!="" && $isAOldLineY.length==0)
												$isAOldLineY = {"length":$i, "y":$y+$i, "x":$x};

										if($y-$i>=0)
											if($scope.boardvalue[$y-$i][$x].letter!="" && $isAOldLineY.length==0)
												$isAOldLineY = {"length":-$i, "y":$y-$i, "x":$x};
									}

									console.log($isANewLineX,$isANewLineY,$isAOldLineX,$isAOldLineY);

									if( $isAOldLineX.length!=0){
										for($j = 1; $j<Math.abs($x-$isAOldLineX.x); $j++){
											if($isAOldLineX.x<$x) $oldtempX = $isAOldLineX.x+$j;
											if($isAOldLineX.x>$x) $oldtempX = $isAOldLineX.x-$j;
											if(!$scope.isFilled($y, $oldtempX) && !$scope.isNewFilled($y, $oldtempX))
												$scope.boardhighl[$y][$oldtempX] = true;
										}
									}
									if($isAOldLineY.length!=0){
										for($j = 1; $j<Math.abs($y-$isAOldLineY.y); $j++){
											if($isAOldLineY.y<$y) $oldtempY = $isAOldLineY.y+$j;
											if($isAOldLineY.y>$y) $oldtempY = $isAOldLineY.y-$j;
											if(!$scope.isFilled($oldtempY, $x) && !$scope.isNewFilled($oldtempY, $x))
												$scope.boardhighl[$oldtempY][$x] = true;
										}
									}
								}
							}
						}
					}


				}
			}

			$scope.checkcombination = function(){
				$checkwords = [];
				$boardtemp = [];
				console.log("checking...");

				$scope.lastX = -1;
				$scope.lastY = -1;
				$scope.lastdir = "horizontal";
				for($y=0;$y<15;$y++){
					for($x=0;$x<15;$x++){
						if($scope.boardinput[$y][$x].letter != ""){
							$tempX = {
								"word": $scope.boardinput[$y][$x].letter+"",
								"value": $scope.boardinput[$y][$x].value * ($scope.boardimage[$y][$x]==1?2:$scope.boardimage[$y][$x]==2?3:1),
								"start": {"x": $x, "y": $y},
								"direction": "horizontal",
								"multiplier": ($scope.boardimage[$y][$x]==5?2:$scope.boardimage[$y][$x]==4?3:$scope.boardimage[$y][$x]==3?2:1)
							};
							$tempY = {
								"word": $scope.boardinput[$y][$x].letter+"",
								"value": $scope.boardinput[$y][$x].value * ($scope.boardimage[$y][$x]==1?2:$scope.boardimage[$y][$x]==2?3:1),
								"start": {"x": $x, "y": $y},
								"direction": "vertical",
								"multiplier": ($scope.boardimage[$y][$x]==5?2:$scope.boardimage[$y][$x]==4?3:$scope.boardimage[$y][$x]==3?2:1)
							};

							$scope.lastX = $x;
							$scope.lastY = $y;

							for($i=1,$end=false;$end==false;$i++){
								// check to left side
								if($x-$i<0){
									$end = true;
								}else if($scope.boardinput[$y][$x-$i].letter != ""){
									$tempX = {
										"word": $scope.boardinput[$y][$x-$i].letter + $tempX.word,
										"value": $tempX.value + ($scope.boardinput[$y][$x-$i].value * ($scope.boardimage[$y][$x-$i]==1?2:$scope.boardimage[$y][$x-$i]==2?3:1)),
										"start": {"x": $x-$i, "y": $tempX.start.y},
										"direction": "horizontal",
										"multiplier": $tempX.multiplier * ($scope.boardimage[$y][$x-$i]==5?2:$scope.boardimage[$y][$x-1]==4?3:$scope.boardimage[$y][$x-$i]==3?2:1)
									};
									$scope.lastdir = "horizontal";
								}else if($scope.boardvalue[$y][$x-$i].letter != ""){
									$tempX = {
										"word": $scope.boardvalue[$y][$x-$i].letter + $tempX.word,
										"value": $tempX.value + ($scope.boardvalue[$y][$x-$i].value),
										"start": {"x": $x-$i, "y": $tempX.start.y},
										"direction": "horizontal",
										"multiplier": $tempX.multiplier * ($scope.boardimage[$y][$x-$i]==5?2:$scope.boardimage[$y][$x-1]==4?3:$scope.boardimage[$y][$x-$i]==3?2:1)
									};
								}else{
									$end=true;
								}
							}

							for($i=1,$end=false;$end==false;$i++){
								// check to top side
								if($y-$i<0){
									$end = true;
								}else if($scope.boardinput[$y-$i][$x].letter != ""){
									$tempY = {
										"word": $scope.boardinput[$y-$i][$x].letter + $tempY.word,
										"value": $tempY.value + ($scope.boardinput[$y-$i][$x].value * ($scope.boardimage[$y-$i][$x]==1?2:$scope.boardimage[$y-$i][$x]==2?3:1)),
										"start": {"x": $tempX.start.x, "y": $y-$i},
										"direction": "vertical",
										"multiplier": $tempY.multiplier * ($scope.boardimage[$y-1][$x]==5?2:$scope.boardimage[$y-$i][$x]==4?3:$scope.boardimage[$y-$i][$x]==3?2:1)
									};
									$scope.lastdir = "vertical";
								}else if($scope.boardvalue[$y-$i][$x].letter != ""){
									$tempY = {
										"word": $scope.boardvalue[$y-$i][$x].letter + $tempY.word,
										"value": $tempY.value + ($scope.boardvalue[$y-$i][$x].value),
										"start": {"x": $tempX.start.x, "y": $y-$i},
										"direction": "vertical",
										"multiplier": $tempY.multiplier * ($scope.boardimage[$y-1][$x]==5?2:$scope.boardimage[$y-$i][$x]==4?3:$scope.boardimage[$y-$i][$x]==3?2:1)
									};
								}else{
									$end=true;
								}
							}

							for($i=1,$end=false;$end==false;$i++){
								// check to right side
								if($x+$i>14){
									$end = true;
								}else if($scope.boardinput[$y][$x+$i].letter != ""){
									$tempX = {
										"word": $tempX.word + $scope.boardinput[$y][$x+$i].letter,
										"value": $tempX.value + ($scope.boardinput[$y][$x+$i].value * ($scope.boardimage[$y][$x+$i]==1?2:$scope.boardimage[$y][$x+$i]==2?3:1)),
										"start": {"x": $tempX.start.x, "y": $tempX.start.y},
										"direction": "horizontal",
										"multiplier": $tempX.multiplier * ($scope.boardimage[$y][$x+$i]==5?2:$scope.boardimage[$y][$x+$i]==4?3:$scope.boardimage[$y][$x+$i]==3?2:1)
									};
									$scope.lastX = $x+$i;
									$scope.lastdir = "horizontal";
								}else if($scope.boardvalue[$y][$x+$i].letter != ""){
									$tempX = {
										"word": $tempX.word + $scope.boardvalue[$y][$x+$i].letter,
										"value": $tempX.value + ($scope.boardvalue[$y][$x+$i].value),
										"start": {"x": $tempX.start.x, "y": $tempX.start.y},
										"direction": "horizontal",
										"multiplier": $tempX.multiplier * ($scope.boardimage[$y][$x+$i]==5?2:$scope.boardimage[$y][$x+1]==4?3:$scope.boardimage[$y][$x+$i]==3?2:1)
									};
								}else{
									$end=true;
								}
							}

							for($i=1,$end=false;$end==false;$i++){
								// check to bottom side
								if($y+$i>14){
									$end = true;
								}else if($scope.boardinput[$y+$i][$x].letter != ""){
									$tempY = {
										"word": $tempY.word + $scope.boardinput[$y+$i][$x].letter,
										"value": $tempY.value + ($scope.boardinput[$y+$i][$x].value * ($scope.boardimage[$y+$i][$x]==1?2:$scope.boardimage[$y+$i][$x]==2?3:1)),
										"start": {"x": $tempX.start.x, "y": $tempX.start.y},
										"direction": "vertical",
										"multiplier": $tempY.multiplier * ($scope.boardimage[$y+1][$x]==5?2:$scope.boardimage[$y+1][$x]==4?3:$scope.boardimage[$y+1][$x]==3?2:1)
									};
									$scope.lastY = $y+$i;
									$scope.lastdir = "vertical";
								}else if($scope.boardvalue[$y+$i][$x].letter != ""){
									$tempY = {
										"word": $tempY.word + $scope.boardvalue[$y+$i][$x].letter,
										"value": $tempY.value + ($scope.boardvalue[$y+$i][$x].value),
										"start": {"x": $tempX.start.x, "y": $tempX.start.y},
										"direction": "vertical",
										"multiplier": $tempY.multiplier * ($scope.boardimage[$y+1][$x]==5?2:$scope.boardimage[$y+1][$x]==4?3:$scope.boardimage[$y+1][$x]==3?2:1)
									};
								}else{
									$end=true;
								}
							}

							$checkwords.push($tempX);
							$checkwords.push($tempY);

						}
					}
				}

				if($checkwords.length>0){

					if ($scope.lastdir == "horizontal") {
						$end = false;
						for ($i=1;$end==false;$i++) {
							if ($scope.lastX+1>14) {
								$end = true;
							} else if ($scope.boardvalue[$scope.lastY][$scope.lastX+1].letter!="") {
								$scope.lastX = $scope.lastX+1;
							} else {
								$end = true;
							}
						}
					} else {
						$end = false;
						for ($i=1;$end==false;$i++) {
							console.log("check untuk Y : "+($scope.lastY+$i));
							if ($scope.lastY+1>14) {
								$end = true;
							} else if ($scope.boardvalue[$scope.lastY+1][$scope.lastX].letter!="") {
								$scope.lastY = $scope.lastY+1;
							} else {
								$end = true;
							}
						}
					}

					$delindex = [];
					for($i=$checkwords.length-1; $i>=0; $i--){
						if($checkwords[$i].word.length<=1){
							$checkwords.splice($i, 1);
						}else{
							$found = false;
							for($j=0;$j<$checkwords.length-1;$j++){
								if($checkwords[$i].word == $checkwords[$j].word && $i!=$j){
									console.log($i, $j);
									$found = true; //doubled in another index
								}
							}
							if($found) {
								$checkwords.splice($i, 1);
							}
						}
					}
				}

				return $checkwords;
			}

			$scope.postcheck = function(){
				$checkwords = $scope.checkcombination();

				console.log($checkwords);

				$http({
					method: "POST",
					url: AJAX_URL+"wordcheck",
					data: {
						"words": $checkwords
					}
				}).then(function(response){
					if(response.data!=null)
					{
						if(response.data instanceof Array){
							if(response.data[0]==1){
								$result = response.data[1];
								if($result.length == 0){
									console.log("no text found");
								}else{
									$checked = true;
									$.each(response.data[1], function($i, $ii){
										if(!$ii.found)
											$checked = false;
									});

									if($checked == false){
										$scope.resultwords = response.data[1];

										$("#check-modalresult").modal('show');
									} else {
										//masukin datanya ke dalam boardvalue
										for($y=0; $y<15; $y++){
											for($x=0; $x<15; $x++){
												if($scope.boardinput[$y][$x].letter != ""){
													$trf = {
														"letter": $scope.boardinput[$y][$x].letter,
														"value": $scope.boardinput[$y][$x].value
													}
													$scope.boardvalue[$y][$x] = $trf;
													$scope.boardinput[$y][$x].letter = "";
													$scope.boardinput[$y][$x].value = 0;
												}
											}
										}

										//trus ambil new letters dari stroed
										for(;$scope.letters.length<7;){
											$rand = Math.floor(Math.random() * $scope.stored.length); //loop dari 0 hingga total-1 
											$scope.letters.push({
												"letter": $scope.stored[$rand].letter,
												"value": $scope.stored[$rand].value
											});
											$scope.stored.splice($rand, 1);
										}

										$scope.simplifyStore();
									}
								}
							}else{
								console.log(response.data[1]);
							}
						}
					}
				});
			}

			$scope.simplifyStore = function(){
				$scope.stored2 = [];
				$.each($combination, function($c, $cc){
					$total = 0;
					$.each($scope.stored, function($s, $ss){
						if($cc.letter == $ss.letter){
							$total++;
						}
					});
					$scope.stored2.push({
						"letter": $cc.letter,
						"total": $total
					});
				});
			}

			$scope.tileClick = function($y, $x){
				$result = $scope.getSelectedLetter();
				if($result == null){
					if($scope.isFilled($y, $x)){
						console.log('It\'s a filled tile, choose another green tile for removing');
					}else if($scope.isNewFilled($y, $x)){
						$temp = {
							"letter": $scope.boardinput[$y][$x].letter,
							"value" : $scope.boardinput[$y][$x].value
						}
						$scope.addASelectedLetter($temp);
						$scope.boardinput[$y][$x].letter = "";
						$scope.boardinput[$y][$x].value = 0;

						$scope.fillHighlight();
						$checkwords = $scope.checkcombination();
						console.log($checkwords);
						$scope.totalvalue = 0;
						$.each($checkwords, function($i, $ii){
							$scope.totalvalue += $ii.value * $ii.multiplier;
						});
					}else{
						//select the empty
						console.log('You were not selecting any letters on bottom');
					}
				}else{
					//validasi pertama tidak boleh ada letter sebelomnya
					if($scope.isFilled($y, $x)){
						console.log("You can move to another tile that was empty");
					}else if($scope.isNewFilled($y, $x)){
						console.log("You can move to another tile that was empty");
					}else{
						$scope.boardinput[$y][$x].letter = $result.letter;
						$scope.boardinput[$y][$x].value = $result.value;
						if($scope.boardimage[$y][$x]==2) $scope.boardinput[$y][$x].lettermultp = 3;
						else if($scope.boardimage[$y][$x]==1) $scope.boardinput[$y][$x].lettermultp = 2;

						$scope.removeASelectedLetter();
						console.log("success");
						$scope.fillHighlight();


						$checkwords = $scope.checkcombination();
						console.log($checkwords);
						$scope.totalvalue = 0;
						$.each($checkwords, function($i, $ii){
							$scope.totalvalue += $ii.value * $ii.multiplier;
						});
					}
				}
			}

			$scope.removeASelectedLetter = function(){
				$tempindex = -1;
				$.each($scope.letters, function($i, $ii){
					if($ii.selected == true){
						$tempindex = $i;
					}
				});
				if($tempindex != -1){
					//found
					$scope.letters.splice($tempindex, 1);
				}
			}

			$scope.addASelectedLetter = function($i){
				$i.selected = false;
				$scope.letters.push($i);
			}

			// return null when no selected
			// return letter when has a selected letter
			$scope.getSelectedLetter = function($l){
				//check if any letter selected before
				$temp = null;
				$.each($scope.letters, function($i, $ii){
					if($ii.selected == true){
						$temp = $ii;
						return false;
					}
				});
				return $temp;
			}

			$scope.selectALetter = function($l){
				//check if any letter selected before
				$countselected = 0;
				$.each($scope.letters, function($i, $ii){
					if($ii.selected == true){
						$countselected++;
						$ii.selected = false;
					}

					if($ii == $l){
						$ii.selected = true;
					}
				});

				if($countselected>0){
					console.log("You change the selection");
				}
			}


		}
	]);
}