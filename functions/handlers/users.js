const { db, admin } = require('../util/admin');
const firebase = require('firebase');
const firebaseConfig = require('../config');
firebase.initializeApp(firebaseConfig);

const {
	validateLoginData,
	validateSignupData,
} = require('../util/validators.jsx');
// Login already an existing user
exports.login = (req, res) => {
	const currUser = {
		email: req.body.email,
		password: req.body.password,
	};

	const { errors, isValid } = validateLoginData(currUser);
	if (!isValid) res.status(400).json(errors);

	console.log(currUser);

	return firebase
		.auth()
		.signInWithEmailAndPassword(currUser.email, currUser.password)
		.then((data) => {
			return data.user.getIdToken();
		})
		.then((token) => {
			res.json({ token });
		})
		.catch((err) => {
			if (
				err.code === 'auth/user-not-found' ||
				err.code === 'auth/wrong-password'
			) {
				res
					.status(403)
					.json({ general: 'Wrong credentials, please try again' });
			} else {
				res.status(500).json({ error: err.code });
			}
		});
};

// Create a new user
exports.signup = (req, res) => {
	const newUser = {
		userName: req.body.userName,
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
	};

	const { errors, isValid } = validateSignupData(newUser);

	if (!isValid) res.status(400).json(errors);

	let token, userId;

	db.doc(`users/${newUser.userName}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				return res.status(400).json('User with this name is already exists');
			}
			return firebase
				.auth()
				.createUserWithEmailAndPassword(newUser.email, newUser.password);
		})
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((tok) => {
			token = tok;
			const userCredentials = {
				userName: newUser.userName,
				email: newUser.email,
				createdAt: new Date(),
				userId,
			};

			return db.doc(`users/${newUser.userName}`).set(userCredentials);
		})
		.then(() => {
			res.status(200).json({ token });
		})
		.catch((err) => {
			console.log(err);
			if (err.code === 'auth/email-already-in-use') {
				res.status(400).json({ email: 'This email is already in use' });
			} else {
				res.status(500).json({ error: err.code });
			}
		});
};

exports.uploadImage = (req, res) => {
	const BusBoy = require('busboy');
	const path = require('path');
	const os = require('os');
	const fs = require('fs');

	const busboy = new BusBoy({ headers: req.headers });

	let imgFilename;
	let imageToBeUploaded = {};
	let imgPath;

	busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		if (mimetype.split('/')[0] !== 'image') {
			res.status(400).json({ error: 'Wrong file type is submitted' });
		}

		const imgExtension = filename.split('.')[filename.split('.').length - 1];
		imgFilename = `${Math.round(
			Math.random() * 1000000000000
		)}.${imgExtension}`;
		imgPath = path.join(os.tmpdir(), imgFilename);
		imageToBeUploaded = { imgPath, mimetype };
		file.pipe(fs.createWriteStream(imgPath));
	});

	busboy.on('finish', () => {
		admin
			.storage()
			.bucket()
			.upload(imageToBeUploaded.imgPath, {
				resumable: false,
				destination: `user-profiles/${req.user.uid}/${imgFilename}`,
				metadata: {
					metadata: { contentType: imageToBeUploaded.mimetype },
				},
			})
			.then((data) => {
				const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imgFilename}?alt=media`;
				return db.doc(`users/${req.user.userName}`).update({ imageUrl });
			})
			.then(() => {
				res.json({ message: 'Image is uploaded successfully' });
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json({ error: err.code });
			});
	});
	busboy.end(req.rawBody);
};
