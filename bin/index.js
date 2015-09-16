var express	=	require('express');
var app		=	express();
var path	=	require("path");
var mysql	=	require("mysql");
var http	=	require('http').Server(app);
var io		=	require('socket.io')(http);
var router	=	express.Router();

/* Creating POOL MySQL connection.*/

var pool    =    mysql.createPool({
      connectionLimit   :   100,
      host              :   'localhost',
      user              :   'root',
      password          :   '',
      database          :   'socketDemo',
      debug             :   false
});

router.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

router.get('/getStatus',function(req,res){
	pool.getConnection(function(err,connection){
		if(err) {
			connection.release();
			return res.json({"error" : true,"message" : "Error in database."});
		} else {
			var sqlQuery = "SELECT * FROM ??";
			var inserts = ["UserPost"];
			sqlQuery = mysql.format(sqlQuery,inserts);
			connection.query(sqlQuery,function(err,rows){
				connection.release();
				if(err) {
					return res.json({"error" : true,"message" : "Error in database."});
				} else {
					res.json({"error" : false,"message" : rows});
				}
			});
		}
		connection.on('error', function(err) {
			return res.json({"error" : true,"message" : "Error in database."});
        });
	});
});

app.use('/',router);

io.on('connection',function(socket){
	console.log('We have user connected !');
	socket.on('comment added',function(data){
		addComment(data.user,data.comment,function(error,result){
			if(error) {
				io.emit('error');
			} else {
				io.emit("notify everyone",{user : data.user,comment : data.comment});
			}
		});
	});
});

var addComment = function(user,comment,callback) {
	var self = this;
	pool.getConnection(function(err,connection){
		if(err) {
			connection.release();
			return callback(true,null);
		} else {
			var sqlQuery = "INSERT into ?? (??,??,??) VALUES ((SELECT ?? FROM ?? WHERE ?? = ?),?,?)";
			var inserts = ["UserComment","UserId","UserName","Comment","UserId","User","UserName",user,user,comment];
			sqlQuery = mysql.format(sqlQuery,inserts);
			connection.query(sqlQuery,function(err,rows){
				connection.release();
				if(err) {
					return callback(true,null);
				} else {
					callback(false,"comment added");
				}
			});
		}
		connection.on('error', function(err) {
			return callback(true,null);
        });
	});
}

http.listen(3000,function(){
    console.log("Listening on 3000");
});
