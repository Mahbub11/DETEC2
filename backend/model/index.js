const dbConfig = require("../db/Database");
require("pg");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  // Live
  database: process.env.RDS_DB,
  username: "postgres",
  password:  process.env.RDS_DB_PASS,
  host:process.env.RDS_HOST,
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
        rejectUnauthorized: false
    }
  },
  //  Local
  // database: "practicemania",
  // username: "postgres",
  // password: "123456",
  // host: "host.docker.internal",
  // port: 5432,
  // dialect: "postgres",
    

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.interactiveReading = require("./interactiveReading")(sequelize, Sequelize);
db.reading = require("./reading")(sequelize, Sequelize);
db.listening = require("./listening")(sequelize, Sequelize);
db.writing = require("./writing")(sequelize, Sequelize);
db.speaking = require("./speaking")(sequelize, Sequelize);
db.vocabulary = require("./vocabulary")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.profile = require("./profile")(sequelize, Sequelize);
db.statisticDuolingo = require("./statisticD")(sequelize, Sequelize);


db.reading.hasMany(db.interactiveReading, { foreignKey: "rid", as: "interactivereadings" });
db.interactiveReading.belongsTo(db.reading, {
  foreignKey: "rid",
  as: "interactivereadings",
});



module.exports = db;
