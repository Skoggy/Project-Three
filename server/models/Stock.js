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
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {

            }
        }

    })


    return Stock
}