module.exports = (sequelize, Sequelize) => {
  const StatisticD = sequelize.define("statisticduolingo", {
    user: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    qn: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },

    level: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Question needs to have a Level" },
      },
      defaultValue: 1,
    },
    type:{
      type: Sequelize.INTEGER ,
      allowNull: false,
      validate: {
        notNull: { msg: "Question needs to have a Type" },
      },
    },
    inner_type:{
      type: Sequelize.INTEGER ,
      allowNull: false,
      validate: {
        notNull: { msg: "Question needs to have a inner_type" },
      },
    },
    time:{
      type:Sequelize.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: { msg: "Question needs to have a Time" },
      },
    },
    result:{
      type:Sequelize.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: { msg: "Result needs to provide" },
      },
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  return StatisticD;
};
