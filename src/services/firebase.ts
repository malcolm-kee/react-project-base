import * as firebaseApp from 'firebase/app';

const config = {
  apiKey: 'AIzaSyAJXAgqJFE7ojoNBz6MrBvRidG-yyP39_g',
  authDomain: 'smart-loan-9ec69.firebaseapp.com',
  databaseURL: 'https://smart-loan-9ec69.firebaseio.com',
  projectId: 'smart-loan-9ec69',
  storageBucket: 'smart-loan-9ec69.appspot.com',
  messagingSenderId: '347900906254'
};

firebaseApp.initializeApp(config);

export const firebase = firebaseApp;
