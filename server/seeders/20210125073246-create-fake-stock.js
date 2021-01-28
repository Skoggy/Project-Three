'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('stock', [{
      uuid: "209aaf0c-a226-40ab-aa62-d25e604c4b62",
      name: "5mm Screw",
      value: 0.1,
      amount: 1000,
      minAmount: 1000,
      stockTypeId: 5,
      note: "There were 10 damaged in the box",
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: "209aaf0c-a226-40ab-aa62-d25e604c5b62",
      name: "10mm Screw",
      value: 0.2,
      amount: 1000,
      minAmount: 1000,
      stockTypeId: 5,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: "a1d9b91e-0239-426f-afde-8d3b351d2605",
      name: "2mm Steel",
      value: 55.50,
      amount: 66,
      minAmount: 66,
      stockTypeId: 1,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: "a1d9b91e-0239-426f-afde-8d3b351e1605",
      name: "3mm Steel",
      value: 85.00,
      amount: 2,
      minAmount: 1,
      stockTypeId: 1,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: "a1d9b91e-0239-426f-afde-8d3b351d1615",
      name: "1.2mm Steel",
      value: 40,
      amount: 30,
      minAmount: 30,
      stockTypeId: 1,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: "11eef238-794f-4044-9132-9f21a59e7a53",
      name: "3mm Aluminium",
      value: 120.00,
      amount: 6,
      minAmount: 5,
      stockTypeId: 2,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: "11eef238-794f-4044-9132-9f21a59e7b53",
      name: "5mm Aluminium",
      value: 200.00,
      amount: 2,
      minAmount: 1,
      stockTypeId: 2,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: "11eef238-794f-4044-9132-9f21a59e7b53",
      name: "75mmX40mm C Channel",
      value: 90,
      amount: 6,
      minAmount: 6,
      stockTypeId: 3,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: "11eef238-794f-4044-9132-9f21a69e7b53",
      name: "25mmX25mm RHS",
      value: 45,
      amount: 30,
      minAmount: 10,
      stockTypeId: 3,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },

    ], {});

  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     *   await queryInterface.bulkDelete('stocktype', null, {});
     */
    await queryInterface.bulkDelete('stock', null, {});
  }
};
