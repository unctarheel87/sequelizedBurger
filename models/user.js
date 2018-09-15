const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    } 
  });

  User.associate = (models) => {
    User.hasMany(models.burger)
  };

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
  };

  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, 10)
  })
  
  return User;
}