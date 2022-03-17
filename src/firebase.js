import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyDGPk2GMp1mEOxQew-hPl_K8oZlx-M007g',
  authDomain: 'authenication-f0500.firebaseapp.com',
  projectId: 'authenication-f0500',
  storageBucket: 'authenication-f0500.appspot.com',
  messagingSenderId: '1055828958861',
  appId: '1:1055828958861:web:622a9f5b6370dd9f5c4cc4',
});

export const auth = app.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
const githubProvider = new firebase.auth.GithubAuthProvider();
export { app, googleProvider, githubProvider };
