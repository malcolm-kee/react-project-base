'use strict';

const functions = require('firebase-functions');
const { sendEmail } = require('./send-email');
const { sendSms } = require('./send-sms');

exports.onNewForm = functions.database
  .ref('/forms/{formId}')
  .onCreate(async function handleNewForm(snapshot, context) {
    const val = snapshot.val();
    const formId = context.params && context.params.formId;
    console.log('in handleNewForm handler');
    console.log({ formId, params: context.params });

    if (val.mobileNumber) {
      try {
        await sendSms({
          text:
            'We receive your application' + formId
              ? `View your loan status here: https://team36.firebaseapp.com/loan-status/${formId}`
              : '',
          sender: 'L',
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
          subject: 'Loan application in L',
          content: `
            You've applied a loan with the following details:
            Name: ${val.name}
            IC/Passport: ${val.id}
            Addresses: 
            ${val.addressLine1}
            ${val.postalCode} ${val.city}, ${val.state}
            Mobile: ${val.mobileNumber}
            Email: ${val.email || 'Not Provided'}
            Company: ${val.company}
            companyHrNumber: ${val.companyHrNumber}
            Current Salary: RM ${val.salary}
            Car Price: RM ${val.carPrice}
            Down Payment: ${val.downPayment}
            Tenure: ${val.tenure} years
            `,
          // icImage: ${val.icImage}
          // licenseImage: ${val.licenseImage}
          // salarySlipFor3MonthsImages: string[];
          // savingStatementsFor3MonthsImages: string[];
          sender: 'noreply@team36.firebaseapp.com'
        });
      } catch (e) {
        console.error('Error when sendEmail');
        console.error(e);
      }
    }
  });
