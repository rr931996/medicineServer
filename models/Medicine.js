const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Changed from title to name
    imageUrl: { type: String, required: false }, // Changed from img to imageUrl
    stockStill: { type: Date, required: true }, // Added stockStill to match your update logic
    dose:{ type: Number, required: false },
    time: { type: String, required: false } //
    
});

module.exports = mongoose.model('Medicine', MedicineSchema);
