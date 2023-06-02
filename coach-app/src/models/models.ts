const sequelize = require('../db');

// Класс с помощу которого описываются типы того или инного поня
const { DataTypes, TEXT } = require('sequelize');
// Описываем модель пользователя
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    socetId: { type: DataTypes.STRING, unique: true },
  
});

const Masage = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    masage:{ type: DataTypes.STRING },
    author:{type: DataTypes.STRING},
    userId:{type: DataTypes.INTEGER},
    type:{type: DataTypes.STRING},
});





User.hasMany(Masage);
Masage.belongsTo(User);





module.exports = {
    User,
    Masage,

};
