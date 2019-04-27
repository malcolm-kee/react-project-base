'use strict';

const functions = require('firebase-functions');
const { sendEmail } = require('./send-email');
const { sendSms } = require('./send-sms');

exports.onNewForm = functions.database
  .ref('/forms/{formId}')
  .onCreate(async function handleNewForm(change) {
    const val = change.val();
    console.log('in handleNewForm handler');
    console.log(val);

    if (val.mobileNumber) {
      try {
        await sendSms({
          text: 'We receive your application',
          sender: 'Smart Loan',
          receiver: val.mobileNumber
        });
      } catch (e) {
        console.error('Error when sendSms');
        console.error(e);
      }
    }

    if (val && val.email) {
      try {
        await sendEmail({
          email: val.email,
          subject: 'Smart Loan',
          content: 'Hello from Smart Loan',
          sender: 'noreply@team36.firebaseapp.com'
        });
      } catch (e) {
        console.error('Error when sendEmail');
        console.error(e);
      }
    }
  });
