require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const email = 'lamhamdi.aymane@mhabank.com';
  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Manager already exists');
    process.exit(0);
  }
  const hashed = await bcrypt.hash('Password123!', 10);
  const u = new User({
    nom: 'Lamhamdi',
    prenom: 'Aymane',
    role: 'manager',
    email,
    telephone: '0612345678',
    password: hashed
  });
  await u.save();
  console.log('Manager created:', email, 'password: Password123!');
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
// crée un manager par défaut pour tests