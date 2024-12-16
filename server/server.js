const dotenv = require('dotenv').config({ path: '.env.local' });
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

//connect to the database
connectDB();

const app = express();

// very important for cross origin to make requests from the frontend, cors. Learnt this lesson already.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create a simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the server' });
});

app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
