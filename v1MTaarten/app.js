const express       = require('express');
const app           = express();
const port          = 3000;

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});