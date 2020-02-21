<?php

namespace App\Logic;


use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;


class WordProcessor{

	public function generateWord(){
		$combination = [
			["A",7,9,1],
			["B",1,2,3],
			["C",1,2,3],
			["D",3,4,2],
			["E",11,12,1],
			["F",1,2,4],
			["G",3,3,2],
			["H",1,2,4],
			["I",6,9,1],
			["J",0,1,8],
			["K",1,1,5],
			["L",3,4,1],
			["M",1,2,3],
			["N",4,6,1],
			["O",6,8,1],
			["P",1,2,3],
			["Q",1,1,10],
			["R",5,6,1],
			["S",4,4,1],
			["T",5,6,1],
			["U",4,5,1],
			["V",1,2,4],
			["W",2,2,4],
			["X",1,1,8],
			["Y",2,2,4],
			["Z",1,1,10],
			[" ",2,2,0],
		];
		$result = [];
		for($i = 0, $k = 0; $i < count($combination); $i++){
			// Z dan spasi tidak di inc
			$count = rand($combination[$i][1], $combination[$i][2]);
			for($j = 0; $j < $count; $j++, $k++){
				//$result[$k] = array($combination[$i][0], $combination[$i][3]);

				$temp = [
					"letter"=> $combination[$i][0], 
					"value"=> $combination[$i][3]
				];

				$result[$k] = $temp;
			}
		}

		$length = count($result);
		$choosen = [];
		for($i = 0; $i < 7; $i++){
			$choosen[$i] = $result[rand(0,count($result)-1)];
		}

		return array($choosen, $result);
	}

	public function checkByArray($arr){
		if($arr == null)
			return null;
		if(count($arr)==0)
			return null;

		$checkstr = "";
		for($i=0,$j=0;$i<count($arr);$i++){
			if(strlen($arr[$i])>1){
				$checkstr .= ($j!=0?",":"").strtolower($arr[$i]);
				$j++;
			}
		}

		$process = new Process(['python', app_path().'\\Http\\Controllers\\twl.py', $checkstr]);
		$process->run();

		// executes after the command finishes
		if (!$process->isSuccessful()) {
		 throw new ProcessFailedException($process);
		}

		$result = $process->getOutput();
		$checked = explode("#", $result);

		$checked = str_replace("\\r\\n", "", json_encode($checked));
		return $checked;

	}

	public function checkCombination($text){
		$checker = [];
		$checkstr = "";
		$text = strtolower($text);

		for($i=0; $i<strlen($text); $i++){
			for($j=0; $j<strlen($text)-1; $j++){
				$temp = $text{$j};
				$text{$j} = $text{$j+1};
				$text{$j+1} = $temp;

				for($k=1;$k<strlen($text);$k++){

					$check = false;
					if(array_key_exists(substr($text, 0, $k+1), $checker)){
						if($checker[substr($text, 0, $k+1)]==false){
							$check = true;
						}
					}else{
						$check = true;
					}
					if($check){
						$checkstr .= (strlen($checkstr)>0?",":"").substr($text, 0, $k+1);
						$checker[substr($text, 0, $k+1)] = true;
					}
				}
			}
		}

		$process = new Process(['python', app_path().'\\Http\\Controllers\\twl.py', $checkstr]);
		$process->run();

		// executes after the command finishes
		if (!$process->isSuccessful()) {
		 throw new ProcessFailedException($process);
		}

		$result = $process->getOutput();
		$checked = explode("#", $result);

		for($i=0;$i<count($checked);$i++){
			for($j=0;$j<count($checked)-1;$j++){
				if(strlen($checked[$j]) > strlen($checked[$j+1])){
					$temp = $checked[$j];
					$checked[$j] = $checked[$j+1];
					$checked[$j+1] = $temp;
				}
			}
		}

		$checked = str_replace("\\r\\n", "", json_encode($checked));
		return $checked;
	}
}