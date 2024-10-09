import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import expressEjsLayouts from "express-ejs-layouts";
import flash from "express-flash";
import session from "express-session";
import methodOverride from "method-override";

import customerRouter from './server/routes/customer.js'
import connectDB from './server/config/db.js'; // Import the DB connection

dotenv.config();

// Connect to the database
connectDB();  

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.urlencoded({extended: true}));  // = app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method')); // NB! to update info through a form and send the updated info with PUT method


// Static files
app.use(express.static("public"));

// Express Session - Initialization
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      // when should the cookie expire?
      maxAge: 1000 * 60 * 60  * 24, // one day
    }
  })
);

// Flash message middleware
app.use(flash());

// Templating Engine
app.use(expressEjsLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', customerRouter);


app.get('/', (req, res) => {
  res.render("index.ejs");
  });
 


app.listen(port, () => {
    console.log(`Server running on port: ${port}.`);
})
