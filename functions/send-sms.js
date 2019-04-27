const unirest = require('unirest');

const sanitizeText = oriString =>
  oriString &&
  (typeof oriString === 'string' ? oriString.split(' ').join('+') : oriString);

exports.sendSms = function sendSms({ text, receiver, sender }) {
  return new Promise((fulfill, reject) => {
    const textValue = sanitizeText(text);
    const senderValue = sanitizeText(sender);

    const requestUrl = `https://nexmo-nexmo-messaging-v1.p.rapidapi.com/send-sms?text=${textValue}&from=${senderValue}&to=%2B6${receiver}`;

    unirest
      .post(requestUrl)
      .header('X-RapidAPI-Host', 'nexmo-nexmo-messaging-v1.p.rapidapi.com')
      .header(
        'X-RapidAPI-Key',
        '599b51e22bmsh066735ca3a5edadp169c3djsn3ede1bfcb9b6'
      )
      .header('Content-Type', 'application/x-www-form-urlencoded')
      .end(function(result) {
        console.log(result.status, result.headers, result.body);
        fulfill();
      });
  });
};
