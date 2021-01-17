module.exports = function (sequelize, DataTypes) {
    const Stock = sequelize.define("Stock", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
            }
        }
    })
    Stock.associate = function (models) {
        Stock.belongsTo(models.StockType, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Stock
}