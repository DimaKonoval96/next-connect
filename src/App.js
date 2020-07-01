import React from 'react';
import './App.css';
import AddPost from './Components/AddPost/AddPost';
import Posts from './Components/Posts/Posts';
import PostPage from './Components/PostPage/PostPage';
import { Switch, Route, Link } from 'react-router-dom';

function App() {
	return (
		<div>
			<Link to='/'>Home</Link>
			<Switch>
				<Route exact path='/'>
					<AddPost />
					<Posts />
				</Route>
				<Route exact path='/posts/:id'>
					<PostPage />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
