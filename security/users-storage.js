const { Usuario } = require("../models.js");



class UserStorage {

  constructor() {
    this.users = [];
    this.getUsers();
  }

  // registerUser(user) {
  //   if(user && user.email && user.password) {
  //     if(! this.chekEmailInUse(user.email)) {
  //       this.users.push(user);
  //       return true;
  //     }
  //   }
  //   return false;
  // } 

  getUsers() {
    Usuario.find({}, (err, data) => {
      if (err) console.log("Error: " + err);
      else {
        this.users = data.slice();
        console.log(this.users);
      }
    });
  }

  // async registerUser(user) {
  //   if (user && user.email && user.password) {
  //     if ( existeUsuario(user) ) return false;
  //     const usuario = new Usuario(user);
  //     await usuario.save((err, data) => {
  //       if (err) {
  //         console.log("Error: " + err); 
  //         console.log('User not signed in');
  //         res.status(401).send('User not signed in');
  //         res.send();
  //         return false; 
  //       }
  //       else { 
  //         this.users.push(user); 
  //         console.log('User signed in');
  //         res.status(201).json('User signed in successfully');
  //         return true; }
  //     });
  //   }
  // }

  chekEmailInUse(email) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email) {
        return true;
      }
    }
    return false;
  }

  userExists(user) {
    if (this.users.filter(u => u.email === user.email
      && u.password === user.password).length)
      return true;
    else return false;
    // for (let i = 0; i < this.users.length; i++) {
    //   if (user.email === this.users[i].email && user.password === this.users[i].password) {
    //     return true;
    //   }
    // }
    // return false;
  }

}

module.exports = (user) => {
  userStorage = new UserStorage();
  //userStorage.registerUser(user);
  return userStorage;
}

