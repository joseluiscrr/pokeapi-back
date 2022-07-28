const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('abilitie', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, { timestamps: false });
};
