const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
const app = express()
const port = 3002

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello Harry!')
})
//Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})