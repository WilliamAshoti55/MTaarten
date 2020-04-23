// const fs = require('fs');

module.exports = {
    addBruidstaartPage: (req, res) => {
        res.render('addBruidstaart.ejs', {
            title: 'Welkom op de pagina Bruidstaarten',
            message: 'Test'
        });
    },
    addBruidstaart: (req,res) => {

        // if (!req.files) {
        //     return res.status(400).send("No files were uploaded.");
        // }

        // let message = '';
        // let bruidstaartnaam = req.body.bruidstaartnaam;
        // let aantalpersonen = req.body.aantalpersonen;
        // let uploadedFile    = req.files.image;
        // let image_name      = uploadedFile.name;
        // let fileExtension   = uploadedFile.mimetype.split('/')[1];
        // image_name          = bruidstaartnaam + '.' + fileExtension;
        res.render('addBruidstaart.ejs' , {
            title: 'Welkom op de pagina Bruidstaarten',
            message: 'Test'
        });
    }
}