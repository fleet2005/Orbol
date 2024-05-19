const express = require("express");
const dotenv = require("dotenv").config();
const detailsRoutes = require('./detailsRoutes');
const connectDB = require("./mongoconn");
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2; 

const cors = require('cors');

const app= express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(express.json());

connectDB();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.urlencoded({ extended: true }));

app.use('/api/details', detailsRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;


cloudinary.config({
    cloud_name: '121194883159639',
    api_key: 'gLxIvMEBpDI9gQhfP44R00njH3c',
    api_secret: 'dzb1fqdf6',
    secure:true
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
