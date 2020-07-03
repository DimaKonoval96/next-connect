const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://next-connect-b4509.firebaseio.com',
	storageBucket: 'next-connect-b4509.appspot.com',
});

const db = admin.firestore();
const storage = admin.storage();
module.exports = { db, admin };
