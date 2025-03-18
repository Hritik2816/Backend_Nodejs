const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js')
const methodOverride = require('method-override')


app.set('views', path.join(__dirname, "views"))
app.set('view engine', "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

main()
  .then(() => {
    console.log('Connection to the database is successful');
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}

// const chat1 = new Chat({
//   from: 'Alice',
//   to: 'Bob',
//   msg: 'Hello Bob',
//   created_at: new Date()
// })
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   })

app.get('/chats', async (req, res) => {
  const chats = await Chat.find()
  console.log(chats);
  res.render('index.ejs', { chats })
})

app.get('/chats/new', (req, res) => {
  res.render('new.ejs')
})

app.post('/chats', (req, res) => {
  let { from, msg, to } = req.body
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date()
  })
  newChat.save()
    .then((result) => {
      console.log("Chat saved");
    })
    .catch((err) => {
      console.log(err);
    })
  res.redirect('/chats')
})

app.get('/chats/:id/edit', async (req, res) => {
  let { id } = req.params
  const chat = await Chat.findById(id)
  res.render('edit.ejs', { chat })
})


app.put('/chats/:id', async (req, res) => {
  let id = req.params.id;
  let { msg: newMsg } = req.body;
  const newChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true }, { new: true })
  console.log(newChat);
  res.redirect('/chats')
})


app.delete('/chats/:id', (req, res) => {
  let { id } = req.params;
  Chat.findByIdAndDelete(id)
    .then(() => {
      console.log("Chat deleted");
    })
    .catch((err) => {
      console.log(err);
    })
  res.redirect('/chats')
})

app.get('/', (req, res) => {
  res.send('Server is working')
})

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});