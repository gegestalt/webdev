const bcrypt = require('bcryptjs');

const db = require('../data/database');

class User{
    constructor(email,password,fullname,street,postal,city){
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.address = {
            street:street,
            postalCode: postal,
            city: city

        };
        
    }
    signup(){
        bcrypt.hash(this.password,12).then(function(hashedPassword){
            this.password = hashedPassword;
        }).catch(function(error){
            console.log(error);
        });

        db.getDb().collection('users').insertOne({
            email: this.email,
            password: this.password,
            fullname: this.fullname,
            address: this.address
        })
        
    }
}
module.exports = User;