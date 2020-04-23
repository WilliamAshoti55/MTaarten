// const fs = require('fs');

module.exports = {
    addBruidstaartPage: (req, res) => {
        res.render('addBruidstaart.ejs', {
            title: 'Welkom op de pagina Bruidstaarten',
            message: 'Vroeeemmmmmmmmmmmmmmm'
        });
    },
    addBruidstaart: (req,res) => {

        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let bruidstaartnaam = req.body.bruidstaartnaam;
        let aantalpersonen = req.body.aantalpersonen;
        let uploadedFile    = req.files.image;
        let image_name      = uploadedFile.name;
        let fileExtension   = uploadedFile.mimetype.split('/')[1];
        image_name          = bruidstaartnaam + '.' + fileExtension;


        if(uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
            // upload the file to the /public/assets/img directory
            uploadedFile.mv(`public/assets/bruidstaartenmap/${image_name}`, (err ) => {
                if (err) {
                    return res.status(500).send(err);
                }
                // send the player's details to the database
                let query = "INSERT INTO `bruidstaarten` (bruidstaartnaam, aantalpersonen, image) VALUES ('" + bruidstaartnaam + "', '" + aantalpersonen + "', '" + image_name + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/homepageMTaartenAdmin');
                });
            });
        } else {
            message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
            res.render('addBruidstaart.ejs', {
                message,
                title: 'Welcome to Socka | Add a new player'
            });
        }

}}