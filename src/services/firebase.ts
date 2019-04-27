import * as firebaseApp from 'firebase/app';

const config = {
  apiKey: 'AIzaSyBbR6Ff0D0MzQcDvSfiPp4zuAIWgqKzTqc',
  authDomain: 'smarty-loan.firebaseapp.com',
  databaseURL: 'https://smarty-loan.firebaseio.com',
  projectId: 'smarty-loan',
  storageBucket: 'smarty-loan.appspot.com',
  messagingSenderId: '900924052124'
};

firebaseApp.initializeApp(config);

export const firebase = firebaseApp;
