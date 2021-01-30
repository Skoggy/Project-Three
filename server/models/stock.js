'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Stocktype }) {
      // define association here
      this.belongsTo(Stocktype, { foreignKey: 'stocktypeId', as: 'stocktype' })

    }

  };
  Stock.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Stock must have a name" },
        notEmpty: { msg: "Stock must not be empty" }
      }
    },
    value: DataTypes.FLOAT,
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING
    },

    minAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  }, {
    sequelize,
    tableName: 'stock',
    modelName: 'Stock',
  });
  return Stock;
};