var express = require("express");
var bodyParser = require("body-parser");

var users = require("./users.json");
var app = module.exports = express();

app.use(bodyParser.json());


// this solves 1 and 2
// app.get('/api/users', function(req, res, next) {
// 	var result = req.query.language ? users.filter(function(user) {
// 		return user.language === req.query.language;
// 	}) : users;

// 	res.status(200).send(result)
// });

// 1, 2, 11 (queries)
app.get('/api/users', function(req, res, next){
    var response = [];
    if (req.query.language) {
      for (var i = 0; i <users.length; i++) {
        if (req.query.language === users[i].language)
        response.push(users[i]);
      }
    } else if (req.query.age) {
      for (var i = 0; i <users.length; i++) {
        if (parseInt(req.query.age) === users[i].age)
        response.push(users[i]);
      }
    } else if (req.query.city) {
      for (var i = 0; i <users.length; i++) {
        if ((req.query.city.charAt(0).toUpperCase() + req.query.city.slice(1)) === users[i].city)
        response.push(users[i]);
      }
    } else if (req.query.state) {
      for (var i = 0; i <users.length; i++) {
        if ((req.query.state.charAt(0).toUpperCase() + req.query.state.slice(1)) === users[i].state)
        response.push(users[i]);
      }
    } else if (req.query.gender) {
      for (var i = 0; i <users.length; i++) {
        if ((req.query.gender.charAt(0).toUpperCase() + req.query.gender.slice(1)) === users[i].gender)
        response.push(users[i]);
      }
    } else {
        for (var i = 0; i <users.length; i++) {
        response.push(users[i]);
        }
    }
    res.status(200).json(response);
  })


//this solves 3 and 4
app.get('/api/users/:parameter', function(req, res, next) {
		if(!parseInt(req.params.parameter, 10)){
            var result = users.filter(function(user) {
			return user.type === req.params.parameter;
		    });
        } else {
            var result = users.filter(function(user){
            return user.id == req.params.parameter;
        });
    } 
    if(result.length > 0) {
      console.log(result)
        res.status(200).send(result[0])
    } else { 
        res.status(404).send('User Not Found')
    }
});

// 5
app.post("/api/users", function(req, res){
  var newGuy = {
    "id": (users[users.length-1].id)+1,
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "email": req.body.email,
    "gender": req.body.gender,
    "language": req.body.language,
    "age": req.body.age,
    "city": req.body.city,
    "state": req.body.state,
    "type": "user",
    "favorites": req.body.favorites
  };
  users.push(newGuy);
  res.status(200).send(newGuy);
});

// 6 and 7 work in postman, but don't pass the npm test'

// 6
app.post("/api/users/:priv", function(req, res){
  var newGuy = {
    "id": (users[users.length-1].id)+1,
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "email": req.body.email,
    "gender": req.body.gender,
    "language": req.body.language,
    "age": req.body.age,
    "city": req.body.city,
    "state": req.body.state,
    "type": req.param.priv,
    "favorites": req.body.favorites
  };
  users.push(newGuy);
  res.status(200).send(newGuy);
});

// 7
app.post('/api/users/language/:userId', function(req, res, next){
    var theUser
    console.log(req.body)
  users.forEach(function(val, i, arr){
    if(val.id == req.params.userId){
      val.language = req.body.language
      theUser = val    
    }
  })
  console.log(theUser)
  res.status(200).json(theUser)
  })

  

// 8
// app.post('/api/users/forums/:userId', function(req, res, next) {
// 	 for (var i = 0; i < users.length; i++){
//         if(users[i].id == req.params.userId){
//             users[i].favorites.push(req.body.add);
//             res.status(200).send(users[i]);
//         }
//     }
// });


// 9
app.delete('/api/users/:userId', function(req, res, next){
//   var index = req.params.id;
  users.splice(index, 1);
  res.json(users);
  res.sendStatus(204);

  for (var i = 0; i < users.length; i++){
      if (users[i].id == req.params.userId){
          users[i].favorites.splice()

      }
  }
});


// 10 
app.delete('/api/users/:id', function(req, res, next){
//   var index = req.params.id;
//   users.splice(index, 1);
//   res.json(users);
//   res.sendStatus(204);
var result = users.filter(function(user){

})
  if(result.length > 0) {
        res.status(200).send(result)
    } else { 
        res.status(404).send('User Not Found')
    }
});





app.listen(3000, function(){
    console.log('running on 3000');
});