import { Sequelize } from "sequelize";

// Code écrit par moi 
const db = new Sequelize('olympics_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;