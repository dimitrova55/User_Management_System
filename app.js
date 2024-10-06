import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import expressEjsLayouts from "express-ejs-layouts";
// import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = 3000 || process.env.PORT;

// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Templating Engine
app.use(expressEjsLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
//app.use('/', require('./server/routes/customer'));


app.get('/', (req, res) => {
  res.render("index.ejs");
  });
 


app.listen(port, () => {
    console.log(`Server running on port: ${port}.`);
})
