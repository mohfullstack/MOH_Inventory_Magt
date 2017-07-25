module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 32]
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,

    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 5]
      }
    }
    
  },
    {
      classMethods: {
        associate: function(models) {
          Product.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Product;
};
