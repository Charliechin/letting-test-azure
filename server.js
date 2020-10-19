const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

const connectDB = require('./config/db');

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running'));

// Define users, keeping endpoints resful
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/properties', require('./routes/api/properties'));
app.use('/api/profile', require('./routes/api/profile'));

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));