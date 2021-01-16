module.exports = function (sequelize, DataTypes) {
    const StockType = sequelize.define("StockType", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }

    })
    StockType.associate = function (models) {
        StockType.belongsTo(models.Stock, {
            foreignKey: {
                allowNull: false,
            },
        });
    }
    return StockType
}