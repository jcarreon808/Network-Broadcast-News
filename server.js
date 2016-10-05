const net = require ('net');
const newRequests = [];

const server = net.createServer((request) => {

    console.log(data.toString());
    //newUsers.push(request);
    let userName;

    request.on('data', (data)=>{
      const userInput = data.toString();
      if(userName !== undefined){
        newRequests.forEach(user => {
          if(request !== user){
            user.write(`${userName.substring(0, userName.length - 1)}: ${userInput.substring(0, userInput.length - 1)}`);
          }
        })
      }else{
        userName = userInput;
        newRequests.push(requests);
      }
    });

  request.write('Please Enter UserName');


  process.stdin.on('readable', () => {
    var chunk = process.stdin.read();
    if (chunk !== null) {
      newUsers.forEach(user =>{
        user.write(`ADMIN: ${chunk.toString().substring(0,chunk.length-1)}`);
      });
    };
  });
});

server.listen({port: 6969}, ()=>{
  const address = server.address();
  console.log(`Opened server on ${address.port}`);
});
