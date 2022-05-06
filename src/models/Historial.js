const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  sequelize.define('historial', 
  {

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    horario: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    tipo:{
        type: DataTypes.ENUM('tipo0','tipo1','tipo2','tipo3'),
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