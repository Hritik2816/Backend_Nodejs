const mongoose = require('mongoose');

main()
  .then(() => {
    console.log('Connection to the database is successful');
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}

const Chat = require('./models/chat.js')

const allChat = ([
  {
    from: 'Alice',
    to: 'Bob',
    msg: 'Hello Bob',
    created_at: new Date()
  },
  {
    from: 'Bob',
    to: 'Alice',
    msg: 'Hello Alice',
    created_at: new Date()
  },
  {
    from: 'Alice',
    to: 'Bob',
    msg: 'How are you?',
    created_at: new Date()
  },
  {
    from: 'Bob',
    to: 'Alice',
    msg: 'I am fine',
    created_at: new Date()
  },
  {
    from: 'Alice',
    to: 'Bob',
    msg: 'Good to hear that',
    created_at: new Date()
  },
  {
    from: 'Bob',
    to: 'Alice',
    msg: 'How about you?',
    created_at: new Date()
  }
])

Chat.insertMany(allChat);