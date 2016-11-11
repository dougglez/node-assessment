var express = require('express');
var bodyParser = require('body-parser');

var users = require('./users.json');

var port = 3000
var app = module.exports = express();
app.use(bodyParser.json());


//USES 1, 2, 11
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
});


// 3 and 4
app.get('/api/users/:parameter', function(req, res, next) {
	
  //4 get one user by id
  if (parseInt(req.params.parameter)) {
		var result = users.filter(function(user) {
			return user.id == req.params.parameter;
		});
	}
  // 3 - get all users, filtering by privilege
	else {
		var result = users.filter(function(user) {
			return user.type === req.params.parameter;
		})		
	}	
  result.length > 0 ? res.status(200).send(result) : res.status(404).send('User Not Found')  
});

// 5 Create a new user. Data from body. new incrementing id
app.post('/api/users', function(req, res){
	var anotherUser = {
		"id": (users[users.length-1].id)+1,
		"first_name": req.body.first_name,
		"last_name": req.body.last_name,
		"email": req.body.email,
		"gender": req.body.gender,
		"language": req.body.language,
		"age": req.body.age,
		"city": req.body.city,
		"state": req.body.state,
		"type": 'user',
		"favorites": req.body.favorites
	};
	users.push(anotherUser);
	res.status(200).send(anotherUser);
});

// 6 create a new user by type
app.post('/api/users/:priv', function(req, res){
	var moreUser = {
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
	users.push(moreUser);
	res.status(200).send(moreUser);
});

// 7 change a users language


app.post('/api/users/language/:userId', function(req, res, next) {
	var result = users.filter(function(user) {
		return user.id == req.params.userId
	})[0];
	result.language = req.body.language;
	res.status(200).send(result);
  console.log('result for 7', result);
  
})



app.listen(port, function(){
  console.log('listening on', port);
});