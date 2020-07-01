/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */

const functions = require('firebase-functions');
const app = require('express')();

const { getAllPosts, createNewPost } = require('./handlers/posts');
const { login, signup, uploadImage } = require('./handlers/users');
const fbAuth = require('./util/fbAuth');

// Post Routes
app.get('/posts', getAllPosts);
app.post('/post', fbAuth, createNewPost);

// User Routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', fbAuth, uploadImage);

exports.api = functions.https.onRequest(app);
