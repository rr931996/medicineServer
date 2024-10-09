const express = require('express');
const Medicine = require('../models/Medicine');

const router = express.Router();

// Get all medicines
router.get('/', async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new medicine
router.post('/', async (req, res) => {
    // Check if a medicine with the same name already exists
    const existingMedicine = await Medicine.findOne({ name: req.body.name });

    if (existingMedicine) {
        return res.status(201).json({ message: 'Medicine with this name already exists.',type:"error" });
    }

    const medicine = new Medicine({
        name: req.body.name,
        time: req.body.time,
        imageUrl: req.body.imageUrl,
        stockStill: req.body.stockStill,
        dose: req.body.dose,
    });

    try {
        const savedMedicine = await medicine.save();
        res.status(201).json({message:'Item added to cart successfully!',type:"success"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Update a medicine
router.put('/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        // Update only fields present in req.body
        if (req.body.name) medicine.name = req.body.name; // Map title to name
        if (req.body.imageUrl) medicine.imageUrl = req.body.imageUrl; // Map img to imageUrl
        if (req.body.stockStill) medicine.stockStill = req.body.stockStill; // Update expiry date
        if (req.body.time) medicine.time = req.body.time; // Update time
        const updatedMedicine = await medicine.save();
        res.json({ message: 'Medicine updated successfully', updatedMedicine });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// Delete a medicine
router.delete('/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) return res.status(404).send('Medicine not found');

        await medicine.remove();
        res.json({ message: 'Medicine deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
