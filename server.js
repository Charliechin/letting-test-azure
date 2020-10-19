const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

const db = require('./models');

// Connect DB
// db
//   .authenticate()
//   .then(() => console.log('Connected'))
//   .catch(err => console.log('Error', err));


// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running'));

// Define users, keeping endpoints resful
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/properties', require('./routes/api/properties'));
app.use('/api/profile', require('./routes/api/profile'));

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  })
}).catch(err => {
  console.log(err);
});