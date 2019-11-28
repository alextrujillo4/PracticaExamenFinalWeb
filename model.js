let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let userSchema = mongoose.Schema({
    name : {type : String},
    age : {type: Number},
    gender : {type: String},
    id : {  type : Number,
            required : true }
});

let UserDB = mongoose.model('UserDB', userSchema);

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
    post :  function(newUser){
        return UserDB.create(newUser) //insert in terminal bun mongoose is create
            .then(user => {
                return user;
            })
            .catch(err => {
                throw Error(err);
            });
    }
}

module.exports = { UserList };