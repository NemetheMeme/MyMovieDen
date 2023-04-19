const crypto = require('crypto');
const util = require('util');
const scrypt = util.promisify(crypto.scrypt); 


class DatabaseUtils{
randomId(){
    return crypto.randomBytes(8).toString('hex'); 
}

 generateRandomSalt(){
     return crypto.randomBytes(2).toString('hex');
}

 async comparePasswords(inputPassword, savedPassword){
    const [hashed, salt] = savedPassword.split('.');
    const hashedPasswordToBeComapredWith = await scrypt(inputPassword, salt, 32);

    return hashedPasswordToBeComapredWith === hashed;
}

 async generateEncryptedPassword(password){
    const salt = this.generateRandomSalt();
    const buf = await scrypt(password, salt, 32);

        return `${buf.toString('hex')}.${salt}`;
}

}

module.exports = new DatabaseUtils;
