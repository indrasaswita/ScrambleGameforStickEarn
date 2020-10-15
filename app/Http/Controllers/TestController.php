<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

define('prefix', "https://api-hangman.jpcc.my.id/image/");

class TestController extends Controller
{
	public $names = [
		[
			"name" => "Sponge",
			"fullname" => "Spongebob Squarepant",
			"document" => [
				"url" => prefix."sponge.png"
			],
			"age" => "22",
			"vip" => true,
		],
		[
			"name" => "Squid",
			"fullname" => "Squidward Tentacles",
			"document" => [
				"url" => prefix."squidward.png"
			],
			"age" => "27",
			"vip" => true,
		],
		[
			"name" => "Patrick",
			"fullname" => "Patrick Star",
			"document" => [
				"url" => prefix."patrick.png"
			],
			"age" => "26",
			"vip" => true,
		],
		[
			"name" => "MM",
			"fullname" => "Mermaid Man",
			"document" => [
				"url" => prefix."mm.png"
			],
			"age" => "58",
			"vip" => false,
		],
		[
			"name" => "BB",
			"fullname" => "Barnacle Boy",
			"document" => [
				"url" => prefix."bb.png"
			],
			"age" => "56",
			"vip" => false,
		],
		[
			"name" => "Sandy",
			"fullname" => "Sandy Cheeks",
			"document" => [
				"url" => prefix."sandy.png"
			],
			"age" => "29",
			"vip" => false,
		],
		[
			"name" => "Mr. Krabs",
			"fullname" => "Eugene Harold Krabs",
			"document" => [
				"url" => prefix."krabs.png"
			],
			"age" => "48",
			"vip" => false,
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
			array_push($friends, $this->names[$ii]);
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

	public function getUsers(Request $request){
		$paginate = isset($request->paginate)?$request->paginate:null;
		$page = isset($request->page)?$request->page:null;
		$search = isset($request->search)?($request->search==""?null:$request->search):null;

		if($paginate == null)
			$paginate = 10;

		if($page == null)
			$page = 1;

		if($search == null)
			$users = User::paginate($paginate, ['*'], 'page', $page);
		else{
			$users = User::where('fullname', 'LIKE', "%".$search."%")
				->paginate($paginate, ['*'], 'page', $page);
		}

		return $users;
	}
}
