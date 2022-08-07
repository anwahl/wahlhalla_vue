module.exports = (sequelize, Sequelize) => {
    const Person = sequelize.define("person", {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      }
    });
    return Person;
  };