// ⚠️ TP10 : secrets retirés, lus depuis l'environnement (variables d'env).
// Ces valeurs n'ouvrent aucun accès réel.
module.exports = {
  port: 3000,
  jwt_secret: process.env.JWT_SECRET,
  payment_api_key: process.env.PAYMENT_API_KEY,
  db_password: process.env.DB_PASSWORD,
};
