'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users',{
      id:{
        type:Sequelize.BIGINT,
         allowNull:false,
         autoIncrement:true,
         primaryKey:true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password must be given" },
        },
      },
      is_staff: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_premium: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      premium_expiry_date: {
        type: "TIMESTAMP",
        allowNull: true,
      },
      subscription_type: {
        type: Sequelize.TEXT("tiny"),
        defaultValue: "FREE",
      },
      accessToken: {
        type: Sequelize.STRING,
        allowNull: true,
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
