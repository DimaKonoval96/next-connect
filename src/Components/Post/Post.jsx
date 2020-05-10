import React from 'react';
import './PostStyles.scss';

const Post = ({ post }) => {
	console.log(post);
	return (
		<div>
			<div className='post'>
				<p>{post.text}</p>
			</div>
		</div>
	);
};

export default Post;
