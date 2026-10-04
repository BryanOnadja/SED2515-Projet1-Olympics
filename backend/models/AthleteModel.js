import { Sequelize } from "sequelize";
import db from "../config/Database.js";

// Code écrit par moi
const { DataTypes } = Sequelize;

const Athlete = db.define('athletes_summer_games', {
    Name: DataTypes.STRING,
    Sex: DataTypes.STRING,
    Age: DataTypes.FLOAT,
    Team: DataTypes.STRING,
    NOC: DataTypes.STRING,
    Games: DataTypes.STRING,
    Year: DataTypes.INTEGER,
    Season: DataTypes.STRING,
    City: DataTypes.STRING,
    Sport: DataTypes.STRING,
    Event: DataTypes.STRING,
    Medal: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false 
});

export default Athlete;