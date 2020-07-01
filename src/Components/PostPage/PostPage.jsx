import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { firestore } from '../../firebase';
import Post from '../Post/Post';
import './PostPageStyles.scss';
import Comments from '../Comments/Comments';

const PostPage = (props) => {
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);

	const match = useRouteMatch();
	const { id } = match.params;
	const postRef = firestore.doc(`posts/${id}`);
	const commentsRef = postRef.collection('comments');

	useEffect(() => {
		let unSubscribeOnCommentsSnapshot = null;
		let unSubscribeOnPostSnapshot = null;

		const getPost = async () => {
			unSubscribeOnPostSnapshot = await postRef.onSnapshot((doc) => {
				setPost({ id: doc.id, ...doc.data() });
			});
		};

		const getComments = async () => {
			unSubscribeOnCommentsSnapshot = await commentsRef.onSnapshot((snap) => {
				let comments = snap.docs.map((doc) => {
					return { id: doc.id, ...doc.data() };
				});
				setComments(comments);
			});
		};

		getPost();
		getComments();
		return () => {
			unSubscribeOnCommentsSnapshot();
			unSubscribeOnPostSnapshot();
		};
	}, []);

	const saveComment = (text) => {
		postRef.update({
			commentsCount: comments.length + 1,
		});

		commentsRef.add({
			text,
			createdAt: new Date(),
		});
	};

	return (
		<div>
			<h1>Post Page</h1>
			{post && <Post post={post} />}
			<Comments saveComment={saveComment} comments={comments} />
		</div>
	);
};

export default PostPage;
