const net = require ('net');
const newRequests = [];
const currentUsers = [];

const server = net.createServer((request) => {
  newRequests.push(request);

  let userName;

  request.on('data', (data)=>{
    console.log(data.toString());
    const userInput = data.toString();
    if(userName !== undefined){
      newRequests.forEach(user => {
        if(request !== user){
          user.write(`${userName.substring(0, userName.length)}: ${userInput.substring(0,userInput.length - 1)}`);
        }
      })
    } else {
      let isNew = currentUsers.every(user => {
        console.log('user', user);
        return userInput !== user;
      });

      console.log(isNew);
      if(isNew){
      userName = userInput.substring(0, userInput.length-1);
      currentUsers.push(userName);
      console.log(currentUsers);
      } else {
        newRequests.forEach(user => {
          if(request === user){
          user.write('UserName already in use, please select another one');
          }
        });
      }
    }

  });
  request.write('Please Enter UserName');

  process.stdin.on('readable', () => {

  var chunk = process.stdin.read();
   if (chunk !== null) {
      if (chunk.toString().substring(0,5) ==='/kick') {
        //kick out user
        let index = currentUsers.indexOf(chunk.toString().substring(6,chunk.length-1));
        console.log(index);
        if (index > -1) {
          newRequests[index].write('you have been kicked by the ADMIN');
          newRequests[index].end();
        } else {
          console.log('that user does not exist');
        }
      } else {
        newRequests.forEach(user => {
          user.write(`ADMIN: ${chunk.toString().substring(0,chunk.length-1)}`);
        })
      }
    }
  });






});

server.listen({port: 8080}, ()=>{
  const address = server.address();
  console.log(`Opened server on ${address.port}`);
});

