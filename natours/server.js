//?If you want to run nodemon locally run the following:
//* npx nodemon server.js OR npm start
const app = require('./app');
//* Server start
const port = 3000;
app.listen(port, () => {
  console.log(`Express app running on port ${port}`);
});
