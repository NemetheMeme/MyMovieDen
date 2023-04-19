const usersRepo = require('../database/repository/users');

class UserService{

async register(user_info){
        console.log('Register service in progress...');
        await usersRepo.add(user_info);
}


}


module.exports = new UserService();