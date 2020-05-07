const fs = require('fs');

module.exports = {
    addBruidstaartPage: (req, res) => {
        var user =  req.session.user,
        userId = req.session.userId;
        console.log('Gebruiker='+userId);
        if(userId == null){
        res.redirect("login");
        return;
  }
        var sql  = "SELECT * FROM `bruidstaarten` ORDER BY id ASC"; // query database to get all the players
        db.query(sql, function(err, result){
            res.render('addBruidstaart', {
                bruidstaarten:result,
                message: ''
            });
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

},

deleteBruidstaart: (req,res) => {
    var user =  req.session.user,
    userId = req.session.userId;
        if(userId == null){
            res.render('login', {
                
                message: 'Uw inlog sessie is verlopen. Log aub opnieuw in.'
            })
            
        };
    
        let bruidstaartId = req.params.id;
        let getImageQuery = 'SELECT image from `bruidstaarten` WHERE id = "' + bruidstaartId + '"';
        let deleteBruidstaartQuery = 'DELETE FROM bruidstaarten WHERE id = "' + bruidstaartId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/bruidstaartenmap/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteBruidstaartQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/addBruidstaart');
                });
            });
        });
}
}