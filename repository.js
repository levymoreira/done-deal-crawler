const Sequelize = require('sequelize')

const sequelize = new Sequelize('donedeal', 'root', 'watchroot', {
  dialect: 'mysql',
  host: ''
})

class Ads extends Sequelize.Model { }
Ads.init({
  id: {type: Sequelize.INTEGER, primaryKey: true},
  description: Sequelize.STRING
}, { sequelize, modelName: 'ads', tableName: 'ads' })

sequelize.sync({
    force: true
})

module.exports = {
    Ads
}

// class NotificationHistory extends Sequelize.Model { }
// NotificationHistory.init({
//   message: Sequelize.STRING
// }, { sequelize, modelName: 'notificationHistory', tableName: 'notificationHistory' });

