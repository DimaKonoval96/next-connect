import React from 'react';
import { PostsContext } from '../../Providers/PostsProvider';
import Post from '../Post/Post';
import './PostsStyles.scss';
const Posts = (props) => {
	console.log(props);
	return (
		<section className='Posts'>
			<PostsContext.Consumer>
				{(posts) => posts.map((post) => <Post key={post.id} post={post} />)}
			</PostsContext.Consumer>
		</section>
	);
};

export default Posts;
