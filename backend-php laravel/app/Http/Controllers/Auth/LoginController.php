<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

   use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/admin/dashboard';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    // public function login(Request $request)
    // {
    //     $infoRequest = $request->only('email', 'password', 'level');

    //     if (Auth::attempt(['email' => $infoRequest['email'], 'password' => $infoRequest['password'], 'level' => 1])) {
    //         return redirect()->intended('/admin/dashboard');
    //     } else {

    //         return back()
    //             ->with('error','User or password not correct or You do not have permission to view this page.');
    //     }
    // }

    /**
     * logout.
     *
     * @return void
     */
    public function logout(Request $request) {
      Auth::logout();
      return redirect('/admin/login');
    }
}
