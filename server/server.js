const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const User = require('./models/User'); 
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });

