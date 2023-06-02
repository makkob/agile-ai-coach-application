
import { Sequelize } from 'sequelize';

// Зчитування значень змінних середовища
const { DB_DIALECT, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

// Ініціалізація об'єкту Sequelize
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  dialect: DB_DIALECT,
  // Додаткові параметри налаштування
});

// Експорт об'єкту sequelize для використання в інших частинах коду
export { sequelize };
