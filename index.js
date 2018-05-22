import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/routes";

const app = express();
const PORT = 3000;

//mongo connection
mongoose.connect("mongodb://localhost/project2");

//bodyparser
app.use(bodyParser.urlencoded({ extended: true })); //parse incoming requests with urlencoded payloads
app.use(bodyParser.json()); //parse incoming requests with json payloads

routes(app);

//prints stuff to homepage
app.get("/", (req, res) => {
  res.send(`Node and express server running on port: ${PORT}`);
});

//server is listening on this port
app.listen(PORT, () => {
  console.log(`the server is up and running on localhost:${PORT}`);
});
