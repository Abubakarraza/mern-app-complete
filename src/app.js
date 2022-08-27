const express = require('express');
const dotenv = require('dotenv');
//const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config({ path: './config.env' });
require('./db/conn');
const User = require('../src/model/userSchema');
const app = express();
app.use(cookieParser());
const port = process.env.PORT || 5000;
// we link the router file
app.use(require('./router/auth'));
app.use(express.json());
//app.use(cors);
if (process.env.NODE_ENV == 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
