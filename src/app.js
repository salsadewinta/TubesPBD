const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

// Inisialisasi Express
const app = express();

// Menghubungkan ke MongoDB
mongoose.connect('mongodb://localhost:8181/dbsbux', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Terhubung ke MongoDB');
  })
  .catch((err) => {
    console.error('Kesalahan koneksi MongoDB:', err);
  });

// Menginisialisasi model Admin
const Admin = mongoose.model('Admin', {
  name: String,
  jumlah: String,
  menu: String,
  harga: String
});

// Mengatur view engine Handlebars
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// Menampilkan data admin dalam tabel
app.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.render('admin', { admins });
  } catch (err) {
    console.error('Kesalahan:', err);
    res.sendStatus(500);
  }
});

// Menjalankan server pada port 3000
app.listen(3000, () => {
  console.log('Server berjalan pada http://localhost:3000');
});
