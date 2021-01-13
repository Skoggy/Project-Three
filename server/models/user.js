module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            vaildate: {
                len: [8]

            }
        }
    })
    return User;
}