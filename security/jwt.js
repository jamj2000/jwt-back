/** librería de encriptado */
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = 'json-back';
const VALIDEZ = "15m";

/** cifra el usuario durante un margen de tiempo */
exports.tokenGeneration = (user) => jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: VALIDEZ })

/** verifica al usuario a partir del token  */
exports.verify = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET)
  }
  catch(err){
    return false
  }
}