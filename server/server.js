const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000; // Dinamik port ataması
const path = require('path');
const cors = require('cors');
const sequelize = require('./config/db'); // Veritabanı bağlantısı
const index = require('./models/index'); // İlişkiler
const cookieParser = require('cookie-parser');

// Routerlar
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Sadece uploads klasörünü /uploads yolu ile serve eder
app.use('/img', express.static(path.join(__dirname, 'public/img')));

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
    await index.User.sync({ alter: true});
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
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});