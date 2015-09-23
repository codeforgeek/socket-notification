var addComment = function(user,comment,mysql,pool,callback) {
	var self = this;
	pool.getConnection(function(err,connection){
		if (err) {
			connection.release();
			return callback(true,null);
		} else {
			var sqlQuery = "INSERT into ?? (??,??,??) VALUES ((SELECT ?? FROM ?? WHERE ?? = ?),?,?)";
			var inserts = ["UserComment","UserId","UserName","Comment","UserId","User","UserName",user,user,comment];
			sqlQuery = mysql.format(sqlQuery,inserts);
			connection.query(sqlQuery,function(err,rows){
				connection.release();
				if (err) {
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
};

module.exports.addComment = addComment;
