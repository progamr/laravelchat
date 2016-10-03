<?php 

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Request;
use Redis;
class chatController extends Controller {

	public function __construct()
	{
		$this->middleware('guest');
	}

	public function sendMessage(){
		$redis = Redis::connection();
		$data = ['message' => Request::input('message'), 'user' => Request::input('user')];
		$redis->publish('message', json_encode($data));
		return response()->json([]);
	}
}