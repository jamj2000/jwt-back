const { Usuario } = require("./models.js");


class UserStorage {

  constructor() {
    this.users = [];
    this.getUsers();
  }

  // Consultamos usuarios de la Base de Datos.
  getUsers() {
    Usuario.find({}, (err, data) => {
      if (err) console.log("Error: " + err);
      else this.users = data.slice();
    });
  }


  userExists(user) {
    this.getUsers();
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

