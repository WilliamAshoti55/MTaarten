const fs = require('fs');

module.exports = {
    addVerjaardagstaartPage: (req, res) => {
        var sql  = "SELECT * FROM `verjaardagstaarten` ORDER BY id ASC"; // query database to get all the players
        db.query(sql, function(err, result){
            res.render('addVerjaardagstaart', {
                verjaardagstaarten:result,
                message: ''
            });
        });    
       
    },
    addVerjaardagstaart: (req,res) => {

        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let verjaardagstaartnaam = req.body.verjaardagstaartnaam;
        let aantalpersonen       = req.body.aantalpersonen;
        let uploadedFile         = req.files.image;
        let image_name           = uploadedFile.name;
        let fileExtension        = uploadedFile.mimetype.split('/')[1];
        image_name               = verjaardagstaartnaam + '.' + fileExtension;

        if(uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
            // upload the file to the /public/assets/img directory
            uploadedFile.mv(`public/assets/verjaardagstaartenmap/${image_name}`, (err ) => {
                if (err) {
                    return res.status(500).send(err);
                }
                // send the player's details to the database
                let query = "INSERT INTO `verjaardagstaarten` (verjaardagstaartnaam, aantalpersonen, image) VALUES ('" + verjaardagstaartnaam + "', '" + aantalpersonen + "', '" + image_name + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/addVerjaardagstaart');
                });
            });
        } else {
            message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
            res.render('addBruidstaart.ejs', {
                message,
                title: 'Welcome bij MTaarten | Voeg een Verjaardagstaart toe'
            });
        }

},

    deleteVerjaardagstaart: (req,res) => {
    var user =  req.session.user,
    userId = req.session.userId;
        if(userId == null){
            res.render('login', {
                
                message: 'Uw inlog sessie is verlopen. Log aub opnieuw in.'
            })
            
        };
    
        let verjaardagstaartId = req.params.id;
        let getImageQuery = 'SELECT image from `verjaardagstaarten` WHERE id = "' + verjaardagstaartId + '"';
        let deleteVerjaardagstaartQuery = 'DELETE FROM verjaardagstaarten WHERE id = "' + verjaardagstaartId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/verjaardagstaartenmap/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteVerjaardagstaartQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/addVerjaardagstaart');
                });
            });
        });
}
}