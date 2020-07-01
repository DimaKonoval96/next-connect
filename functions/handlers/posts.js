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
