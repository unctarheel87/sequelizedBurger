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
    return bcrypt.compare(password, this.password);
  };

  User.hook("beforeCreate", function(user) {
    return bcrypt.hash(user.password, 10).then(hash => {
      user.password = hash
    });
  })
  
  return User;
}