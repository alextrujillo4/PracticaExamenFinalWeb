const express =  require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uuidv4 = require('uuid/v4');

let { UserList } = require('./model');
const { DATABASE_URL, PORT } = require( './config' );

let app = express();
let jsonParser = bodyParser.json();
mongoose.Promise = global.Promise;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    if (req.method === "OPTIONS") {
      return res.send(204);
    }
    next();
  });


app.use(express.static("public"));
app.use(morgan( "dev" ) );

//=================================
//---------------CODE--------------
//=================================





app.get("/api/getAll", (req, res) => {
    UserList.get()
		.then( users => {
            res.statusMessage = ""
            res.statusMessage = "All Done!"
            return res.status(200).json({
                message : "User GetAll Succesfully",
                status : 200,
                data:users
            } );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
})


//=================================
//---------------CODE--------------
//=================================
/*let users = [
    {
        id: uuidv4(),
        name: "Alex",
        age: 22,
        gender : "M"
    },
    {
		id: uuidv4(),
        name: "Esthephany",
        age: 22,
        gender : "F"
    }
];
function deleteUser(idl){
    for (var i =0; i < users.length; i++){
        console.log(users[i].id === idl)
        if (users[i].id === idl) {
            users.splice(i,1);
            return;
        }
    }
}

app.get("/api/getAll", (req, res) => {
    res.statusMessage = "All Done!"
    return res.status(200).json({
        message : "User GetAll Succesfully",
        status : 200,
        data : users
    });
})


/*app.post( "/api/postUser", jsonParser, ( req, res, next ) => {
    let user =req.body.user;
    console.log(user)
    user.id = uuidv4();
    let data = [];
    data.push(user)
    res.statusMessage = "User Created!"
    users.push()
    return res.status(200).json({
        message : "User Created Succesfully",
        status : 200,
        data: data
    });
});

app.delete("/api/delete/:id", jsonParser, ( req, res, next ) => {
    let par = req.params.id;
    console.log(par)
    deleteUser(par)
    res.statusMessage = "User Deleted!"
    return res.status(200).json({
        message : "User Deleted Succesfully",
        status : 200
        });
});

*/
//=================================
//------------END CODE-------------
//=================================
let server;
function runServer(port, databaseUrl){
	return new Promise( (resolve, reject ) => {
		mongoose.connect(databaseUrl, response => {
			if ( response ){
				return reject(response);
			}else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				}).on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then(() => {
			return new Promise((resolve, reject) => {
				console.log('Closing the server');
				server.close( err => {
					if (err){
						return reject(err);
					}
					else{
						resolve();
					}
				});
			});
		});
}

runServer( PORT, DATABASE_URL )
	.catch( err => {
		console.log( err );
	});

module.exports = { app, runServer, closeServer };


