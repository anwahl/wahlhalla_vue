module.exports = (sequelize, Sequelize) => {
    const TaskType = sequelize.define("taskType", {
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.ENUM('CHORE','BILL','APPOINTMENT','LIST','OTHER'),
        allowNull: false
      }
    });
    return TaskType;
  };