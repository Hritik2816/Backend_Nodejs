const mongoose = require('mongoose');

main()
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
})

const User = mongoose.model('User', userSchema);
const Employee = mongoose.model('Employee', userSchema);

// User.find({ age: { $eq: 23 } }).then(res => console.log(res));

User.findById('67d7e434f3dd210b1f3e5744')
  .then(res => console.log(res));


// User.insertMany([
//   { name: 'Adam', email: "adma@gmail.com", age: 23 },
//   { name: 'Eve', email: "eve2626@gmail.com", age: 26 },
// ]).then((data) => {
//   console.log(data);
// })

// const user1 = new User({
//   name: 'John',
//   email: 'john27@gmail.com',
//   age: 27
// })

// user1
//   .save()
//   .then((res) => {
//     console.log('User saved', res)
//   })
//   .catch(err => console.log(err));