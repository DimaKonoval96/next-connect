const { db } = require('../util/admin');

exports.getAllPosts = (req, res) => {
	db.collection('/posts')
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			const dataArr = [];
			data.forEach((doc) => {
				dataArr.push(doc.data());
			});
			res.json(dataArr);
		})
		.catch((err) => {
			console.error(err);
			res.status(400).json(err);
		});
};

exports.createNewPost = (req, res) => {
	const post = {
		userName: req.user.userName,
		text: req.body.text,
		hearts: 0,
		createdAt: new Date(),
		commentsCount: 0,
	};

	db.collection('posts')
		.add(post)
		.then((data) => {
			res.json(`Post ${data.id} successfully created`);
		})
		.catch((err) => {
			console.error(err);
			res.status(400).json(err);
		});
};

exports.getOnePost = (req, res) => {
	const postData = {};
	db.doc(`posts/${req.params.postId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				res.status(404).json({ error: "Post doesn't exist" });
			}
			postData.postInfo = doc.data();
			postData.postId = doc.id;
			return db.collection('comments').where('postId', '==', doc.id).get();
		})
		.then((snapshot) => {
			postData.comments = [];
			snapshot.forEach((doc) => {
				postData.comments.push(doc.data());
			});
			res.json(postData);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: err.code });
		});
};
