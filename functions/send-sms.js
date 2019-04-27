const unirest = require('unirest');

exports.sendSms = function sendSms({ text, receiver, sender }) {
  return new Promise((fulfill, reject) => {
    const textValue = text.split(' ').join('+');

    unirest
      .post(
        `https://nexmo-nexmo-messaging-v1.p.rapidapi.com/send-sms?text=${textValue}&from=${sender}&to=%2B6${receiver}`
      )
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
