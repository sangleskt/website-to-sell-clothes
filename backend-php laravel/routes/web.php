<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// https://viblo.asia/p/laravel-55-va-react-js-phan-2-them-sua-xoa-su-dung-laravel-lam-restful-api-va-reactjs-lam-frontend-07LKXOrr5V4

// Route::get( '/{path?}', function(){
//     return view( 'reactjs/welcome' );
// })->where('path', '.*');
// frontend
Route::group([
    'namespace' => 'Frontend'
], function () {

    // Route::get('/test', 'TestController@index')->name('test');
    // Route::post('/test', 'TestController@post')->name('post');

    

    Route::get('/', 'HomeController@index')->name('home');
    Route::get('/page/{slug}','OnePageController@show')->name('frontend.onepage.show');
    Route::get('/detail-product/{id}','HomeController@detailProduct')->name('detail product');
    Route::post('/detail-product/{id}','HomeController@addReview');
    Route::post('ajaxRating', 'ProductController@ajaxRating');
    Route::get('/search', 'HomeController@SearchProduct');
    Route::get('/ajaxPriceRange', 'HomeController@SearchProductByPrice');
    Route::get('/ajaxAddToCart', 'CartController@addToCart');
    Route::get('/yourCart', 'CartController@showCart');
    Route::get('/cart-qty-delete/{id}', 'CartController@cartDelete');
    Route::post('/yourCart', 'MailController@sendMail');
    
     //blog
    Route::get('/blog/list','BlogController@list');
    Route::get('/blog/single/{id}','BlogController@single');
    Route::get('/product/brand/{id}','ProductController@productBrand');
    Route::get('/product/category/{id}','ProductController@productCategory');

    // check not login for form login
   Route::group(['middleware' => 'memberNotLogin'], function () {
        Route::get('/member-login', 'MemberController@showLogin')->name('memberLogin');
        Route::post('/member-login', 'MemberController@login');

        Route::get('/member-register', 'MemberController@showRegister');
        Route::post('/member-register', 'MemberController@register');
   });

    // check login 
    Route::group(['middleware' => 'member'], function () {

        //product
        Route::get('/product/add','ProductController@product');
        Route::post('/product/add','ProductController@addProduct');
        Route::get('/product/{id}/list','ProductController@listProduct');
        Route::get('/product/view/{id}','ProductController@viewProduct');
        Route::post('/product/view/{id}','ProductController@updateProduct');
        Route::get('/product/delete/{id}','ProductController@deleteProduct');
        //member
        Route::get('/member-profile', 'MemberController@show');
        Route::post('/member-profile', 'MemberController@update');
        Route::get('/member-logout','MemberController@logout');

        Route::post('/blog/single/{id}','BlogController@comment');
        Route::post('/blog/ajaxRequest','BlogController@ajaxRequest');

    });
});


// admin (backend)
Auth::routes();  

//Login manager Route
Route::group([
    'prefix' => 'admin',
    'namespace' => 'Auth'
], function () {
    Route::get('/', 'LoginController@showLoginForm');
    Route::get('/login', 'LoginController@showLoginForm');
    Route::post('/login', 'LoginController@login');
    Route::get('/logout', 'LoginController@logout');
});

Route::group([
    'prefix' => 'admin', //tien to vao sau link
    'namespace' => 'Admin',
    'middleware' => ['admin']
], function () {
	Route::get('/dashboard','DashboardController@index')->name('admin.dashboard');

    Route::get('/user/profile/{id}','UserController@edit')->name('admin.user.edit');
    Route::post('/user/profile/{id}','UserController@update')->name('admin.user.update');
    Route::get('/user/list','UserController@index')->name('admin.user.index');

    Route::get('/page','OnePageController@list')->name('admin.onepage.list');
    Route::get('/page/add','OnePageController@create')->name('admin.onepage.create');
    Route::post('/page/add','OnePageController@store')->name('admin.onepage.store');
    Route::get('/page/edit/{id}','OnePageController@edit')->name('admin.onepage.edit');
    Route::post('/page/edit/{id}','OnePageController@update')->name('admin.onepage.update');

//category
    Route::get('/category/add','CategoryController@Category')->name('category');
    Route::post('/category/add','CategoryController@addCategory')->name('addcategory');
    Route::get('/delete-category/{id}','CategoryController@deleteCategory')->name('deleteCategory');

//brand
    Route::get('/brand/add','BrandController@listBrand')->name('brand');
    Route::post('/brand/add','BrandController@addBrand')->name('addbrand');
    Route::get('/delete-brand/{id}','BrandController@deleteBrand')->name('deletebrand');
//list product
    Route::get('/product/list','ProductController@listProduct')->name('listProduct');
    Route::get('/product/view/{id}','ProductController@viewProduct')->name('viewProduct');
    Route::post('/product/view/{id}','ProductController@activeProduct')->name('activeProduct');
    Route::get('/product/delete/{id}','ProductController@deleteProduct')->name('deleteProduct');
//Blog
    Route::get('/blog','BlogController@list');
    Route::get('/blog/add','BlogController@create');
    Route::post('/blog/add','BlogController@create_success');
    Route::get('/blog/edit/{id}','BlogController@edit');
    Route::post('/blog/edit/{id}','BlogController@update');
    Route::get('/blog/delete/{id}','BlogController@delete');
//Country
    Route::get('/country','CountryController@country');
    Route::post('/country','CountryController@addCountry');
    Route::get('/country/delete/{id}','CountryController@deleteCountry');

});

