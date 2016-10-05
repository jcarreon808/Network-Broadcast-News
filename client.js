const net = require('net');

const options = {
  'port': 8080,
  'host':'127.0.0.1'
};

let clientName;

const client = net.connect(options, () => {
  console.log('Connected to Server!');
});


client.on('data', (data) => {
  console.log(data.toString());
});

client.on('end', process.exit);


process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    client.write(chunk);
  }
});