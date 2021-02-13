'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stocktype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Stock }) {
      // define association here
      this.hasMany(Stock, { foreignKey: 'stocktypeId', as: 'stocks' })
    }



  };
  Stocktype.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Stock provider must have a name" },
        notEmpty: { msg: "Stock provider must not be empty" }
      }
    }
  }, {
    sequelize,
    tableName: 'stocktype',
    modelName: 'Stocktype',
  });
  return Stocktype;
};