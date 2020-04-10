const fs = require('fs');

module.exports = {
    addPlayerPage: (req, res) => {
    var user =  req.session.user,
    userId = req.session.userId;
        if(userId == null){
            res.redirect("login");
        }else {
        res.render('add-player.ejs', {
            title: 'Welcome to Socka | Add a new player'
            ,message: ''
        });
    }
    },
    addPlayer: (req, res) => {

        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let achternaam      = req.body.achternaam;
        let telefoonnummer  = req.body.telefoonnummer;
        let adres           = req.body.adres;
        let email           = req.body.email;
        let typetaart       = req.body.typetaart;
        let aantalpersonen  = req.body.aantalpersonen;
        let smaak           = req.body.smaak;
        let vulling         = req.body.vulling;
        let opmerking       = req.body.opmerking;
        let prijs           = req.body.prijs;
        let reedsVoldaan    = req.body.reedsVoldaan;
        let nogTeVoldoen    = req.body.nogTeVoldoen;
        let date            = req.body.date;
        let username        = req.body.username;
        let uploadedFile    = req.files.image;
        let image_name      = uploadedFile.name;
        let fileExtension   = uploadedFile.mimetype.split('/')[1];
        image_name          = achternaam + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `players` WHERE user_name = '" + username + "'";

        // db.query(usernameQuery, (err, result) => {
        //     if (err) {
        //         return res.status(500).send(err);
        //     }
        //     if (result.length > 0) {
        //         message = 'Username already exists';
        //         res.render('add-player.ejs', {
        //             message,
        //             title: 'Welcome to Socka | Add a new player'
        //         });
        //     } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the player's details to the database
                        let query = "INSERT INTO `players` (achternaam, telefoonnummer, adres, email, typetaart, aantalpersonen, smaak, vulling, opmerking, prijs, reedsVoldaan, nogTeVoldoen, date, image, user_name) VALUES ('" +
                            achternaam + "', '" + telefoonnummer + "', '" + adres + "', '" + email + "', '" + typetaart + "', '" + aantalpersonen + "', '" + smaak + "','" + vulling + "', '" + opmerking + "', '" + prijs + "', '" + reedsVoldaan + "', '" + nogTeVoldoen + "',STR_TO_DATE ('" + date + "', '%d-%m-%Y'), '" + image_name + "', '" + username + "')";
                        
                            db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/homepageMTaartenAdmin');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-player.ejs', {
                        message,
                        title: 'Welcome to Socka | Add a new player'
                    });
                }
        //     }
        // });
    },
    editPlayerPage: (req, res) => {
        var user =  req.session.user,
        userId = req.session.userId;
            if(userId == null){
                res.render('login', {
                    
                    message: 'Uw inlog sessie is verlopen. Log aub opnieuw in.'
                })
                
            };
            
        let playerId = req.params.id;
        let query = "SELECT  * FROM players WHERE id = '" + playerId + "'";
        let query1 ="SELECT id FROM `players` WHERE id = '" + playerId + "' ORDER BY id ASC";
            // let query1 ="SELECT achternaam, telefoonnummer, adres, email, typetaart, aantalpersonen, smaak, vulling, opmerking, prijs, reedsVoldaan, nogTeVoldoen, DATE_FORMAT(date, '%d-%m-%Y') date, image, user_name FROM `players` WHERE id = '" + playerId + "' ORDER BY id ASC";
        db.query(query, (err, result) => {
            if (err) {
                
                return res.status(500).send(err);
            };
            
            res.render('edit-player.ejs', {
                title: 'Edit  Player'
                ,player: result[0]
                ,message: ''
            });
        });
    
    },
    editPlayer: (req, res) => {
        let playerId = req.params.id;
        let achternaam = req.body.achternaam;
        let telefoonnummer = req.body.telefoonnummer;
        let adres = req.body.adres;
        let email = req.body.email;
        let aantalpersonen = req.body.aantalpersonen;
        let typetaart = req.body.typetaart;
        let smaak = req.body.smaak;
        let vulling = req.body.vulling;
        let opmerking = req.body.opmerking
        let prijs = req.body.prijs;
        let reedsVoldaan = req.body.reedsVoldaan;
        let nogTeVoldoen = req.body.nogTeVoldoen;
        let date = req.body.date;
        

        let query = "UPDATE `players` SET `achternaam` = '" + achternaam + "', `telefoonnummer` = '" + telefoonnummer + "', `adres` = '" + adres + "', `email` = '" + email + "', `typetaart` = '" + typetaart + "', `aantalpersonen` = '" + aantalpersonen + "', `smaak` = '" + smaak + "', `vulling` = '" + vulling + "', `opmerking` = '" + opmerking + "', `prijs` = '" + prijs + "', `reedsVoldaan` = '" + reedsVoldaan + "', `nogTeVoldoen` = '" + nogTeVoldoen + "', `date` = '"+ date + "' WHERE `players`.`id` = '" + playerId + "'";
        db.query(query, (err, result) => {                                                                                                                                                                                                                                                                                                                                                                                                                                   
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/homepageMTaartenAdmin');
            
        });
    },
    deletePlayer: (req, res) => {
        var user =  req.session.user,
        userId = req.session.userId;
            if(userId == null){
                res.render('login', {
                    
                    message: 'Uw inlog sessie is verlopen. Log aub opnieuw in.'
                })
                
            };

        let playerId = req.params.id;
        let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
        let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/homepageMTaartenAdmin');
                });
            });
        });
    },
    playerDetailsPage: (req, res) => {
        var user =  req.session.user,
        userId = req.session.userId;
            if(userId == null){
                res.render('login', {
                    
                    message: 'Uw sessie is verlopen. Log A.U.B opnieuw in'
                }
                )};
                let playerId = req.params.id;
                let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                        console.log(err);
                    }
                    res.render('playerDetailsPage.ejs', {
                        title: 'Edit  Player'
                        ,player: result[0]
                        ,message: ''
                    });
                });
    }
};