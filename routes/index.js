
exports.loginGet = function(req, res){
  var message = 'Rwaraa';
  res.render('login', {message: message})
};

exports.loginPost = function(req, res){
  var message = '';
  var sess = req.session; 

  if(req.method == "POST"){
     var post  = req.body;
     var name= post.user_name;
     var pass= post.password;
    
     var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
     db.query(sql, function(err, results){      
        if(results.length){
           req.session.userId = results[0].id;
           req.session.user = results[0];
           console.log(results[0].id);
           res.redirect('/homepageMTaartenAdmin');
        }
        else{
           message = 'Wachtwoord of gebruikersnaam is incorrect.';
           res.render('login.ejs',{message: message});
        }
                
     });
  } 
};

exports.homepageMTaarten = function(req, res, next){
  res.render('homepageMTaarten.ejs');
};

exports.homepageMTaartenAdmin = function(req, res, next){
           
  var user =  req.session.user,
  userId = req.session.userId;
  console.log('Gebruiker='+userId);
  if(userId == null){
     res.redirect("login");
     return;
  }
  
  var sql  = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players
  var sql5 = "";
  var sql1 = "SELECT achternaam, telefoonnummer, adres, email, typetaart, aantalpersonen, smaak, vulling, opmerking, prijs, reedsVoldaan, nogTeVoldoen, DATE_FORMAT(now(), '%d-%m-%Y') date, image, user_name FROM `players` ORDER BY id ASC;"
  var sql2 = "SELECT p.*, DATE_FORMAT(date, '%d-%m-%Y') formatted_dateFROM `players` p ORDER BY id ASC";
  db.query(sql, function(err, result){
     res.render('homepageMTaartenAdmin', {players:result});    
     // console.log(result);
  });            
};

exports.bruidstaartenPage  = function(req, res, next){
  var sql  = "SELECT * FROM `bruidstaarten` ORDER BY id ASC"; // query database to get all the players
  db.query(sql, function(err, result){
    res.render('bruidstaartenPage', {bruidstaarten:result});
  });
};
 
exports.verjaardagsTaartenPage = function(req, res, next){
  var sql  = "SELECT * FROM `verjaardagstaarten` ORDER BY id ASC"; // query database to get all the players
  db.query(sql, function(err, result){
    res.render('verjaardagstaartenPage', {verjaardagstaarten:result});
  });
};

 exports.overOnsPage = function(req, res, next){
   res.render('overOnsPage.ejs');
 };

 exports.algemeenVoorwaardenPage = function(req, res, next){
  res.render('algemeenVoorwaardenPage.ejs');
};

exports.contactPage = function(req, res, next){
  res.render('contactPage.ejs', {
    message: ''
  });
};

 exports.verlovingsTaartenPage = function(req, res, next){
  var sql  = "SELECT * FROM `verlovingstaarten` ORDER BY id ASC"; // query database to get all the players
  db.query(sql, function(err, result){
    res.render('verlovingstaartenPage', {verlovingstaarten:result});
  });
};

 exports.logout = function(req,res){
   
  req.session.destroy(function(err) {
     res.redirect('/');
  })
};