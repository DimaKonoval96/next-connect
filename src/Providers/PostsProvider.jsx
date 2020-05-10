import React, { createContext, useEffect, useState } from 'react';
import { firestore } from '../firebase';

const PostsProvider = (props) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		let unsubscribeFromFirestore = null;
		async function getPosts() {
			unsubscribeFromFirestore = await firestore
				.collection('posts')
				.onSnapshot((snap) => {
					const posts = snap.docs.map((doc) => {
						return { id: doc.id, ...doc.data() };
					});
					setPosts(posts);
				});
		}
		getPosts();
		return () => {
			unsubscribeFromFirestore();
		};
	}, []);

	return (
		<PostsContext.Provider value={posts}>
			{props.children}
		</PostsContext.Provider>
	);
};

export const PostsContext = createContext(PostsProvider);
export default PostsProvider;
