'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     const { INTEGER, DATE, STRING, TEXT } = Sequelize;
     await queryInterface.createTable('article', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      category_id: INTEGER,
      tag_id: INTEGER,
      user_id: INTEGER,
      title: STRING,
      summary: STRING,
      content: TEXT,
      created_at: DATE,
      updated_at: DATE
     });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('article');
  }
};
