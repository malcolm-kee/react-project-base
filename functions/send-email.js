const unirest = require('unirest');

exports.sendEmail = function sendEmail({ email, content, subject, sender }) {
  return new Promise((fulfill, reject) => {
    unirest
      .post('https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send')
      .header('X-RapidAPI-Host', 'rapidprod-sendgrid-v1.p.rapidapi.com')
      .header(
        'X-RapidAPI-Key',
        '599b51e22bmsh066735ca3a5edadp169c3djsn3ede1bfcb9b6'
      )
      .header('Content-Type', 'application/json')
      .send({
        personalizations: [
          {
            to: [{ email }],
            subject
          }
        ],
        from: { email: sender },
        content: [{ type: 'text/plain', value: content }]
      })
      .end(function(result) {
        console.log(result.status, result.headers, result.body);
        fulfill();
      });
  });
};
