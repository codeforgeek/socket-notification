var express = require('express');
var app		= express();
var path	= require("path");
var mysql	= require("mysql");
var http	= require('http').Server(app);
var io		= require('socket.io')(http);
var router	= express.Router();

/* Creating POOL MySQL connection.*/

var pool    =    mysql.createPool({
      connectionLimit   :   100,
      host              :   'localhost',
      user              :   'root',
      password          :   '',
      database          :   'socketDemo',
      debug             :   false
});


var db      = require("./db");
var routes  = require("../Routes/")(router,mysql,pool);

app.use('/',router);

http.listen(3000,function(){
    console.log("Listening on 3000");
});

io.on('connection',function(socket){
	console.log('We have user connected !');
	socket.on('comment added',function(data){
		db.addComment(data.user,data.comment,mysql,pool,function(error,result){
			if (error) {
				io.emit('error');
			} else {
                socket.broadcast.emit("notify everyone",{user : data.user,comment : data.comment});
			}
		});
	});
});
