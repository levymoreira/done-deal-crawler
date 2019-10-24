const Sequelize = require('sequelize')

const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'mysql',
    host: DB_HOST,
    logging: true
})

class Photos extends Sequelize.Model { }
Photos.init({
    id: { type: Sequelize.INTEGER, primaryKey: true },
    adsId: { type: Sequelize.INTEGER },
    large: Sequelize.STRING,
    largeWebp: Sequelize.STRING,
    medium: Sequelize.STRING,
    mediumWebp: Sequelize.STRING,
    name: Sequelize.STRING,
    small: Sequelize.STRING,
    small2: Sequelize.STRING,
    small2Webp: Sequelize.STRING,
    smallWebp: Sequelize.STRING,
    sortOrder: Sequelize.INTEGER,
    xLarge: Sequelize.STRING,
    xLargeWebp: Sequelize.STRING
}, { sequelize, modelName: 'photos', tableName: 'photos' })

class Ads extends Sequelize.Model { }
Ads.init({
    id: { type: Sequelize.INTEGER, primaryKey: true },
    age: Sequelize.STRING,
    campaign: Sequelize.INTEGER,
    county: Sequelize.STRING,
    currency: Sequelize.STRING,
    description: Sequelize.STRING,
    friendlyUrl: Sequelize.STRING,
    greenlightVerified: Sequelize.BOOLEAN,
    header: Sequelize.STRING,
    logo: Sequelize.STRING,
    mediaCount: Sequelize.INTEGER,
    newCar: Sequelize.BOOLEAN,
    keyInfo: Sequelize.JSON,
    oldPrice: Sequelize.STRING,
    showOldPrice: Sequelize.BOOLEAN,
    containsSubsections: Sequelize.BOOLEAN,
    displayName: Sequelize.STRING,
    name: Sequelize.STRING,
    subdomain: Sequelize.STRING,
    title: Sequelize.STRING,
    sellerId: Sequelize.INTEGER,
    adCount: Sequelize.INTEGER,
    county: Sequelize.STRING,
    countyTown: Sequelize.STRING,
    name: Sequelize.STRING,
    otherAds: Sequelize.BOOLEAN,
    registrationDate: Sequelize.STRING,
    type: Sequelize.STRING,
    price: Sequelize.STRING
}, { sequelize, modelName: 'ads', tableName: 'ads' })

// sequelize.sync({
//     force: true
// })

module.exports = {
    Ads, Photos, sequelize
}


