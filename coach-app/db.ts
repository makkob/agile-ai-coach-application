
import { Sequelize } from 'sequelize'

// Зчитування значень змінних середовища
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Ініціалізація об'єкту Sequelize
// const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
//   host: DB_HOST,
//   port: parseInt(DB_PORT, 10),
//   dialect: "mariadb",
  

//   // Додаткові параметри налаштування
// });



const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
dialect:"mariadb",
port:parseInt(DB_PORT, 10)})

// Експорт об'єкту sequelize для використання в інших частинах коду
export  {sequelize} ;
