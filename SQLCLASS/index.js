const { faker } = require('@faker-js/faker');
const mysql = require('mysql');
const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'hritik2816'
});

let createRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ]
}

// let q = " INSERT INTO user (id, name, email, password) VALUES ?";
// let data = [];
// for (i = 1; i <= 100; i++) {
//   data.push(createRandomUser());
// }

app.get("/", (req, res) => {
  let q = "SELECT COUNT(*) FROM user";
  try {
    connection.query(q, (error, result) => {
      if (error) throw error;
      let count = result[0]["COUNT(*)"];
      res.render('home.ejs', { count });
    })
  } catch (error) {
    console.log('Error connecting to database:')
    res.send('SOMETHING WENT WRONG');

  }
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
})

// try {
//   connection.query(q, [data], (error, results) => {
//     if (error) throw error;
//     console.log(results);
//   });
// } catch (error) {
//   console.log('Error connecting to database: ', error);
// }

// connection.end();
