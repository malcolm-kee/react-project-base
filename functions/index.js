const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.sendSubmissionEmail = functions.database
  .ref('/forms/{formId}')
  .onCreate(
    change =>
      new Promise((fulfill, reject) => {
        const val = change.val();
        console.log('in sendSubmissionEmail handler');
        console.log(val);
        fulfill();
      })
  );
