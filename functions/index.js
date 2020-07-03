/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */

const functions = require('firebase-functions');
const app = require('express')();

const { getAllPosts, createNewPost, getOnePost } = require('./handlers/posts');
const {
	login,
	signup,
	uploadImage,
	addUserDetails,
	getUserDetails,
} = require('./handlers/users');
const fbAuth = require('./util/fbAuth');

// Post Routes
app.get('/posts', getAllPosts);
app.post('/post', fbAuth, createNewPost);
app.get('/post/:postId', fbAuth, getOnePost);

// User Routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', fbAuth, uploadImage);
app.post('/user', fbAuth, addUserDetails);
app.get('/user', fbAuth, getUserDetails);

exports.api = functions.https.onRequest(app);
