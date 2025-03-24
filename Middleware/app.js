const express = require('express')
const app = express()

// app.use((req, res, next) => {
//   console.log("This is middleware function");
//   next()
// })

app.use((req, res, next) => {
  req.responseTime = new Date(Date.now()).toString()
  console.log(req.method, req.path, req.responseTime, req.hostname)
  next()
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