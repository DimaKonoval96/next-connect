import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase';
import './AddPostStyles.scss';
const AddPost = () => {
	const [post, postInput] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		firestore.collection('posts').add(post);
		postInput({ text: '' });
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		postInput({ [name]: value });
	};

	return (
		<div className='add-post'>
			<form onSubmit={handleSubmit} className='post-form'>
				<textarea
					placeholder="What's happening?"
					cols='40'
					rows='6'
					name='text'
					onChange={handleChange}
					value={post.text}
				></textarea>
				<input
					type='submit'
					name='send'
					value='Send'
					className='btn btn-dark'
				/>
			</form>
		</div>
	);
};

export default AddPost;
