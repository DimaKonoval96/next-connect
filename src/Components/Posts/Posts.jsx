import React from 'react';
import { PostsContext } from '../../Providers/PostsProvider';
import Post from '../Post/Post';
import './PostsStyles.scss';

const Posts = () => {
	return (
		<div className='posts'>
			<PostsContext.Consumer>
				{(posts) => posts.map((post) => <Post key={post.id} post={post} />)}
			</PostsContext.Consumer>
		</div>
	);
};

export default Posts;
