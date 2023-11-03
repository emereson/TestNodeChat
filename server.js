require('dotenv').config();
const { server } = require('./app');
const { db } = require('./database');

db.authenticate()
  .then(() => console.log('Database Authenticated 👍'))
  .catch((error) => console.log(error));

db.sync()
  .then(() => console.log('Database Synced! 🤩'))
  .catch((error) => console.log(error));

const port = +process.env.PORT || 3030;

server.listen(port, () => {
  console.log(`App running on port ${port}`);
});
