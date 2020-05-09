import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
	apiKey: 'AIzaSyBkBumfWz7WXq0IWqg3YJn8LkehlkCBwck',
	authDomain: 'next-connect-b4509.firebaseapp.com',
	databaseURL: 'https://next-connect-b4509.firebaseio.com',
	projectId: 'next-connect-b4509',
	storageBucket: 'next-connect-b4509.appspot.com',
	messagingSenderId: '95924210882',
	appId: '1:95924210882:web:4e4cfa7b9b00636732ff5b',
	measurementId: 'G-XS2KKEE2Y9',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const firestore = firebase.firestore();
export default firebase;
