const mongoose = require('mongoose')
const { Schema } = mongoose;

main()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  })

async function main() {
  mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo');
}

const userSchema = new Schema({
  username: String,
  address: [{
    location: String,
    city: String
  }]
})

const User = mongoose.model("User", userSchema)

// const addUser = async () => {
//   let User1 = new User({
//     username: "Hritik",
//     address: [{
//       location: "Black Street",
//       city: "London"
//     }]
//   })
//   User1.address.push({ location: "yellow park", city: "London" })
//   const result = await User1.save()
//   console.log(result);
// }

// addUser()
