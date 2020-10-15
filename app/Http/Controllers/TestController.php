<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
	public $names = [
		[
			"name" => "Sponge",
			"fullname" => "Spongebob Squarepant",
			"document" => [
				"url" => ""
			],
			"age" => "22",
			"vip" => true,
		],
		[
			"name" => "Squid",
			"fullname" => "Squidward Tentacles",
			"document" => [
				"url" => ""
			],
			"age" => "27",
			"vip" => true,
		],
		[
			"name" => "Patrick",
			"fullname" => "Patrick Star",
			"document" => [
				"url" => ""
			],
			"age" => "26",
			"vip" => true,
		],
		[
			"name" => "MM",
			"fullname" => "Mermaid Man",
			"document" => [
				"url" => ""
			],
			"age" => "58",
			"vip" => true,
		],
		[
			"name" => "BB",
			"fullname" => "Barnacle Boy",
			"document" => [
				"url" => ""
			],
			"age" => "56",
			"vip" => true,
		],
		[
			"name" => "Sandy",
			"fullname" => "Sandy Cheeks",
			"document" => [
				"url" => ""
			],
			"age" => "29",
			"vip" => true,
		],
		[
			"name" => "Mr. Krabs",
			"fullname" => "Eugene Harold Krabs",
			"document" => [
				"url" => ""
			],
			"age" => "48",
			"vip" => true,
		],
	];

	public function getfriends(Request $request){
		$name = isset($request->name)?$request->name:null;
		if($name == null)
			return response()->json([
				"api_status"=>false,
				"data"=>null,
				"message"=>"Name is not supplied."
			], 400);

		$arr = $this->randomindex(3, $this->names);

		$friends = [];
		foreach ($arr as $i => $ii) {
			array_push($friends, $this->names[$i]);
		}

		return $friends;
	}

	public function randomindex($totalindex, $arraydata){
		$indexes = [];

		for(; count($indexes) < $totalindex; ){
			$found = false;

			$aa = 0;
			for($status = true; $status == true;){
				// cobain ambil hasil random
				$aa = rand(0, count($arraydata)-1);
				$status = false;
				foreach ($indexes as $i => $ii) {
					if($aa == $ii){
						// looping lagi
						$status = true;
					}
				}
			}

			array_push($indexes, $aa);
		}

		return $indexes;
	}
}
