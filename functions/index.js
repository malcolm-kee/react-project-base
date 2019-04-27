'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

exports.sendSubmissionEmail = functions.database
  .ref('/forms/{formId}')
  .onCreate(async function handleNewFormSubmission(change) {
    const val = change.val();
    console.log('in sendSubmissionEmail handler');
    console.log(val);

    if (val && val.email) {
      try {
        await mailTransport.sendEmail({
          from: '"Smart Loan" <noreply@smartyloan.firebaseapp.com>',
          to: val.email,
          subject: 'Car Loan Submission Received',
          text: 'Thanks!'
        });
      } catch (e) {
        console.error('Error when sendEmail');
        console.error(e);
      }
    }
  });
