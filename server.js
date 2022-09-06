// console.log('CHECK IF NODE IS RUNNING')

// const http = require('http');

// http.createServer(function (req, res) {
// res.writeHead(200, {'Content-Type': 'text/html'});
// res.end('Hello World! this is my new page cntent');
// res.end('<h1>this is a test h1 tag</h1>');
//  }).listen(8080);

/*const orange = 4;
const name = 'Harry'; 

console.log(`${name} has ${orange} oranges`);
function sayHello(name){
    console.log("Hello " + name);
}
sayHello("Gideon")


var Hello = 'Gideon';
console.log(Hello);
console.log(module);

const log = require('./logger');
log('Message');

const path = require('Path');
var pathObj = path.parse(___filename);
console.log(pathObj); */

/*const path = require('path');
var pathObj = path.parse(__filename);
console.log(pathObj);


//OS module 
const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('TotalMemory:' + totalMemory);
//Template string
console.log(`TotalMemory: ${totalMemory}`);
console.log(`FreeMemory: ${freeMemory}`);

const fs = require('fs');
const files = fs.readdirSync('./');
console.log(files);

//http module */
/*const http = require('http');
const server = http.createServer((req, res) =>{
  if (req.url === '/') {
    res.write('Hello World');
    res.end ();
  }
  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1,2,3]));
    res.end();
  }
});


server.listen(3000);
console.log('Listening at Port 3000'); 
*/

//const res = require('express/lib/response');
const http = require ('http');

const Admin = [
  {
    login : ' David',
    password : '4000'
  },
  { id: 1, Username:'Gideon', Password: 'Gideon25', Role: 'Call Agent' },
  { id: 2, Username: 'Jefferson', Password: 'Jefferson25', Role: 'Accountant'},
  { id: 3, Username: 'Kaka', Password:'Kaka22', Role: 'HR'},
  { id: 4, Username: 'Chine', Password:'Chine123', Role:'Data Analyst'}
]


const User = [
  { id: 01, Username: 'Chibuike', Password: 'Chibuike123', Role: 'Project Manager'},
  { id: 02, Username: 'Obinna', Password:'Obi000', Role:'Sales Manager'}
]

const server = http.createServer((req,res)=>{
  if (req.url=== '/') {
    res.write('WELCOME TO THE TODO APP')
    (
      {
        "LOGIN AS ADMIN": 'http://todo/admin'
      },
      {
        "LOGIN AS USER":'http://todo/user'
      }
    )
  };


  if (req.url=== '/todo/admin') {
    res.write('ADMIN SIGNED IN SUCCESFULLY'),
    res.end(
      JSON.stringify(
        {
        data: Admin
        }),
        res.writeHead(200)
    )}
  if (req.url=== '/todo/user'){
    res.write('USER LOGGED IN SUCCESFULLY'),
    res.end(JSON.stringify
    (
    {
      data: User
    },
    res.writeHead(200)
    ))
  }

});
                                                                                                                                                                                                                                                     

const PORT = 8080;
server.listen(PORT, ()=> console.log(`TODO APP IS RUNNING ON PORT ${PORT}`));

require('dotenv').config()

/*res.end(
  JSON.stringify({
    sucess:true,
    data : Admin
  }) 
); */
/*server.listen(PORT, () => console.log(`Server running on port  ${PORT}`));

require('dotenv').config()
console.log(process.env) */








/*let status = 6000;
const response = {
  sucess: false,
  data : null
};  */


