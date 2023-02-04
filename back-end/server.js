const express = require('express');
const app = express();
const port = 4000;
const db = require('./config/connectDB');



app.get('/api', (req, res) => {
  res.json({ "user": ["Jasim", "Sohaib"] });
}
);

app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
}
);