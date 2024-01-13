'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('interactivereading',{

      rid: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: "readings", key: "id" },
        onDelete: "CASCADE",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      explain: {
        type: Sequelize.STRING(600),
        allowNull: true,
      },
      inner_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Question needs to have a inner_type" },
        },
      },
      qa: {
        type: Sequelize.JSON,
        allowNull: false,
        validate: {
          notNull: { msg: "Question Needs to Provided" },
        },
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  

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
