const asyncHandler = require("express-async-handler");
const Details = require('./models/schemaone.js');


exports.createDetail = async (req, res) => {
    try {
        console.log(req.body);
        const { card_id, title, short_description, background_image_url, logo_image_url } = req.body;

        if (!background_image_url || !logo_image_url) {
            return res.status(400).json({ message: 'Background image URL and logo image URL are required' });
        }

        const newDetail = new Details({
            card_id,
            title,
            short_description,
            background_image_url,
            logo_image_url
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
        await Details.findByIdAndDelete(id);
        res.status(200).json({ message: 'Detail deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.updateDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const { card_id, title, short_description, background_image_url, logo_image_url } = req.body;

        let updateFields = { card_id, title, short_description };

        if (background_image_url) {
            updateFields.background_image_url = background_image_url;
        }

        if (logo_image_url) {
            updateFields.logo_image_url = logo_image_url;
        }

        const updatedDetail = await Details.findByIdAndUpdate(id, updateFields, { new: true });

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
