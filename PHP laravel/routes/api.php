<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/**
**Basic Routes for a RESTful service:
**Route::get($uri, $callback);
**Route::post($uri, $callback);
**Route::put($uri, $callback);
**Route::delete($uri, $callback);
**
*/
Route::group([
    'namespace' => 'Api'
], function () {

    // member
	Route::post('/login', 'MemberController@login');
    Route::post('/register', 'MemberController@register');
   

    // product
    Route::get('/product', 'ProductController@productHome');
    Route::get('/product/list', 'ProductController@productList'); //get product list for product
    Route::get('/product/wishlist', 'ProductController@productWishlist');
    Route::get('/product/detail/{id}', 'ProductController@detail');
    Route::post('/product/cart', 'ProductController@productCart'); //get list cart


    // middleware
    Route::group(['middleware' => 'auth:api'], function(){
        Route::post('/user/update/{id}', 'MemberController@update');
        Route::get('/user/my-product', 'ProductController@myProduct');
        Route::post('/user/add-product', 'ProductController@store');
        Route::get('/user/product/{id}', 'ProductController@show');
        Route::post('/user/edit-product/{id}', 'ProductController@update');
        Route::get('/user/delete-product/{id}', 'ProductController@deleteProduct');
        Route::post('/blog/comment/{id}','BlogController@comment');
        Route::post('/blog/rate/{id}','BlogController@rate');

        Route::get('/details', 'MemberController@details');
       
    });
    // 
    Route::get('/blog/rate/{id}','BlogController@rateBlog');
    Route::get('/category-brand', 'ProductController@listCategoryBrand');

	//Blog Api
    Route::get('/blog','BlogController@list');
    Route::get('/blog/detail/{id}','BlogController@show');
    Route::get('/blog/detail-pagination/{id}','BlogController@pagingBlogDetail');


    // Route::post('/blog/add','BlogController@store');
    // Route::get('/blog/{id}','BlogController@show');
    // Route::put('/blog/{id}','BlogController@update');
    // Route::delete('/blog/{id}','BlogController@delete');

	// Route::get('testapi', 'TestApiController@index');
	// Route::post('testapi','TestApiController@store');
	// Route::get('testapi/{id}', 'TestApiController@show');
	// Route::put('testapi/{id}','TestApiController@update');
	// Route::delete('testapi/{id}', 'TestApiController@destroy');

});

