import React from 'react';
import './App.css';
//import Contact from './common/Contact/Contact';
//import ContactType from './common/Contact/ContactType';
// import Profile from './common/Contact/Profile';
class App extends React.Component {
	componentDidMount() {
		fetch('/user/test')
			.then(data => {
				console.log(data);
				return data.json();
			})
			.then(data => console.log(data))
	}


	render() {
		return (
			<div>
				hello
			</div>
		);
	}
}

export default App;
