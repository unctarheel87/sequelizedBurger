module.exports = (sequelize, DataTypes) => {
  const Burger = sequelize.define('burger', {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }  
  });
  
  Burger.associate = (models) => {
    Burger.hasMany(models.topping, { onDelete: 'cascade' })
    Burger.belongsTo(models.user)
  };
  
  return Burger;
};