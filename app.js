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
const nodemailer    = require('nodemailer');
var routes          = require('./routes/index.js');
const port          = 3000;
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage, playerDetailsPage}   = require ('./routes/player');
const {addBruidstaartPage, addBruidstaart, deleteBruidstaart}                                   = require ('./routes/bruidstaart');
const {addVerjaardagstaartPage, addVerjaardagstaart, deleteVerjaardagstaart}                    = require ('./routes/verjaardagstaart');
const {addVerlovingstaartPage, addVerlovingstaart , deleteVerlovingstaart}                      = require ('./routes/verlovingstaart');
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
app.get ('/delete/:id', deletePlayer);
                                      
app.get ('/addBruidstaart', addBruidstaartPage);
app.post('/addBruidstaart', addBruidstaart);
app.get ('/deleteBruidstaart/:id', deleteBruidstaart)

app.get ('/addVerjaardagstaart', addVerjaardagstaartPage);
app.post('/addVerjaardagstaart', addVerjaardagstaart);
app.get ('/deleteVerjaardagstaart/:id', deleteVerjaardagstaart);

app.get ('/addVerlovingstaart', addVerlovingstaartPage);
app.post('/addVerlovingstaart', addVerlovingstaart);
app.get ('/deleteVerlovingstaart/:id', deleteVerlovingstaart);



app.get ('/playerDetailsPage/:id', playerDetailsPage);            // call for playerDetailsPage page
app.get ('/bruidstaartenPage', routes.bruidstaartenPage);
app.get ('/verjaardagsTaartenPage', routes.verjaardagsTaartenPage);
app.get ('/verlovingsTaartenPage', routes.verlovingsTaartenPage);
app.get ('/overOnsPage', routes.overOnsPage);
app.get ('/contactPage', routes.contactPage);
// app.post('/send', (req, res) =>{
//     const output = `
//         <p> You have a new contact request</p>
//         <h3>Contact Details</h3>
//         <ul>
//         <li>Name: ${req.body.name}</li>
//         <li>Company: ${req.body.company}</li>
//         <li>Email: ${req.body.email}</li>
//         <li>Phone: ${req.body.phone}</li>
//         </ul>
//         <h3>Message</h3>
//         <p>${req.body.message}</p>
//     `;
//     // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.bhosted.nl',
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: 'info@mtaarten.nl', // generated ethereal user
//       pass: 'Emlienashoti55', // generated ethereal password
//     },
//     // tls: {
//     //     rejectUnauthorized: false
//     // }
//   });

//   // send mail with defined transport object
//   let mailOptions = {
//     from: '"Fred Foo 👻" <info@mtaarten.nl>', // sender address
//     to: 'info@mtaarten.nl', // list of receivers
//     subject: 'Test ✔', // Subject line
//     text: 'Hello world?', // plain text body
//     html: output, // html body
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           return console.log(error);
//       }
//       console.log("Message sent: %s", info.messageId);
//       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   });
  

//   res.render('contactPage', {
//       message: 'Email verstuurd'
//   });
// });
app.get ('/algemeenVoorwaardenPage', routes.algemeenVoorwaardenPage);

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