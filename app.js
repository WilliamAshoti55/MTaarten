const express       = require('express');
const session       = require('express-session');
const cookieParser  = require('cookie-parser');
const fileUpload    = require('express-fileupload');
const bodyParser    = require('body-parser');
const mysql         = require('mysql');
const path          = require('path');
const app           = express();
const passport      = require("passport");
const http          = require('http');
const flash         = require('connect-flash');
var routes          = require('./routes/index.js');


// const {getHomePageMTaarten}      = require('./routes/index1');
// const {getHomePage}              = require('./routes/index1');
// const {getLoginPage1}            = require('./routes/index1');
// const {getLoginPage}             = require('./routes/index1');
// const {getLoginPageTest}         = require('./routes/index1');
const port                       = 3000;
// const {getVerjaadagstaartenPage} = require('./routes/index1');
// const {getBruidsTaartenPage} = require('./routes/index1');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage, playerDetailsPage, addReservationPage, addReservation, editReservationPage, editReservation} = require('./routes/player');


// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Emlienashoti55',
    database : 'mtaartendb',
    dateStrings: true,
  });

connection.connect();

global.db = connection;

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'Emlienashoti55',
    database: 'mtaartendb',
    dateStrings: true,
    
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
        
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

app.use(session({
    secret: 'justsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 600000}
}));
app.use(passport.initialize());
app.use(passport.session());


//routes
app.get ('/login', routes.loginGet);                              // call for login page
app.post('/login', routes.loginPost);                             // call for login POST
app.get ('/', routes.homepageMTaarten);                           // call for homepageMTaarten page
app.get ('/homepageMTaartenAdmin', routes.homepageMTaartenAdmin); // call for homepageMTaartenAdmin page
app.get ('/home/logout', routes.logout);                          // call for logout page
app.get ('/add', addPlayerPage);                                  // call for addPlayerPage page
app.post('/add', addPlayer);                                      // call for addPlayer POST
app.get ('/edit/:id', editPlayerPage);                            // call for editPlayerPage page
app.post('/edit/:id', editPlayer);                                // call for editPlayer POST
app.get ('/playerDetailsPage/:id', playerDetailsPage);            // call for playerDetailsPage page
app.get ('/delete/:id', deletePlayer);
app.get ('/bruidsTaartenPage', routes.bruidsTaartenPage);
app.get ('/verjaardagsTaartenPage', routes.verjaardagsTaartenPage);


//app.get('/verjaardagsTaartenPage', getVerjaadagstaartenPage);
//app.get('/bruidsTaartenPage', getBruidsTaartenPage);
//app.get('/addReservation', addReservationPage);
//app.post('/addReservation', addReservation);
//app.get('/edit/id', editReservationPage);
//app.post('/edit/:id', editReservation);



//Middelware
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("login")
};