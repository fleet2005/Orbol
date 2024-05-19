const asyncHandler = require("express-async-handler");
const Details = require('./models/schemaone.js');


exports.createDetail = async (req, res) => {
    try {
        const { card_id, title, short_description, background_image, logo_image } = req.body;

        const newDetail = new Details({
            card_id,
            title,
            short_description,
            background_image,
            logo_image
        });

        await newDetail.save();
        res.status(201).json({ message: 'Detail created successfully', detail: newDetail });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



exports.deleteDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDetail = await Details.findByIdAndDelete(id);

        if (!deletedDetail) {
            return res.status(404).json({ message: 'Detail not found' });
        }

        res.status(200).json({ message: 'Detail deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.updateDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const { card_id, title, short_description, background_image, logo_image } = req.body;

        const updatedDetail = await Details.findByIdAndUpdate(
            id,
            { card_id, title, short_description, background_image, logo_image },
            { new: true, runValidators: true }
        );

        if (!updatedDetail) {
            return res.status(404).json({ message: 'Detail not found' });
        }

        res.status(200).json({ message: 'Detail updated successfully', detail: updatedDetail });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getAllDetails = async (req, res) => {
    try {
        const details = await Details.find();
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};