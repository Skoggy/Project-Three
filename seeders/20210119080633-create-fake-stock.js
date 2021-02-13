'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    //  * Add seed commands here.
    //  *
    //  * Example:
    //  * await queryInterface.bulkInsert('People', [{
    //  *   name: 'John Doe',
    //  *   isBetaMember: false
    //  * }], {});
    await queryInterface.bulkInsert('stocktype', [{
      uuid: "209aaf0c-a226-40ab-aa62-d25e604c5b62",
      name: "Selection",
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: "b46ba1ed-2c52-4bcd-bbac-7ff786f0db8a",
      name: "Primary Metals",
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: "e2a37e34-7a16-470c-9df0-1ebf0457e85f",
      name: "Surdex Steel",
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: "d0d9a737-6749-444a-a2f9-8fb4923e794d",
      name: "CCA",
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: "b06ff9d4-51be-4314-9609-73a887330a25",
      name: "Micro Fasteners",
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: "540ee336-69e9-411d-9dfb-01eb41f67930",
      name: "AWE",
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('stocktype', null, {});
  }
};
