const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  sequelize.define('repositorio', 
  {
      
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    fechaCreacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue : DataTypes.NOW,
    },
    nombre:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    lenguajes:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:true,
    },
    idUsuario:{
      type: DataTypes.UUID,
      references:{
        model:{tableName:'usuarios'},
        key:"id"
      },
      allowNull:false,
    },

  });
};