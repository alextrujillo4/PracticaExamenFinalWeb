let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let userSchema = mongoose.Schema({
    name : {type : String},
    age : {type: Number},
    gender : {type: String},
    id : {  type : Number,
            required : true }
});

let UserDB = mongoose.model('User', userSchema);

let UserList = {
    get : function(){
        return UserDB.find()
                .then(users => {
                    return users;
                })
                .catch(err => {
                    throw Error(err);
                });

    },
    post : function( newUser ){
		return UserDB.create( newUser )
				.then( user => {
					return user;
				})
				.catch( error => {
					throw Error(error);
				});
    }
}

module.exports = { UserList };