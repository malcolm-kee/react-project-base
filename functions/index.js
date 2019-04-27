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
          content: `<p>You've applied a loan with the following details:</p>
          <table>
            <tr>
              <td>Name:</td><td>${val.name}</td>
            </tr>
            <tr>
              <td>IC/Passport:</td><td>${val.id}</td>
            </tr>
            <tr>
              <td>Addresses:</td><td>${val.addressLine1}<br />
              ${val.postalCode} ${val.city}, ${val.state}</td>
            </tr>
            <tr>
              <td>Mobile:</td><td>${val.mobileNumber}</td>
            </tr>
            <tr>
              <td>Email:</td><td>${val.email || 'Not Provided'}</td>
            </tr>
            <tr>
              <td>Company:</td><td> ${val.company}</td>
            </tr>
            <tr>
              <td>companyHrNumber:</td><td> ${val.companyHrNumber}</td>
            </tr>
            <tr>
              <td>Current Salary:</td><td> RM ${val.salary}</td>
            </tr>
            <tr>
              <td>Car Price:</td><td> RM ${val.carPrice}</td>
            </tr>
            <tr>
              <td>Down Payment:</td><td> ${val.downPayment}</td>
            </tr>
            <tr>
              <td>Tenure:</td><td> ${val.tenure} years</td>
            </tr>
            <tr>
              <td>IC Image:</td><td> ${
                val.icImage ? `<img src="${val.icImage}" />` : 'Not Provided'
              }</td>
            </tr>
            <tr>
              <td>License Image:</td><td> ${
                val.licenseImage
                  ? `<img src="${val.licenseImage}" />`
                  : 'Not Provided'
              }</td>
            </tr>
            ${
              Array.isArray(val.salarySlipFor3MonthsImages) &&
              val.salarySlipFor3MonthsImages.length > 0
                ? `<tr><td colspan="2">Pay Slips</td></tr>
                <tr><td colspan="2">${val.salarySlipFor3MonthsImages
                  .map(imgSrc => `<img src="${imgSrc}" />`)
                  .join('')}</td></tr>`
                : ''
            }
            ${
              Array.isArray(val.savingStatementsFor3MonthsImages) &&
              val.savingStatementsFor3MonthsImages.length > 0
                ? `<tr><td colspan="2">Saving Account Statements</td></tr>
                <tr><td colspan="2">${val.savingStatementsFor3MonthsImages
                  .map(imgSrc => `<img src="${imgSrc}" />`)
                  .join('')}</td></tr>`
                : ''
            }
          </table>`,
          sender: 'noreply@team36.firebaseapp.com'
        });
      } catch (e) {
        console.error('Error when sendEmail');
        console.error(e);
      }
    }
  });
