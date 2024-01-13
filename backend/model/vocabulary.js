module.exports = (sequelize, Sequelize) => {
  const Vocabulary = sequelize.define("vocabulary", {
    level: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Question needs to have a Level" },
      },
      defaultValue: 1,
    },
    total_tested:{
      type:Sequelize.BIGINT,
      defaultValue:0,
      allowNull: true
    },
    type:{
      type: Sequelize.INTEGER ,
      defaultValue:1,
      allowNull: false,
      validate: {
        notNull: { msg: "Question needs to have a Type" },
      },
    },
    inner_type:{
      type: Sequelize.INTEGER ,
      defaultValue:11,
      allowNull: false,
      validate: {
        notNull: { msg: "Question needs to have a inner_type" },
      },
    },
    time:{
      type:Sequelize.DECIMAL(10, 2),
      defaultValue:2,
      allowNull: false,
      validate: {
        notNull: { msg: "Question needs to have a Time" },
      },

    },
    qa:{
      type:Sequelize.JSON,
      allowNull: false,
      validate: {
        notNull: { msg: "Question Needs to Provided" },
      },
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },

  });

  return Vocabulary;
};

// const mongoose = require("mongoose");

// const vocabularySchema = new mongoose.Schema({
//   level: {
//     type: Number,
//     required: [true, "Please enter Question Level"],
//     defaultValue: 1,
//     min: 1,
//   },
//   total_tested: {
//     type: Number,
//     required: false,
//   },
//   type: {
//     type: Number,
//     required: [false, "Please enter Question Type"],
//     defaultValue: 1,
//   },
//   inner_type: {
//     type: Number,
//     required: [false, "Please enter Question inner Type"],
//     defaultValue: 11,
//   },
//   time: {
//     type: Number,
//     required: [true, "Please enter Question Time"],
//   },
//   qa: {
//     type: Object,
//     required: [true, "Please enter Question Property"],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
// });

// module.exports = mongoose.model("Vocabulary", vocabularySchema);
