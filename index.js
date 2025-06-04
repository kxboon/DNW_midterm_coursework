/**
* index.js
* This is your main app entry point
*/

// Set up express, bodyparser and EJS
const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');


//setup bootstrap
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressLayouts); // use express layouts to render the layout.ejs file
app.set('view engine', 'ejs'); // set the app to use ejs for rendering
app.use(express.static(__dirname + '/public')); // set location of static files

// Set up SQLite
// Items in the global namespace are accessible throught out the node application
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db',function(err){
    if(err){
        console.error(err);
        process.exit(1); // bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
    }
});

app.use(session({
    secret: 'SeCreTKey010298',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Handle requests to the home page 
app.get('/', (req, res) => {
    res.render('home.ejs', { title: 'Home' });
});

// Add all the route handlers in usersRoutes to the app under the path /
const usersRoutes = require('./routes/users');
app.use('/', usersRoutes);

const authRoutes = require('./routes/auth_route');
app.use('/auth', authRoutes);

const organizerRoutes = require('./routes/organizer_route');
app.use('/organizer', organizerRoutes);

// Make the web application listen for HTTP requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//http://localhost:3000
