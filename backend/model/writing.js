module.exports = (sequelize, Sequelize) => {
  const Writing = sequelize.define("writing", {
   
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
      defaultValue:2,
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
    image:{
      type:Sequelize.STRING,
      allowNull:true

    },
  
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },

  });

  return Writing;
};
