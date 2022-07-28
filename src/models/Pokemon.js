const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    base_experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hp:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    special_attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    special_defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    habitat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shape: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    generation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    evolves_to: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    egg_groups: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    game_indices: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    moves: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    }
  }, { timestamps: false });
};
