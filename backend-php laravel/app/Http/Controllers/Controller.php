<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use View;
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	

    public function __construct()
	  {
	  	//view share product highlight to all view
	    $getHighlightProduct = Product::where('highlight', 1)->with('Brand')->with('Category')->get()->toArray();

	    $getCategory = Category::all()->toArray();
        $getBrand = Brand::all()->toArray();

	    //xac dinh quan he
	    View::share('getHighlightProduct', $getHighlightProduct);
	    View::share('getCategory', $getCategory);
	    View::share('getBrand', $getBrand);
	  }

}
