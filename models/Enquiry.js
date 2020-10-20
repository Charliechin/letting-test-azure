module.exports = (sequelize, DataTypes) => {
  const Enquiry = sequelize.define('Enquiry', {
    userId: {
      type: DataTypes.INTEGER,
      trim: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    propertyId: {
      type: DataTypes.INTEGER,
      trim: true,
      references: {
        model: 'Properties',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING,
    }

  });
  return Enquiry;
};


// Try in singular if db is not writing