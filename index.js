import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/routes";

const app = express();
const PORT = 3000;
let contacts = require('./data');  // grabing from data 

//mongo connection
mongoose.connect("mongodb://localhost/project2");

//bodyparser
app.use(bodyParser.urlencoded({ extended: true })); //parse incoming requests with urlencoded payloads
app.use(bodyParser.json()); //parse incoming requests with json payloads

routes(app);




//prints stuff to homepage
app.get("/", (req, res) => {
  res.send(contacts);
  
});
//finding a particular person by there id number 
app.get('/:id', (req,res)=> {
  const requestID = req.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == requestID;
  })
  res.json(contact[0]);
})

//adding new contacts 
app.post('/', (req,res) => {
  const contact = {
    id: contacts.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    company: req.body.company,
    phone : req.body.phone,

  }
contacts.push(contact);
res.json(contact);
});
//for when you want to update your infomation 
app.put('/:id', (req,res) => {
  const requestID = req.params.id;

  let contact = contacts.filter(contact =>{
    return contact.id == requestID;
  })[0];

const index = contacts.indexOf(contact);

const keys = Object.keys(req.body);

keys.forEach(key => {
  contact[key] = req.body[key];
});
contacts[index] = contact;

  res.json(contacts[index]);
});

app.delete('/:id', (req,res) => {
const requestID = req.params.id;
let contact = contacts.filter(contact => {
  return contact.id == requestID;
})[0];
const index = contacts.indexOf(contact);

contacts.splice(index, 1);

res.json({message: `user  ${requestID}  deleted`});
});

//server is listening on this port
app.listen(PORT, () => {
  console.log(`the server is up and running on localhost:${PORT}`);
});

