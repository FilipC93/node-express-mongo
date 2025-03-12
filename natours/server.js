const mongoose = require('mongoose');
//?If you want to run nodemon locally run the following:
//* npx nodemon server.js OR npm start
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((connection) => {
    console.log(connection.connections);
    console.log('connection successful');
  });
const app = require('./app');

//* Server start
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express app running on port ${port}`);
});
