const mongoose = require('mongoose');

main()
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
  }
})

const Books = mongoose.model('Books', bookSchema);

const book1 = new Books({
  title: 'The Alchemist',
  author: 'Paulo Coelho',
  price: 20
}).save()
  .then((res) => {
    console.log(res);
  })
  .catch(err => console.log(err));