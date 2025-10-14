const User = require('./User');
const Transaction = require('./Transaction');
const Categories = require('./Categories');
const Exchange_Rate = require('./Exchange_Rate');


// User ve Transaction arasında bire çok ilişki
User.hasMany( Transaction, { foreignKey: 'user_id', onDelete: 'CASCADE'});
Transaction.belongsTo( User, { foreignKey: 'user_id'});

// Categories ve Transaction arasında bire çok ilişki
Categories.hasMany( Transaction, { foreignKey: 'category_id'});
Transaction.belongsTo( Categories, { foreignKey: 'category_id'});

module.exports = { User, Transaction, Categories, Exchange_Rate};