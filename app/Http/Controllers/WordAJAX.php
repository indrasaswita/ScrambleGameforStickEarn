<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use App\Logic\WordProcessor;
use Symfony\Component\Process\Exception\ProcessFailedException;

class WordAJAX extends Controller
{

	public function checksingle($word){
		header('Access-Control-Allow-Origin: *');
		$process = new Process(['python', app_path().'\\Http\\Controllers\\twl.py', $word]);
		$process->run();

		// executes after the command finishes
		if (!$process->isSuccessful()) {
			// return [0, "false"];
			throw new ProcessFailedException($process);
		}

		$result = $process->getOutput();

		if($result!=null){
			return [
				"api_status" => 1, 
				"message" => "true",
				"data" => [
					"input" => $word
				]
			];
		}else{
			return [
				"api_status" => 0, 
				"message" => "false",
				"data" => null
			];
		}
	}

	public function checkmany(Request $request){
		header('Access-Control-Allow-Origin: *');
		$datas = $request->all();
		if($datas != null){
			if(array_key_exists('words', $datas)){
				
				$temp = [];
				//dd($datas['words']);
				for($i=0; $i<count($datas['words']); $i++){
					$temp[$datas['words'][$i]['word']] = $datas['words'][$i]['value'];
				}
				$temp2 = [];
				$temp3 = [];
				foreach($temp as $i => $ii){
					array_push($temp2, [
						"word"=> $i,
						"value"=> $ii
					]);
					array_push($temp3, $i);
				}

				$processor = new WordProcessor();
				$result = $processor->checkByArray($temp3); //input array of object (word, value)

				$result = json_decode($result);

				//$result adalah hasil yang ada di dictionary
				if($result != null){

					$result2 = [];
					foreach($temp2 as $i => $ii) {
						if(strlen($ii['word'])>1){
							$found = false;
							foreach($result as $j => $jj){
								if(strtolower($ii['word']) == $jj){
									$found = true;
								}
							}

							$temp3 = [
								"word" => $ii['word'],
								"found" => $found,
								"value" => $ii['value']
							];

							array_push($result2, $temp3);
						}
					}

					return [1, $result2];
				}else{
					return [0, "No Words matches."];
				}
			}

			return [0, 'no array key (words) found'];
		}

		return [0, 'input failed'];
	}

	public function shuffle($word){
		return str_shuffle($word);
	}
}
