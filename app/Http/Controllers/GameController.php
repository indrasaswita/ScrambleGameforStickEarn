<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Logic\WordProcessor;

class GameController extends Controller
{
	public function gameshow(){
		$processor = new WordProcessor();

		//$words = $processor->checkCombination($text);
		$result = $processor->generateWord();
		$stored = json_encode($result[1]);
		$letters = json_encode($result[0]);

		return view("pages.game.show.index", compact('letters', 'stored'));
	}
}
