'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('statisticduolingos',{
      id:{
        type:Sequelize.BIGINT,
         allowNull:false,
         autoIncrement:true,
         primaryKey:true,
      },

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
