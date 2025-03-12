const { faker } = require('@faker-js/faker');
const mysql = require('mysql');
const express = require('express');
const app = express();
const path = require('path');
const methodoverride = require('method-override');

app.use(methodoverride('_method'));
app.use(express.urlencoded({ extended: true }));
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

app.get("/user", (req, res) => {
  let q = "SELECT * FROM user";
  try {
    connection.query(q, (error, result) => {
      if (error) throw error;
      res.render('user.ejs', { users: result });
    })
  } catch (error) {
    console.log('Error connecting to database:')
    res.send('SOMETHING WENT WRONG');
  }
})



app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (error, result) => {
      if (error) throw error;
      console.log(result);
      res.render('edit.ejs', { result });
    })
  } catch (error) {
    console.log('Error connecting to database:')
    res.send('SOMETHING WENT WRONG');
  }
})


app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPassword, username: newUserName } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (error, result) => {
      if (error) throw error;
      let user = result[0];
      if (formPassword != user.password) {
        res.send('Password did not match');
      }
      else {
        let q2 = `UPDATE user Set name = '${newUserName}' WHERE id = '${id}'`;
        connection.query(q2, (error, result) => {
          if (error) throw error;
          res.redirect('/user');
        })
      }
    })
  } catch (error) {
    console.log('Error connecting to database:')
    res.send('SOMETHING WENT WRONG');
  }
})

app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = "SELECT * FROM user WHERE id = ?";
  connection.query(q, [id], (error, result) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).send('Error retrieving user');
      return;
    }
    if (result.length === 0) {
      res.status(404).send('User not found');
      return;
    }
    let user = result[0];
    res.render('delete.ejs', { user });
  });
});


app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPassword, username: newUserName } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (error, result) => {
      if (error) throw error;
      let user = result[0];
      if (formPassword != user.password) {
        res.send('Password did not match');
      }
      else {
        let q2 = `DELETE FROM user WHERE id = '${id}'`;
        connection.query(q2, (error, result) => {
          if (error) throw error;
          res.redirect('/user');
        })
      }
    });
  } catch (error) {
    console.log('Error connecting to database:')
    res.send('SOMETHING WENT WRONG');
  }
});


app.get("/createuser", (req, res) => {
  res.render('createNewUser.ejs');
})


app.post("/user", (req, res) => {
  let { username, email, password } = req.body;
  let id = faker.string.uuid(); // Generate a unique ID for the new user
  let q = "INSERT INTO user (id, name, email, password) VALUES (?, ?, ?, ?)";
  connection.query(q, [id, username, email, password], (error, result) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).send('Error creating user');
      return;
    }
    res.redirect('/');
  });
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
