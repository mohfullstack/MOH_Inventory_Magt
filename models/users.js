module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100]

      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 12]

      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 12]
      }
    }
  },
    
    {
  
      classMethods: {
        associate: function(models) {
          User.hasMany(models.Product, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return User;
};

