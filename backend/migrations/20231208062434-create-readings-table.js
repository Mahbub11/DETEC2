'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('readings',{

      title:{
        type:Sequelize.STRING,
        allowNull:true,
      },
      explain:{
        type:Sequelize.STRING(600),
        allowNull:true,
      },
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
        defaultValue:3,
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
     
     
      createdAt:{
        allowNull:false,
        type:Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
       },
       updatedAt:{
        allowNull:false,
        type:Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
       }

    })
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
