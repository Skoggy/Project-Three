

module.exports = function (sequelize, DataTypes) {
    const StockType = sequelize.define("StockType", {
        name: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     len: [1]
            // }
        }

    })
    StockType.associate = function (models) {
        StockType.hasMany(models.Stock, {
            onDelete: "cascade"
        })
    }
    return StockType
}