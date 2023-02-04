const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 4000;
const db = require('./config/connectDB');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);



app.get('/api', (req, res) => {
  db.query('SELECT * FROM users', (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
}
);