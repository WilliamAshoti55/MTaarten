const fs = require('fs');

module.exports = {
    addVerlovingstaartPage: (req, res) => {
        var user =  req.session.user,
        userId = req.session.userId;
        console.log('Gebruiker='+userId);
        if(userId == null){
        res.redirect("login");
        return;
  }
        var sql  = "SELECT * FROM `verlovingstaarten` ORDER BY id ASC"; // query database to get all the players
        db.query(sql, function(err, result){
            res.render('addVerlovingstaart', {
                verlovingstaarten:result,
                message: ''
            });
        });    
       
    },
    addVerlovingstaart: (req,res) => {

        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let verlovingstaartnaam = req.body.verlovingstaartnaam;
        let aantalpersonen       = req.body.aantalpersonen;
        let uploadedFile         = req.files.image;
        let image_name           = uploadedFile.name;
        let fileExtension        = uploadedFile.mimetype.split('/')[1];
        image_name               = verlovingstaartnaam + '.' + fileExtension;


        if(uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
            // upload the file to the /public/assets/img directory
            uploadedFile.mv(`public/assets/verlovingstaartenmap/${image_name}`, (err ) => {
                if (err) {
                    return res.status(500).send(err);
                }
                // send the player's details to the database
                let query = "INSERT INTO `verlovingstaarten` (verlovingstaartnaam, aantalpersonen, image) VALUES ('" + verlovingstaartnaam + "', '" + aantalpersonen + "', '" + image_name + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/addVerlovingstaart');
                });
            });
        } else {
            message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
            res.render('addVerlovingstaart.ejs', {
                message,
                title: 'Welcome bij MTaarten | Voeg een Verlovingstaart toe'
            });
        }

},

    deleteVerlovingstaart: (req,res) => {
    var user =  req.session.user,
    userId = req.session.userId;
        if(userId == null){
            res.render('login', {
                
                message: 'Uw inlog sessie is verlopen. Log aub opnieuw in.'
            })
            
        };
    
        let verlovingstaartId = req.params.id;
        let getImageQuery = 'SELECT image from `verlovingstaarten` WHERE id = "' + verlovingstaartId + '"';
        let deleteVerlovingsQuery = 'DELETE FROM verlovingstaarten WHERE id = "' + verlovingstaartId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/verlovingstaartenmap/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteVerlovingsQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/addVerlovingstaart');
                });
            });
        });
}
}