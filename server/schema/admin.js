/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: '0'
    },
    password: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'admin'
  });
};
