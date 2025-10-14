const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000; // Dinamik port ataması
const sequelize = require('./config/db'); // Veritabanı bağlantısı
// const User = require('./models/User');
// const Categories = require('./models/Categories');
const index = require('./models/index'); // İlişkiler
// const Exchange_Rate = require('./models/Exchange_Rate');
// const Transaction = require('./models/Transaction');

// Routerlar
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

// body parser
app.use(express.json());

// Veritabanı bağlantısını test et
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Veritabanı bağlantısı başarılı.');
    } catch (error) {
        console.error('Veritabanı bağlantısı başarısız:', error);
    }
}


// Veritabanı tablolarını senkronize et (uygulama ilk açıldığında)
const syncDatabase = async () => {
  try {
    // Önce ana tablolar
    await index.User.sync();
    await index.Categories.sync();
    
    // Sonra foreign key içeren tablolar
    await index.Transaction.sync();
    await index.Exchange_Rate.sync();
    
    console.log('📦 Veritabanı tabloları başarıyla senkronize edildi');
  } catch (error) {
    console.error('❌ Senkronizasyon hatası:', error);
  }
};

// Diğer middleware'lerden sonra senkronizasyonu başlat
connectDB();
syncDatabase();

// Routerlar
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);


app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});