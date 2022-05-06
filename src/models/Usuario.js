const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  sequelize.define('usuario', 
  {

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    lenguajes:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull:true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

  });
};