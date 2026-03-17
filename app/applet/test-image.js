const https = require('https');
https.get('https://image.pollinations.ai/prompt/dentist?width=800&height=500&nologo=true', (res) => {
  console.log('Status:', res.statusCode);
}).on('error', (e) => {
  console.error(e);
});
