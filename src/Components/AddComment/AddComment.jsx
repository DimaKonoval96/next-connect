import React, { useState } from 'react';
import './AddCommentStyles.scss';

const AddComment = ({ saveComment }) => {
	const [input, setInput] = useState('');

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!input) return;
		saveComment(input);
		setInput('');
	};

	return (
		<div className='AddComment'>
			<form onSubmit={handleSubmit}>
				<input type='text' onChange={handleChange} value={input} />
				<input type='submit' className='btn' value='Send' />
			</form>
		</div>
	);
};

export default AddComment;
