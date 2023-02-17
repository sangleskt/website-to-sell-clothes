import React from 'react';

import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// import CreateUser from './components/CreateUser';
// import EditUser from './components/EditUser';
// import UserList from './components/UserList';


import Blog from './components/Blog/Blog';
import Detail from './components/Blog/Detail';
import Home from './components/home/Home';
import Login from './components/Login/Login';
import Account from './components/Login/Account';
import MyProduct from './components/Login/MyProduct';
import AddProduct from './components/Login/AddProduct';
import ProductDetail from './components/product/Detail';

import history from "./history";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);



render (
	<Provider store={store}>
		<Router history={history}>
			<Switch>
				
				<Route path='/blog/list' component={Blog} />
				<Route path='/blog/detail/:id' component={Detail} />
				<Route path='/login' component={Login} />
				<Route path='/user/account' component={Account} />
				<Route path='/user/my-product' component={MyProduct} />
				<Route path='/user/product/:id' component={AddProduct} />
				<Route path='/product/detail/:id' component={ProductDetail} />
				{/* <Route path='/testapi/create' component={CreateUser} />
				<Route path='/testapi/edit/:id' component={EditUser} /> */}
				<Route path='/' component={Home} />
			
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('app'))
