var path = require("path");

module.exports = function(router,mysql,pool) {
    router.get('/',function(req,res){
    	res.sendFile(path.join(__dirname,'../Client','/index.html'));
    });

    router.get('/getStatus',function(req,res){
    	pool.getConnection(function(err,connection){
    		if (err) {
    			connection.release();
    			return res.json({"error" : true,"message" : "Error in database."});
    		} else {
    			var sqlQuery = "SELECT * FROM ??";
    			var inserts = ["UserPost"];
    			sqlQuery = mysql.format(sqlQuery,inserts);
    			connection.query(sqlQuery,function(err,rows){
    				connection.release();
    				if (err) {
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
};
