const express       = require('express');
const app           = express();
var routes          = require('./routes/index.js');
const port          = 3000;

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

// app.get("/", function(req, res){
//     res.render("home");
// });
app.get ('/', routes.homepageMTaarten);                           // call for homepageMTaarten page
app.get("/about", function(req, res){
    res.render("about");
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});