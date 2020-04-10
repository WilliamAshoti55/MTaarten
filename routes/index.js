
 
// exports.index = function(req, res){
//     var message = 'Rwar';
//   res.render('index',{message: message})
// },

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
  // else {
  //    res.render('index.ejs',{message: message});
  // }

};

// exports.signup = function(req, res){
//   message = '';
//   if(req.method == "POST"){
//     //post data
//   }else {
//     res.render('signup');
//   }
// };

exports.homepageMTaarten = function(req, res, next){
  res.render('homepageMTaarten.ejs');
};

// exports.homepageMTaarten = function(req, res){
//   message = 'AAAAAA';
//   res.render('homepageMTaarten', {message: message})
// };

exports.homepageMTaartenAdmin = function(req, res, next){
           
  var user =  req.session.user,
  userId = req.session.userId;
  console.log('ddd='+userId);
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

exports.logout = function(req,res){
   
  req.session.destroy(function(err) {
     res.redirect('/');
  })
};

exports.bruidsTaartenPage = function(req, res, next){
   res.render('test.ejs');
 }