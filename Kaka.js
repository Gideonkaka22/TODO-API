const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const Joi = require('joi');
const jwt = require("jsonwebtoken");


const { response } = require('express');

dotenv.config({path: './config/.env'});
//Connect to DB
mongoose.connect(
  process.env.DB_connect,
 { useNewUrlParser: true },
()=> console.log('connected to DB!'));


//Route middlewares


//body parsing middleware
app.use(express.json());

// This is the first route ; and the interface(main menu) of the app, The link creates a login path for admin 
// and user.
app.get('/todo',(req, res)=>{
  res.send([
    {SUCESS:'True'},
    {ADMIN:'http://localhost:9000/api/login'},
    {USER: 'http://localhost:9000/user'}
]);
});

//Admin data
const admin = [
  {id: 1, Task:'Filter data'},
  {id: 2, Task:'Create bootcamp'},
  {id: 3, Task:'Update Account'},
  {id: 4, Task:'Delete information'},
  {id: 5, Task:'Post a review'},
  {id: 6, Task:'Review details'}
];

//User data
const user = [
  {id: 1, Task:'Manage resource'},
  {id: 2, Task:'Publish details'},
  {id: 3, Task:'State encrypts'},
  {id: 4, Task:'Define License'}
]


// This generates a token and prompts for you to Login as admin using the authorization token 
app.post('/api/admin', verifyToken, (req,res) =>{
  jwt.verify(req.token, 'secretkey', (err, authData)=> {
   if(err){
     res.sendStatus(403);
   } else {
     res.json({
       message: 'Logged in...',
       authData
     });
   }
  })
 
 });
 
 app.post('/api/login', (req,res) =>{
  //Mock User
  const user = {
    id: 1,
    username: 'Gideon',
    email: 'gugwu87@gmail.com'
  }
 
  jwt.sign({user}, 'secretkey', (err, token)=>{
   res.json({
   token
   });
  });
 });
/*app.post('/admin/login',(req,res,next)=> {
  res.json(req.body)
  console.log(req.body)
 
}) */


// If you sign in as an admin(check if you are authenticated) and authentorized , 
//then you will have access 
// to all the tasks(details) that has been created both by user and admin.
app.get('/admin', (req,res)=>{
    res.send(admin)
});

//To get the tasks accessible to the admin by their Id
app.get('/admin/:id', (req, res)=> {
const admins = admin.find(a => a.id === parseInt(req.params.id));
 if (!admins) res.status(404).send('The course with the given ID was not found.');
 res.send(admins);
});

//To Create tasks on admin end
app.post('/admin', (req, res) => {
 const schema = {
   name: Joi.string().min(3).required()
};
//For input validation and to return error messages
const result =Joi.validate(req.body, schema);
console.log(result);

if(result.error){
  res.status(400).send(result.error.details[0].message);
  return;
}
 const adminis = {
   id: admin.length + 1,
   name: req.body.name
 };
admin.push(adminis);
res.send(adminis)
})

// This will enable you update the tasks(details) that you have access to when you are logged in
// as an admin  
app.put('/admin/:id', (req, res) => {
  //Look up the course
  //If not existing, return 404
  const users = user.find(a => a.id === parseInt(req.params.id));
  if (!users) return res.status(404).send('The course with the given ID was not found.');
  //Validate
  //If invalid, return 400- Bad request
  const schema = {
    name: Joi.string().min(3).required()
 };
 const result =Joi.validate(req.body, schema);
 if(result.error){
  res.status(400).send(result.error.details[0].message);
  return;
}
  //Update course
  //Return the updated course
admin.name = req.body.name;
res.send(admin);

  //res.write('UPDATE DATA');
  //res.end(JSON.stringify(req.body))
});


// This will enable you delete existing tasks
app.delete('/admin/:id', (req, res) => {
  // Look up the course
  // Not existing return 404
  const admins = admin.find(a => a.id === parseInt(req.params.id));
  if (!admins) res.status(404).send('The course with the given ID was not found.');
  //Delete
 const index = admin.indexOf(admin);
 admin.splice(index, 1);

 res.send(admins);
  //Return the same course
// res.send('DELETE SPECIFIED ID')
  
});


// This will prompt for you to login as user 
app.post('/user/login', (req, res) => {
 res.send('USER LOGGED IN')
});

//If you sign in as User(using the authentication token, check if youre authorized)then display all the tasks 
//that has been created by the user only. 
app.get('/user', (req,res)=>{
  res.send(user);
})
//To get the tasks accessible to the user by Id
app.get('/user/:id', (req, res)=> {
  const users = user.find(a => a.id === parseInt(req.params.id));
   if (!users) res.status(404).send('The course with the given ID was not found.');
   res.send(users);
  });

// To Create Tasks on User end
app.post('/user', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
 };
 
 const result =Joi.validate(req.body, schema);
 console.log(result);
 
 if(result.error){
   res.status(400).send(result.error.details[0].message);
   return;
 }

  const userss = {
    id: user.length + 1,
    name: req.body.name
  };
 user.push(userss);
 res.send(userss)
 })
 
//Update Tasks from user side
app.put('/user', (req,res) => {
res.write('Update Task'),
res.end(JSON.stringify(req.body))
});


//Delete Tasks from user side
app.delete('/user/:id',(req,res) =>{
//Look up the course
//Not existing return 404
const users = user.find(a => a.id === parseInt(req.params.id));
if (!users) res.status(404).send('The course with the given ID was not found.');
//Delete
const index = user.indexOf(user);
 user.splice(index, 1);

 res.send(users);
});


//Authentication

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

//Verify Token
function verifyToken(req, res, next){
//Get auth header value
const bearerHeader = req.headers['authorization'];
// Check if bearer is undefined
if(typeof bearerHeader !== 'undefined') {
//Split at the space
const bearer = bearerHeader.split(' ');
//Get token from array
const bearerToken = bearer[1];
//Set the Token
req.token = bearerToken;
//Next Middleware
next();

} else {
  // Forbidden
  res.sendStatus(403);
}}



//Server 
app.listen(9000, ()=> console.log('Listening on port 9000..'));

