module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [5, 20]
    }
  });
  return User;
};