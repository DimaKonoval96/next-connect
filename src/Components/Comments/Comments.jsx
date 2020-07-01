import React, { useEffect, useState } from 'react';
import './CommentsStyles.scss';
import AddComment from '../AddComment/AddComment';
import Comment from '../Comment/Comment';
const Comments = ({ saveComment, comments }) => {
	return (
		<div>
			<AddComment saveComment={saveComment} />
			{comments.map((comment) => (
				<Comment comment={comment} key={comment.id} />
			))}
		</div>
	);
};

export default Comments;
