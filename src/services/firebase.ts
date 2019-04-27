import * as firebaseApp from 'firebase/app';

const config = {
  apiKey: 'AIzaSyDfNajmdJ-Zjg_hcsEW5J632X0EW7X_cK8',
  authDomain: 'team36.firebaseapp.com',
  databaseURL: 'https://team36.firebaseio.com',
  projectId: 'team36',
  storageBucket: 'team36.appspot.com',
  messagingSenderId: '341936962355'
};

firebaseApp.initializeApp(config);

export const firebase = firebaseApp;
