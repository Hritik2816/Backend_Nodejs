const { faker } = require('@faker-js/faker');
const mysql = require('mysql');
const express = required('express');
const app = express();

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
  res.send('Hello World');
});

app.listen(3000, () => {
  log('Server is running on port 3000');
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
