const https = require('https');

const apiKey = 'cb6685b37a9840a68ce734bd5828a566';
const url = `https://bsc-mainnet.infura.io/v3/${apiKey}`;

const data = JSON.stringify({
  jsonrpc: '2.0',
  method: 'eth_blockNumber',
  params: [],
  id: 1
});

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(url, options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Status:', res.statusCode);
    console.log('Response Headers:', res.headers);
    console.log('Response Body:', responseData);
    
    try {
      const jsonResponse = JSON.parse(responseData);
      if (jsonResponse.result) {
        const blockNumber = parseInt(jsonResponse.result, 16);
        console.log(`Current BSC Block Number: ${blockNumber}`);
      }
    } catch (error) {
      console.error('Error parsing response:', error);
    }
  });
});

req.on('error', (error) => {
  console.error('Request Error:', error);
});

req.write(data);
req.end();

console.log(`Testing connection to BSC Mainnet via Infura...`);
console.log(`Endpoint: ${url}`);