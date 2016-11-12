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
    // res.status(200).send(result)
	}	
  result.length > 0 ? res.status(200).send(result) : res.status(404).send('User Not Found')  
});

// 4 get one user by id
// app.get('/api/users/:id', function(req, res, next) {
//   var id = parseInt(req.params.id);
//     if(!users[id - 1]) {
//         res.status(404);
//       }
//     else {
//       res.status(200).send(users[id - 1]);
//     } 
// });


//another attempt at #4, not working either
// app.get('/api/users/:id', function(req, res, next){
//   if(req.params.id){
//   var index = req.params.id;
//   res.json(users[index]);
//   }
//   else {
//   res.status(404).json("messed up");
//   }
// });

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
  // console.log('result for 7', result);
  
});

// 8 add to users forum to users favorites
// app.post('/api/users/forums/:userId', function(req, res, next) {
//   var result = users.filter(function(user) {
// 		return user.id == req.params.userId
// 	})[0];
//   console.log('');
  
// 	result.favorites.push(req.body.add)
// 	res.status(200).send(result);
// });

// // 8 again
app.post('/api/users/forums/:id',function(req,res,next) {
  console.log('8');
  
  var userId = users.filter(function(value) {
    return (value.id == req.params.id);
  });
  console.log('8.2', );
  
  userId[0].favorites = req.body.add;
  res.json(userId);
});

// 9 remove a forum from users favorites
app.delete('/api/users/forums/:userId', function(req, res, next) {
	if (req.query.favorite) {
		var result = users.filter(function(user) {
		return user.id == req.params.userId
	})[0];
		var favorites = result.favorites;
		var query = req.query.favorite;
		var idx = favorites.indexOf(query);
		if (idx > -1) {
			favorites.splice(idx, 1);
			res.status(200).send(result);
		}
		else {
			res.send("favorite doesn't exist")
		}
	}
	else {
		res.send('missing paramater')
	}
})



// 10 delete a user 
app.delete('/api/users/:userId', function(req, res, next) {
	var result = users.filter(function(user) {
		return user.id !== parseInt(req.params.userId);
	});
	result.length < users.length ? (res.status(200).send(result), users = result) : res.status(404).send("User doesn't exist");
});

//11 is with 1 and 2

// 12 Update one user by id (put)

app.put('/api/users/:userId', function(req, res, next) {
	var result = users.filter(function(user) {
		return user.id == req.params.userId
	})[0];
	for (key in req.body) {
		result[key] = req.body[key];
	}
	res.status(200).send(result);
})


app.listen(port, function(){
  console.log('listening on', port);
});