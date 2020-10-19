module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('User', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usersInterested: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  });
  return Property;
};