const bcrypt = require('bcryptjs');
const db = require('../data/database');

class User {
    constructor(email, password, fullname, street, postal, city) {
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.address = {
            street: street,
            postalCode: postal,
            city: city
        };
    }

    async signup() {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 12);
            this.password = hashedPassword;

            await db.getDb().collection('users').insertOne({
                email: this.email,
                password: this.password,
                fullname: this.fullname,
                address: this.address
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = User;
