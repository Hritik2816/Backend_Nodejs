const express = require('express')
const app = express()

app.use((req, res) => {
  console.log("This is middleware function");
  res.send("Middleware is finished")
})

app.get('/', (req, res) => {
  res.send("This is root")
})

app.get('/random', (req, res) => {
  res.send("This is random page")
})

app.listen(3000, () => {
  console.log("All there middleware working");

})