const mongoose = require('mongoose');

const schemaone = mongoose.Schema(
    {
        card_id: {
            type: String,
            required: [true, "Please enter Card ID"],
        },
        title: {
            type: String,
            required: [true, "Please enter Title"],
        },
        short_description: {
            type: String,
            required: [true, "Please enter Short Description"],
        },
        background_image: {
            type: String,  
            required: [true, "Please enter Background Image"],
        },
        logo_image: {
            type: String,  
            required: [true, "Please enter Logo Image"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("details", schemaone);
