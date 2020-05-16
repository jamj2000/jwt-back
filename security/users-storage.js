const { Usuario } = require("../models.js");



class UserStorage {

  constructor() {
    this.users = [];
    this.getUsers();
  }


  getUsers() {
    Usuario.find({}, (err, data) => {
      if (err) console.log("Error: " + err);
      else {
        this.users = data.slice();
        console.log(this.users);
      }
    });
  }


  chekEmailInUse(email) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email) {
        return true;
      }
    }
    return false;
  }

  userExists(user) {
    for (let i = 0; i < this.users.length; i++) {
      if (user.email === this.users[i].email && user.password === this.users[i].password) {
        return true;
      }
    }
    return false;
  }

}

module.exports = (user) => {
  userStorage = new UserStorage();
  //userStorage.registerUser(user);
  return userStorage;
}

