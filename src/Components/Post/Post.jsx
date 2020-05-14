import React from 'react';
import './PostStyles.scss';
import { firestore } from '../../firebase';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
	const handleHearts = () => {
		firestore
			.collection('posts')
			.doc(`${post.id}`)
			.update({ hearts: post.hearts + 1 });
	};

	const handleDelete = () => {
		firestore.collection('posts').doc(`${post.id}`).delete();
	};

	return (
		<article className='Post'>
			<div className='Post--content'>
				<Link to={`posts/${post.id}`}>
					<p>{post.text}</p>
				</Link>
			</div>
			<div className='Post--meta'>
				<span
					role='img'
					aria-label='heart'
					className='heart'
					onClick={handleHearts}
				>
					❤️ <span className='heart-counter'>{post.hearts}</span>
				</span>

				<span role='img' aria-label='comments' className='comments'>
					💬 <span className='comments-counter'>0</span>
				</span>
				{/* <p>{post.createdAt}</p> */}
				<input
					type='button'
					className='post-delete btn btn-dark'
					value='Delete'
					onClick={handleDelete}
				/>
			</div>
		</article>
	);
};

export default Post;
