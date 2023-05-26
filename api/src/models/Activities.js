const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activities', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.ENUM("1","2","3","4","5"),
        allowNull: false,
    },
    duration: {
        type: DataTypes.ENUM("1","2","3","4","5","6","7","8","9","10"),
        allowNull: true,
    },
    season: {
        type: DataTypes.ENUM("Summer","Autum","Winter","Spring"),
        allowNull: false,
    },
  },
  {
    timestamps: false
  }
  
  );
};
