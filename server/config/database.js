const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresusermanagement', 'postgresusermanagement_user', '2rvHAAgQwLz7WnKowSKXZxE5sMQBaoOa', {
  host: 'dpg-d00jbiqdbo4c73945n10-a.oregon-postgres.render.com',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
});

module.exports = sequelize;

