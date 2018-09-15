module.exports = (sequelize, DataTypes) => {
  const Topping = sequelize.define('topping', {
    topping_name: DataTypes.STRING
  });

  Topping.associate = (models) => {
    Topping.belongsTo(models.burger);
  };

  return Topping;
};