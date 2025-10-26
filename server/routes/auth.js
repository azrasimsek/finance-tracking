const express = require('express');
const router = express.Router();
const index = require('../models/index');
const sequelize = require('../config/db');
const upload = require('../config/multerConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Daha sonra bak buraya !!
const dotenv = require('dotenv');
dotenv.config();


// Route tanımlamaları
router.get('/', (req, res) => {
    res.json({ message: 'auth routes working' });
});
// login route
router.get("/login" , (req , res)=> {
    res.send("Login route çalışıyor.");
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await index.User.findOne({ where: { email } });
        // Kullanıcı yoksa
        if (!user) {
            return res.status(401).json({ 
                message: "Geçersiz email veya şifre"
            });
        }
        // Şifre karşılaştırması yap
        const isValidPassword = await bcrypt.compare(password, user.password);
        // Şifre yanlışsa
        if (!isValidPassword) {
            return res.status(401).json({ 
                message: "Geçersiz email veya şifre"
            });
        }
        // Giriş başarılı
        const accessToken = jwt.sign(
            { id: user.id, author: user.author},
            process.env.TOKEN_SECRET,
            { expiresIn: '1h'}
        );
        const refreshToken = jwt.sign(
            { id: user.id }, // Refresh Token'da sadece ID tutmak yeterli ve daha güvenli.
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' } // 7 gün
        );
        await index.User.update(
            { refresh_token: refreshToken },
            { where: { id: user.id } }
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // JavaScript ile erişilemez
            secure: process.env.NODE_ENV === 'production', // Üretimde HTTPS gerektirir
            sameSite: 'strict', // CSRF riskini azaltmak için
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 gün (milisaniye)
        });

        return res.status(200).json({ 
            message: "Giriş başarılı",
            accessToken, // Frontend'e gönderilen token
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                user_photo: user.user_photo
            }
        });
    } 
    catch (error) {
        console.error("Login hatası:", error);
        return res.status(500).json({ 
            message: "Kayıt işlemi sırasında bir hata oluştu."
        });
    }
});
// register route
router.get("/register", (req,res) => {
    res.send("register route çalışıyor.");
});
router.post("/register", upload.single("user_photo") , async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const user_photo = req.file ? req.file.filename : 'default.jpg';
    const gender = req.body.gender || 'not_specified';
    const birth_date = req.body.birth_date;
    const phone = req.body.phone;

    try {
        // Kullanıcı zaten var mı kontrol et
        const existingUser = await index.User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "Bu email zaten kayıtlı" });
        // Yeni kullanıcı oluştur
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await index.User.create({
            name,
            email,
            password : hashedPassword,
            user_photo,
            gender,
            birth_date,
            phone
        });
        res.status(201).json({ message: "Kayıt başarılı" , user: newUser});

    } catch (error) {
        console.error("register hatası:", error);
        res.status(500).json({ message: "Kayıt işlemi sırasında bir hata oluştu."});
    }
});
// logout route 
router.post("/logout", (req, res) => {
    res.send("post logout route.");
});
// password reset route
router.get("/reset-password", (req, res )=> {
    res.send("get reset password route");
});
router.post("/reset-password", (req, res )=> {
    res.send("post reset password route");
});
// admin page route
router.get("/admin", (req, res)=> {
    res.send("admin route çalışıyor");
});

module.exports = router;