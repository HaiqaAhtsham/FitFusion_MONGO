const mongoose = require('mongoose');

const dailyRecordSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  walkDuration: { type: Number, required: true },
  caloriesIntake: { type: Number, required: true },
  exerciseMinutes: { type: Number, required: true },
  // steps: { type: Number, required: true },
  // milesCovered: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  dailyRecords: [dailyRecordSchema], // Array of daily records
});

const User = mongoose.model('User', userSchema);

module.exports = User;
