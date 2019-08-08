import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Register from "./screens/Register";
import Login from "./screens/Login";
import Chat from "./screens/Chat";

class App extends React.Component {
	render() {
		return (
			<Router>
				<Route path={'/'} exact render={() => (<Redirect to={'/register'}/>)}/>
				<Route path={'/register'} component={Register}/>
				<Route path={'/login'} component={Login}/>
				<Route path={'/home'} component={Chat}/>
			</Router>
		);
	}
}

export default App;
