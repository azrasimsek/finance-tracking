const multer = require('multer');
const path = require('path');

// --- DEPOLAMA AYARLARI (Mutlak Yol Kullanımı) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // __dirname: /server/config
        // '..': /server
        // 'public', 'img': /server/public/img
        const uploadPath = path.join(__dirname, '..', 'public', 'img'); 
        
        // Not: Eğer klasör yoksa, Node.js otomatik oluşturmaz. 
        // Kullanmadan önce bu klasörün var olduğundan emin olun.
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Dosya adı: rastgele_sayi-timestamp.uzanti
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// --- DOSYA FİLTRESİ ---
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Yalnızca resim dosyaları yüklenebilir!'), false);
    }
};

// --- MULTER MİDDLEWARE'İ (EXPORT EDİLECEK OBJEMİZ) ---

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // max 5MB
    }
});

module.exports = upload; // Upload objesini export et!