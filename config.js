module.exports = {
    // CONSTANTES DE CONEXIÓN
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || 'mongodb://localhost/datos',

    // CONSTANTES DE AUTENTICACIÓN
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'json-back',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh',
    VALIDEZ: "1m"
}